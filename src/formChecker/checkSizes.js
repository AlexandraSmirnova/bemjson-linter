import { errorCodes, getErrorInfoByCode } from "./errorCodes";
import { calculateLocation } from "../utils/jsonUtils";
import { isSizeRight, getBlockMod } from "./sizeHelpers";
import { makeBranches } from "../utils/treeUtils";
import { checkBlockByName } from "../utils/searchUtils";

const checkBlockContent = (block, etalonSize) => {
    const itemSize = getBlockMod(block, 'size');

    if (itemSize) {
        if (!etalonSize) {
            return itemSize;
        } else if (!isSizeRight(itemSize, etalonSize)) {
            throw new Error(etalonSize);
        }
    }

    return checkContentSizes(block, etalonSize);
}

const checkContentSizes = (block, rightSize = null) => {
    let etalonSize = rightSize;
    const elemsToCheck = ['label', 'input', 'button'];

    if (block.content) {
        makeBranches(block.content, (item) => {
            if (elemsToCheck.some((elem) => checkBlockByName(block, elem) || checkBlockByName(item, elem))) {
                etalonSize = checkBlockContent(item, etalonSize);
            }
        });
    }

    return etalonSize;
}

export default (objectToCheck, json) => {
    let etalonSize = null;
    try {
        etalonSize = checkContentSizes(objectToCheck);
    } catch (e) {
        etalonSize = e.message;
        return {
            sizeErrors: [{
                ...getErrorInfoByCode(errorCodes.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL),
                location: calculateLocation(objectToCheck, json),
            }],
            etalonSize
        }
    }

    return { sizeErrors: [], etalonSize };
}