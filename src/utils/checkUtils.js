const sizes = ['xxxxxs', 'xxxxs', 'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];

export const compareWithEtalonSize = (value, etalonSize, step = 0) => {
    const index = sizes.indexOf(etalonSize) + step;

    return sizes[index] === value;
}

export const getBlockMod = (block, modName) => block.mods && block.mods[modName]
    ? block.mods[modName]
    : null;

export const checkBlockByName = (obj, blockName) => Boolean(
    obj.block && obj.block === blockName
    || obj.elem && obj.elem === blockName
    || obj.mix && (Array.isArray(obj.mix)
        ? obj.mix.some((mix) => checkBlockByName(mix, blockName))
        : checkBlockByName(obj.mix, blockName))
);

export const wrapRule = (errorCollector, generalErrorType) => (ruleFunc, params) => {
    try {
        ruleFunc(...params);
    } catch (e) {
        if (e instanceof generalErrorType) {
            return errorCollector.addErrors({
                code: e.code,
                error: e.error,
                location: e.location ? e.location : errorCollector.defaultLocation,
            });
        }

        throw e;
    }
}
