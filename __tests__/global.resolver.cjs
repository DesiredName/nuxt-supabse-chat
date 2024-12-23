// https://jestjs.io/docs/configuration#resolver-string
module.exports = (path, options /* ResolverOptions */) => {
    if (path.startsWith('~~')) {
        path = path.replace('~~', options.rootDir);
    }

    return options.defaultResolver(path, options);
};
