const sizes = ['xxxxs', 'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'];

export const isSizeRight = (size, rightSize) => size === rightSize;

export const isSpaceVRight = (spaceV, rightSize) => {
    const index = sizes.indexOf(rightSize) + 2;

    return sizes[index] === spaceV;
};

export const isSpaceHRight = (spaceH, rightSize) => {
    const index = sizes.indexOf(rightSize) + 1;

    return sizes[index] === spaceH;
};

export const isIndentBRight = (indentB, rightSize) => {
    const index = sizes.indexOf(rightSize) + 1;

    return sizes[index] === indentB;
};

export const getSpaceV = (block) => block.mods && block.mods["space-v"]
    ? block.mods["space-v"]
    : null;

export const getSpaceH = (block) => block.mods && block.mods["space-h"]
    ? block.mods["space-h"]
    : null;

export const getIndentB = (block) => block.mods && block.mods["indent-b"]
    ? block.mods["indent-b"]
    : null;