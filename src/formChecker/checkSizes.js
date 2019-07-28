import { errorCodes, getErrorInfoByCode } from "./errorCodes";
import calculateLocation from "../utils/calculateLocation";
import { makeBranches } from "../utils/treeUtils";
import { checkBlockByName, getBlockMod, compareWithEtalonSize } from "../utils/checkUtils";

const checkBlockContent = (block, etalonSize) => {
    const itemSize = getBlockMod(block, 'size');

    if (itemSize) {
        if (!etalonSize) {
            return itemSize;
        } else if (!compareWithEtalonSize(itemSize, etalonSize)) {
            throw new Error(etalonSize);
        }
    }

    return etalonSize;
}

const checkContentSizes = (block, rightSize = null) => {
    let etalonSize = rightSize;
    const elemsToCheck = ['label', 'input', 'button'];

    if (block.content) {
        makeBranches(block.content, (item) => {
            if (elemsToCheck.some((elem) => checkBlockByName(block, elem) || checkBlockByName(item, elem))) {
                etalonSize = checkBlockContent(item, etalonSize);
            }
            etalonSize = checkContentSizes(item, etalonSize);
        });
    }

    return etalonSize;
}

export default (objectToCheck, json) => {
    let etalonSize = null;
    try {
        etalonSize = checkContentSizes(objectToCheck);
        if (!etalonSize) {
            throw new Error();
        }
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
