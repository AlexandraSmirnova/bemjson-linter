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

// заменить на функцию getBlockMod
export const getItemSize = (block) => block.mods && block.mods["size"]
    ? block.mods["size"]
    : null;

export const getSpaceV = (block) => block.mods && block.mods["space-v"]
    ? block.mods["space-v"]
    : null;

export const getSpaceH = (block) => block.mods && block.mods["space-h"]
    ? block.mods["space-h"]
    : null;

export const getIndentB = (block) => block.mods && block.mods["indent-b"]
    ? block.mods["indent-b"]
    : null;