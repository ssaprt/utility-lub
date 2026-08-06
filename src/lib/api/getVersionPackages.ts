export const getVersionPackages = async () => {
    const response = await fetch(
        "https://api.npmjs.org/-/package/easy-pagination/package.json",
    );
};
