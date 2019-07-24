import { errorCodes, getErrorInfoByCode } from "./errorCodes";
import { calculateLocation } from "../utils/jsonUtils";
import { isSizeRight } from "./sizeHelpers";

const checkBlockMods = (block) => block.mods && block.mods.size;

const checkBlockContent = (block, etalonSize) => {
    if (checkBlockMods(block)) {
        if (!etalonSize) {
            return block.mods.size;
        } else if (!isSizeRight(block.mods.size, etalonSize)) {
            throw new Error(etalonSize);
        }
    }

    if (block.content) {
        etalonSize = checkContentSizes(block.content, etalonSize);
    }

    return etalonSize;
}

const checkContentSizes = (content, rightSize = null) => {
    let etalonSize = rightSize;

    if (Array.isArray(content)) {
        content.forEach((item) => {
            etalonSize = checkBlockContent(item, etalonSize);
        });
    } else {
        etalonSize = checkBlockContent(content, etalonSize);
    }

    return etalonSize;
}

export default (objectToCheck, json) => {
    let etalonSize = null;
    try {
        if (objectToCheck.content) {
            etalonSize = checkContentSizes(objectToCheck.content);
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