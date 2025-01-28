export default defineI18nConfig(() => {
    return {
        fallbackWarn: true,
        legacy: false,
        missingWarn: true,
        warnHtmlMessage: true,
        silentFallbackWarn: false,
        silentTranslationWarn: false,
    };
});
