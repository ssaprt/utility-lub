import { examples } from "./example-placeholder";

export const interactivePlaceholder = (callback: (phrase: string) => void) => {
    const intervalSymbols = 230;
    const intervalDeleteSymbol = 120;
    const delayBeforeDelete = 1000;
    const delayBeforeStart = 700;

    let phrase = "";
    let counter = 0;
    let selectedItem: string[] = [];

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let intervalDeleteId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    let running = false;

    const clearPrintInterval = () => {
        if (intervalId !== undefined) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
    };

    const clearDeleteInterval = () => {
        if (intervalDeleteId !== undefined) {
            clearInterval(intervalDeleteId);
            intervalDeleteId = undefined;
        }
    };

    const clearTimeoutId = () => {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
            timeoutId = undefined;
        }
    };

    const clearTimers = () => {
        clearPrintInterval();
        clearDeleteInterval();
        clearTimeoutId();
    };

    let prevIndex = -1;
    const selectPhrase = () => {
        let index = Math.floor(Math.random() * examples.length);

        while (examples.length > 1 && index === prevIndex) {
            index = Math.floor(Math.random() * examples.length);
        }

        prevIndex = index;

        selectedItem = (examples[index] + "...").split("");

        counter = 0;
        phrase = "";
    };

    const print = () => {
        if (!selectedItem.length) {
            selectPhrase();
        }

        intervalId = setInterval(() => {
            if (!running) return;

            phrase += selectedItem[counter];
            counter += 1;

            callback(phrase);

            if (counter >= selectedItem.length) {
                clearPrintInterval();

                timeoutId = setTimeout(() => {
                    if (!running) return;

                    deletePhrase();
                }, delayBeforeDelete);
            }
        }, intervalSymbols);
    };

    const deletePhrase = () => {
        intervalDeleteId = setInterval(() => {
            if (!running) return;

            phrase = phrase.slice(0, -1);

            callback(phrase);

            if (!phrase.length) {
                clearDeleteInterval();

                counter = 0;
                selectedItem = [];

                timeoutId = setTimeout(() => {
                    if (!running) return;

                    selectPhrase();
                    print();
                }, delayBeforeStart);
            }
        }, intervalDeleteSymbol);
    };

    const start = () => {
        if (running) return;

        running = true;

        if (!selectedItem.length) {
            selectPhrase();
        }

        print();
    };

    const stop = () => {
        running = false;
        clearTimers();
    };

    const restart = () => {
        stop();

        phrase = "";
        counter = 0;
        selectedItem = [];

        callback("");

        start();
    };

    const destroy = () => {
        stop();

        phrase = "";
        counter = 0;
        selectedItem = [];
    };

    return {
        start,
        stop,
        restart,
        destroy,
    };
};
