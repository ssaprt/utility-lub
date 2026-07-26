window.__pagefindPromise ??= (async () => {
    const pagefind = await import("/pagefind/pagefind.js");

    await pagefind.init();

    return pagefind;
})();