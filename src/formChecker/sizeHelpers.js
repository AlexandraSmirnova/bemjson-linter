const sizes = ['xxxxs', 'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'];

// заменить на функцию compareWithEtalonSize
export const isSizeRight = (size, rightSize, step = 0) => {
    const index = sizes.indexOf(rightSize) + step;

    return sizes[index] === size;
};

export const isSpaceVRight = (spaceV, rightSize, step = 0) => {
    const index = sizes.indexOf(rightSize) + step;

    return sizes[index] === spaceV;
};

export const isSpaceHRight = (spaceH, rightSize, step = 0) => {
    const index = sizes.indexOf(rightSize) + step;

    return sizes[index] === spaceH;
};

export const isIndentBRight = (indentB, rightSize, step = 0) => {
    const index = sizes.indexOf(rightSize) + step;

    return sizes[index] === indentB;
};

export const getBlockMod = (block, modName) => block.mods && block.mods[modName]
    ? block.mods[modName]
    : null;