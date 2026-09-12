"use client";

import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";

import { useUserCountryCode } from "@/hooks/useUserCountry";

import {
    useLazyGetRadioPlayerQuery,
    useLazyGetRadioStationsQuery,
    useRegisterRadioStationClickMutation,
} from "@/services/Radio/radio.api";

import { RadioStation } from "@/services/Radio/radio.types";

import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Player,
    RadioContentType,
    RadioStationSource,
    TransitionMode,
} from "../types/RadioTypes";

//? TYPES =============================================================================

interface TypeRadioContext {
    transitionMode: TransitionMode;

    setTransitionMode: Dispatch<SetStateAction<TransitionMode>>;

    player: Player;

    setPlayer: Dispatch<SetStateAction<Player>>;

    selectStation: (
        station: RadioStation,
        source?: RadioStationSource | null,
    ) => Promise<void>;

    togglePlay: () => Promise<void>;

    stopPlayback: () => void;

    playPreviousStation: () => Promise<void>;

    playNextStation: () => Promise<void>;

    getAudioAnalyser: () => AnalyserNode | null;

    toLarge: () => void;
}

//? TYPES =============================================================================

//! CONSTANTS ==========================================================================

const STORAGE_LAST_STATION = "radio-player-last-station";

const STORAGE_COUNTRY = "radio-popular-country";

const RANDOM_STATIONS_LIMIT = 50;

//! CONSTANTS ==========================================================================

//! HELPERS ============================================================================

const normalizeCountryCode = (value?: string | null) => {
    const code = value?.trim().toUpperCase();

    if (!code || !/^[A-Z]{2}$/.test(code)) {
        return null;
    }

    return code;
};

const isStoredRadioStation = (value: unknown): value is RadioStation => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const station = value as Partial<RadioStation>;

    return (
        typeof station.id === "string" &&
        typeof station.name === "string" &&
        typeof station.streamUrl === "string" &&
        station.streamUrl.length > 0
    );
};

const uniqueStations = (stations: RadioStation[]) => {
    return Array.from(
        new Map(stations.map((station) => [station.id, station])).values(),
    );
};

const getPlaybackError = (error: unknown) => {
    if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
            return "Playback was blocked by the browser";
        }

        if (error.name === "NotSupportedError") {
            return "This radio stream is not supported by the browser";
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Failed to play radio stream";
};

const getStationPlaybackUrl = (station: RadioStation) => {
    return `/api/radio-stream?url=${encodeURIComponent(station.streamUrl)}`;
};

//! HELPERS ============================================================================

//! CONTEXT ===========================================================================

export const RadioContext = createContext<TypeRadioContext | null>(null);

//! CONTEXT ===========================================================================

//TODO PROVIDER =======================================================================

