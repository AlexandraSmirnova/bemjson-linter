export const checkBlockByName = (obj, blockName) => Boolean(
    obj.block && obj.block === blockName
    || obj.mix && obj.mix.some((mix) => checkBlockByName(mix, blockName))
);
