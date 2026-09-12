//* stations
// const {
//     data,
//     isLoading,
//     isFetching,
//     isError,
//     error,
// } = useGetRadioStationsQuery();

//* stations with filters
// const {
//     data,
//     isLoading,
// } = useGetRadioStationsQuery({
//     countryCode: "UA",
//     genres: ["rock", "alternative"],
//     codec: "MP3",
//     bitrateMin: 128,
//     httpsOnly: true,
//     hideBroken: true,
//     order: "clickcount",
//     reverse: true,
//     limit: 24,
// });

//* one station
// const {
//     data: station,
//     isLoading,
//     isFetching,
//     isError,
//     error,
// } = useGetRadioStationQuery({
//     uuid: "9617a958-0601-11e8-ae97-52543be04c81",
// });

//* current track and ICY metadata
// const {
//     data: nowPlaying,
//     isLoading,
//     isFetching,
//     isError,
//     error,
// } = useGetRadioNowPlayingQuery({
//     uuid: "9617a958-0601-11e8-ae97-52543be04c81",
// });

//* complete player payload
// const {
//     data: player,
//     isLoading,
//     isFetching,
//     isError,
//     error,
// } = useGetRadioPlayerQuery({
//     uuid: "9617a958-0601-11e8-ae97-52543be04c81",
// });

//* register playback in Radio Browser statistics
// const [
//     registerRadioStationClick,
//     {
//         data: clickResult,
//         isLoading,
//         isError,
//         error,
//     },
// ] = useRegisterRadioStationClickMutation();

// void registerRadioStationClick({
//     uuid: "9617a958-0601-11e8-ae97-52543be04c81",
// });

//* countries
// const {
//     data: countries,
//     isLoading,
// } = useGetRadioCountriesQuery({
//     order: "stationcount",
//     reverse: true,
//     limit: 250,
// });

//* country codes
// const {
//     data: countryCodes,
//     isLoading,
// } = useGetRadioCountryCodesQuery({
//     order: "name",
//     reverse: false,
//     limit: 250,
// });

//* states or regions
// const {
//     data: states,
//     isLoading,
// } = useGetRadioStatesQuery({
//     country: "United States",
//     order: "stationcount",
//     reverse: true,
//     limit: 100,
// });

//* languages
// const {
//     data: languages,
//     isLoading,
// } = useGetRadioLanguagesQuery({
//     filter: "eng",
//     order: "stationcount",
//     reverse: true,
//     limit: 100,
// });

//* genres
// const {
//     data: genres,
//     isLoading,
// } = useGetRadioGenresQuery({
//     filter: "rock",
//     order: "stationcount",
//     reverse: true,
//     limit: 100,
// });

//* codecs
// const {
//     data: codecs,
//     isLoading,
// } = useGetRadioCodecsQuery({
//     order: "stationcount",
//     reverse: true,
//     limit: 100,
// });

//* lazy stations
// const [
//     getRadioStations,
//     {
//         data,
//         isLoading,
//         isFetching,
//         isError,
//         error,
//     },
// ] = useLazyGetRadioStationsQuery();

// void getRadioStations({
//     search: "paradise",
//     countryCode: "US",
//     genres: ["rock"],
//     limit: 24,
// });

//* lazy now playing
// const [
//     getRadioNowPlaying,
//     {
//         data: nowPlaying,
//         isLoading,
//         isFetching,
//         isError,
//         error,
//     },
// ] = useLazyGetRadioNowPlayingQuery();

// void getRadioNowPlaying({
//     uuid: "9617a958-0601-11e8-ae97-52543be04c81",
// });