export const RadioProvider = ({ children }: { children: React.ReactNode }) => {
    //* STATES ========================================================================

    const audioRef = useRef<HTMLAudioElement>(null);

    const analyserRef = useRef<AnalyserNode | null>(null);

    const analyserContextRef = useRef<AudioContext | null>(null);

    const analyserSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    const analyserGainRef = useRef<GainNode | null>(null);

    const analyserInitRef = useRef<Promise<boolean> | null>(null);

    const playerRef = useRef<Player | null>(null);

    const playIntentRef = useRef<"play" | "pause">("pause");

    const defaultStationRequestRef = useRef(false);

    const countrySourceRequestRef = useRef<string | null>(null);

    const [storageReady, setStorageReady] = useState(false);

    const [transitionMode, setTransitionMode] = useState<TransitionMode | null>(
        null,
    );

    const [player, setPlayer] = useState<Player>({
        play: "pause",
        currentSrc: "",
        volume: 69,

        station: null,
        track: null,
        source: null,

        isLoading: false,
        isMetadataLoading: false,
        error: null,
    });

    const { viewRadioController } = useAppContextValues();

    const { setViewRadioController } = useAppContextActions();

    const userCountryCode = useUserCountryCode();

    const [getRadioPlayer] = useLazyGetRadioPlayerQuery();

    const [getRadioStations] = useLazyGetRadioStationsQuery();

    const [registerStationClick] = useRegisterRadioStationClickMutation();

    //* STATES ========================================================================

    //* HELPERS =======================================================================

    const destroyAudioAnalyser = useCallback(() => {
        analyserSourceRef.current?.disconnect();
        analyserRef.current?.disconnect();
        analyserGainRef.current?.disconnect();

        const context = analyserContextRef.current;

        if (context && context.state !== "closed") {
            void context.close().catch(() => undefined);
        }

        analyserRef.current = null;
        analyserContextRef.current = null;
        analyserSourceRef.current = null;
        analyserGainRef.current = null;
        analyserInitRef.current = null;
    }, []);

    const ensureAudioAnalyser = useCallback(async () => {
        const audio = audioRef.current;

        if (!audio) {
            return false;
        }

        const currentContext = analyserContextRef.current;

        if (analyserRef.current && currentContext) {
            if (currentContext.state === "suspended") {
                await currentContext.resume();
            }

            return currentContext.state === "running";
        }

        if (analyserInitRef.current) {
            return analyserInitRef.current;
        }

        const initialization = (async () => {
            const AudioContextConstructor =
                window.AudioContext ??
                (
                    window as typeof window & {
                        webkitAudioContext?: typeof AudioContext;
                    }
                ).webkitAudioContext;

            if (!AudioContextConstructor) {
                return false;
            }

            const context = new AudioContextConstructor();

            try {
                if (context.state === "suspended") {
                    await context.resume();
                }

                if (context.state !== "running") {
                    await context.close().catch(() => undefined);

                    return false;
                }

                const source = context.createMediaElementSource(audio);
                const analyser = context.createAnalyser();
                const gain = context.createGain();

                analyser.fftSize = 1024;
                analyser.smoothingTimeConstant = 0.78;
                analyser.minDecibels = -95;
                analyser.maxDecibels = -18;

                gain.gain.value = (playerRef.current?.volume ?? 69) / 100;

                source.connect(analyser);
                analyser.connect(gain);
                gain.connect(context.destination);

                audio.volume = 1;

                analyserContextRef.current = context;
                analyserSourceRef.current = source;
                analyserGainRef.current = gain;
                analyserRef.current = analyser;

                return true;
            } catch {
                await context.close().catch(() => undefined);

                return false;
            }
        })();

        analyserInitRef.current = initialization;

        try {
            return await initialization;
        } finally {
            if (analyserInitRef.current === initialization) {
                analyserInitRef.current = null;
            }
        }
    }, []);

    const getAudioAnalyser = useCallback(() => analyserRef.current, []);

    const stopPlayback = useCallback(() => {
        playIntentRef.current = "pause";

        const audio = audioRef.current;

        if (audio) {
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
        }

        setPlayer((prev) => ({
            ...prev,
            play: "pause",
            isLoading: false,
        }));
    }, []);

    const getPreferredCountryCode = useCallback(() => {
        const geoCountryCode = normalizeCountryCode(userCountryCode);

        if (geoCountryCode) {
            return geoCountryCode;
        }

        const storedCountryCode = normalizeCountryCode(
            localStorage.getItem(STORAGE_COUNTRY),
        );

        return storedCountryCode;
    }, [userCountryCode]);

    const ensureAudioSource = useCallback(
        (src: string) => {
            const audio = audioRef.current;

            if (!audio) {
                return null;
            }

            if (audio.getAttribute("src") !== src) {
                audio.src = src;
                audio.load();
            }

            return audio;
        },
        [],
    );

    const loadStationMetadata = useCallback(
        async (stationId: string) => {
            setPlayer((prev) => {
                if (prev.station?.id !== stationId) {
                    return prev;
                }

                return {
                    ...prev,
                    isMetadataLoading: true,
                };
            });

            try {
                const data = await getRadioPlayer({
                    uuid: stationId,
                }).unwrap();

                setPlayer((prev) => {
                    if (prev.station?.id !== stationId) {
                        return prev;
                    }

                    return {
                        ...prev,
                        station: data.station,
                        track: data.nowPlaying,
                        source: prev.source
                            ? {
                                  ...prev.source,
                                  stations: prev.source.stations.map(
                                      (station) =>
                                          station.id === stationId
                                              ? data.station
                                              : station,
                                  ),
                              }
                            : null,
                        currentSrc:
                            prev.currentSrc || getStationPlaybackUrl(data.station),
                        isMetadataLoading: false,
                    };
                });
            } catch {
                setPlayer((prev) => {
                    if (prev.station?.id !== stationId) {
                        return prev;
                    }

                    return {
                        ...prev,
                        isMetadataLoading: false,
                    };
                });
            }
        },
        [getRadioPlayer],
    );

    const loadCountryStations = useCallback(
        async (
            countryCode: string,
            contentType?: RadioContentType,
        ): Promise<RadioStation[]> => {
            const data = await getRadioStations({
                countryCode,
                contentType,
                order: "random",
                hideBroken: true,
                limit: RANDOM_STATIONS_LIMIT,
            }).unwrap();

            return uniqueStations(
                data.items.filter((station) => Boolean(station.streamUrl)),
            );
        },
        [getRadioStations],
    );

    const startAudio = useCallback(
        async (station: RadioStation) => {
            const src = getStationPlaybackUrl(station);

            playIntentRef.current = "play";

            setPlayer((prev) => {
                if (prev.station?.id !== station.id) {
                    return prev;
                }

                return {
                    ...prev,
                    play: "pause",
                    currentSrc: src,
                    isLoading: true,
                    error: null,
                };
            });

            const audio = ensureAudioSource(src);

            if (!audio) {
                return;
            }

            try {
                await ensureAudioAnalyser();
                await audio.play();
            } catch (error) {
                const currentPlayer = playerRef.current;

                if (
                    currentPlayer?.station?.id !== station.id ||
                    currentPlayer.currentSrc !== src
                ) {
                    return;
                }

                playIntentRef.current = "pause";

                setPlayer((prev) => ({
                    ...prev,
                    play: "pause",
                    isLoading: false,
                    error: getPlaybackError(error),
                }));
            }
        },
        [ensureAudioAnalyser, ensureAudioSource],
    );

    const prepareDefaultStation = useCallback(async () => {
        const currentStation = playerRef.current?.station;

        if (currentStation) {
            return currentStation;
        }

        const countryCode = getPreferredCountryCode();

        if (!countryCode) {
            setPlayer((prev) => ({
                ...prev,
                isLoading: false,
                error: "Unable to determine country for radio selection",
            }));

            return null;
        }

        setPlayer((prev) => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const stations = await loadCountryStations(countryCode, "music");

            if (stations.length === 0) {
                setPlayer((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: "No music stations found for your country",
                }));

                return null;
            }

            const station =
                stations[Math.floor(Math.random() * stations.length)];

            setPlayer((prev) => {
                if (prev.station) {
                    return prev;
                }

                return {
                    ...prev,
                    play: "pause",
                    currentSrc: getStationPlaybackUrl(station),
                    station,
                    track: null,
                    source: null,
                    isLoading: false,
                    isMetadataLoading: false,
                    error: null,
                };
            });

            return station;
        } catch (error) {
            setPlayer((prev) => ({
                ...prev,
                isLoading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to load a radio station",
            }));

            return null;
        }
    }, [getPreferredCountryCode, loadCountryStations]);

    const selectStation = useCallback(
        async (
            station: RadioStation,
            source: RadioStationSource | null = null,
        ) => {
            playIntentRef.current = "play";

            setPlayer((prev) => ({
                ...prev,
                play: "pause",
                currentSrc: getStationPlaybackUrl(station),
                station,
                track: null,
                source,
                isLoading: true,
                isMetadataLoading: true,
                error: null,
            }));

            void registerStationClick({
                uuid: station.id,
            });

            void loadStationMetadata(station.id);

            await startAudio(station);
        },
        [loadStationMetadata, registerStationClick, startAudio],
    );

    const togglePlay = useCallback(async () => {
        const currentPlayer = playerRef.current;

        if (!currentPlayer) {
            return;
        }

        const audio = audioRef.current;

        const shouldPause =
            playIntentRef.current === "play" ||
            (audio !== null && !audio.paused && !audio.ended);

        if (shouldPause) {
            playIntentRef.current = "pause";

            audio?.pause();

            setPlayer((prev) => ({
                ...prev,
                play: "pause",
                isLoading: false,
            }));

            return;
        }

        const station =
            currentPlayer.station ?? (await prepareDefaultStation());

        if (!station) {
            return;
        }

        void registerStationClick({
            uuid: station.id,
        });

        void loadStationMetadata(station.id);

        await startAudio(station);
    }, [
        loadStationMetadata,
        prepareDefaultStation,
        registerStationClick,
        startAudio,
    ]);

    const switchStation = useCallback(
        async (direction: "prev" | "next") => {
            let currentPlayer = playerRef.current;

            if (!currentPlayer) {
                return;
            }

            if (!currentPlayer.station) {
                const station = await prepareDefaultStation();

                if (!station) {
                    return;
                }

                await selectStation(station, null);

                return;
            }

            let source = currentPlayer.source;

            const hasCurrentStation = source?.stations.some(
                (station) => station.id === currentPlayer?.station?.id,
            );

            if (!source || !hasCurrentStation) {
                const countryCode =
                    normalizeCountryCode(currentPlayer.station.countryCode) ??
                    getPreferredCountryCode();

                if (!countryCode) {
                    return;
                }

                setPlayer((prev) => ({
                    ...prev,
                    isLoading: true,
                    error: null,
                }));

                try {
                    const stations = await loadCountryStations(countryCode);

                    currentPlayer = playerRef.current;

                    if (!currentPlayer?.station) {
                        return;
                    }

                    const sourceStations = uniqueStations([
                        currentPlayer.station,
                        ...stations,
                    ]);

                    source = {
                        type: "country",
                        countryCode,
                        contentType: null,
                        limit: RANDOM_STATIONS_LIMIT,
                        stations: sourceStations,
                    };
                } catch (error) {
                    setPlayer((prev) => ({
                        ...prev,
                        isLoading: false,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Failed to load stations for this country",
                    }));

                    return;
                }
            }

            if (!source || source.stations.length < 2) {
                setPlayer((prev) => ({
                    ...prev,
                    isLoading: false,
                }));

                return;
            }

            const currentStationId = currentPlayer.station.id;

            const currentIndex = source.stations.findIndex(
                (station) => station.id === currentStationId,
            );

            const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;

            const nextIndex =
                direction === "next"
                    ? (safeCurrentIndex + 1) % source.stations.length
                    : (safeCurrentIndex - 1 + source.stations.length) %
                      source.stations.length;

            const nextStation = source.stations[nextIndex];

            await selectStation(nextStation, source);
        },
        [
            getPreferredCountryCode,
            loadCountryStations,
            prepareDefaultStation,
            selectStation,
        ],
    );

    const playPreviousStation = useCallback(async () => {
        await switchStation("prev");
    }, [switchStation]);

    const playNextStation = useCallback(async () => {
        await switchStation("next");
    }, [switchStation]);

    const toLarge = () => {
        if (transitionMode === "closing") {
            return;
        }

        if (viewRadioController === "compact") {
            setTransitionMode("compact-large");

            setViewRadioController("large");

            return;
        }

        if (viewRadioController === "full") {
            setTransitionMode("full-large");

            setViewRadioController("large");
        }
    };

    //* HELPERS =======================================================================

    //* PLAYER ========================================================================

    useEffect(() => {
        playerRef.current = player;
    }, [player]);

    useEffect(() => {
        return () => {
            destroyAudioAnalyser();
        };
    }, [destroyAudioAnalyser]);

    useEffect(() => {
        const storedStation = localStorage.getItem(STORAGE_LAST_STATION);

        if (!storedStation) {
            setStorageReady(true);

            return;
        }

        try {
            const parsedStation: unknown = JSON.parse(storedStation);

            if (!isStoredRadioStation(parsedStation)) {
                localStorage.removeItem(STORAGE_LAST_STATION);

                setStorageReady(true);

                return;
            }

            setPlayer((prev) => ({
                ...prev,
                play: "pause",
                currentSrc: getStationPlaybackUrl(parsedStation),
                station: parsedStation,
                track: null,
                source: null,
                isLoading: false,
                isMetadataLoading: false,
                error: null,
            }));
        } catch {
            localStorage.removeItem(STORAGE_LAST_STATION);
        }

        setStorageReady(true);
    }, []);

    useEffect(() => {
        if (!storageReady || !player.station) {
            return;
        }

        localStorage.setItem(
            STORAGE_LAST_STATION,
            JSON.stringify(player.station),
        );
    }, [storageReady, player.station]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const gain = analyserGainRef.current;

        if (gain) {
            audio.volume = 1;
            gain.gain.setTargetAtTime(
                player.volume / 100,
                gain.context.currentTime,
                0.015,
            );

            return;
        }

        audio.volume = player.volume / 100;
    }, [player.volume]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const src =
            player.currentSrc ||
            (player.station ? getStationPlaybackUrl(player.station) : "");

        if (!src) {
            playIntentRef.current = "pause";

            audio.pause();
            audio.removeAttribute("src");
            audio.load();

            return;
        }

        if (audio.getAttribute("src") !== src) {
            audio.src = src;
            audio.load();
        }
    }, [player.currentSrc, player.station]);

    useEffect(() => {
        if (
            !storageReady ||
            player.station ||
            defaultStationRequestRef.current
        ) {
            return;
        }

        const countryCode = getPreferredCountryCode();

        if (!countryCode) {
            return;
        }

        defaultStationRequestRef.current = true;

        void prepareDefaultStation();
    }, [
        getPreferredCountryCode,
        player.station,
        prepareDefaultStation,
        storageReady,
        userCountryCode,
    ]);

    useEffect(() => {
        if (!storageReady || !player.station || player.source) {
            return;
        }

        const countryCode =
            normalizeCountryCode(player.station.countryCode) ??
            getPreferredCountryCode();

        if (!countryCode) {
            return;
        }

        const requestKey = `${player.station.id}-${countryCode}`;

        if (countrySourceRequestRef.current === requestKey) {
            return;
        }

        countrySourceRequestRef.current = requestKey;

        const currentStation = player.station;

        void loadCountryStations(countryCode)
            .then((stations) => {
                const sourceStations = uniqueStations([
                    currentStation,
                    ...stations,
                ]);

                setPlayer((prev) => {
                    if (prev.station?.id !== currentStation.id || prev.source) {
                        return prev;
                    }

                    return {
                        ...prev,
                        source: {
                            type: "country",
                            countryCode,
                            contentType: null,
                            limit: RANDOM_STATIONS_LIMIT,
                            stations: sourceStations,
                        },
                    };
                });
            })
            .finally(() => {
                if (countrySourceRequestRef.current === requestKey) {
                    countrySourceRequestRef.current = null;
                }
            });
    }, [
        getPreferredCountryCode,
        loadCountryStations,
        player.source,
        player.station,
        storageReady,
    ]);

    //* PLAYER ========================================================================

    return (
        <RadioContext.Provider
            value={{
                transitionMode,
                setTransitionMode,

                toLarge,

                player,
                setPlayer,

                selectStation,
                togglePlay,
                playPreviousStation,
                playNextStation,
                stopPlayback,
                getAudioAnalyser,
            }}
        >
            {children}

            <audio
                ref={audioRef}
                preload="none"
                onLoadStart={() => {
                    if (playIntentRef.current !== "play") {
                        return;
                    }

                    setPlayer((prev) => ({
                        ...prev,
                        isLoading: true,
                    }));
                }}
                onWaiting={() => {
                    if (playIntentRef.current !== "play") {
                        return;
                    }

                    setPlayer((prev) => ({
                        ...prev,
                        isLoading: true,
                    }));
                }}
                onStalled={() => {
                    if (playIntentRef.current !== "play") {
                        return;
                    }

                    setPlayer((prev) => ({
                        ...prev,
                        isLoading: true,
                    }));
                }}
                onPlaying={() => {
                    if (playIntentRef.current !== "play") {
                        audioRef.current?.pause();

                        return;
                    }

                    setPlayer((prev) => ({
                        ...prev,
                        play: "play",
                        isLoading: false,
                        error: null,
                    }));

                    void ensureAudioAnalyser();
                }}
                onPause={() => {
                    setPlayer((prev) => ({
                        ...prev,
                        play: "pause",
                        isLoading:
                            playIntentRef.current === "play"
                                ? prev.isLoading
                                : false,
                    }));
                }}
                onEnded={() => {
                    playIntentRef.current = "pause";

                    setPlayer((prev) => ({
                        ...prev,
                        play: "pause",
                        isLoading: false,
                    }));
                }}
                onError={() => {
                    playIntentRef.current = "pause";

                    setPlayer((prev) => ({
                        ...prev,
                        play: "pause",
                        isLoading: false,
                        error: "Radio stream is unavailable",
                    }));
                }}
            />
        </RadioContext.Provider>
    );
};

//TODO PROVIDER =======================================================================

//* HOOK ==============================================================================

export const useRadioContext = () => {
    const context = useContext(RadioContext);

    if (context === null) {
        throw new Error("useRadioContext must be used within RadioProvider");
    }

    return context;
};

//* HOOK ==============================================================================
