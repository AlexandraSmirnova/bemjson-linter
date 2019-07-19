import errorCodes from "./errorCodes";
import { calculateLocation } from "../utils/jsonUtils";

const isSizeRight = (size, rightSize) => size === rightSize;

const checkBlockMods = (block) => block.mods && block.mods.size;  

const checkContentItem = (item, etalonSize) => {
    if(checkBlockMods(item)) {
        if (!etalonSize) {
            return item.mods.size;
        } else if (!isSizeRight(item.mods.size)){
            throw Error();
        }
    }

    if(block.content) {
        checkContentSize(item.content, etalonSize);
    }

    return etalonSize;
}

const checkContentSizes = (content, rightSize = null) => {
    let etalonSize = rightSize;

    if (Array.isArray(content)) {
        content.forEach((item) => {
            etalonSize = checkContentItem(item, etalonSize);
        });
    } else {
        etalonSize = checkContentItem(item, etalonSize);
    }
}

export default (objectToCheck, json) => {
    if (!objectToCheck.content) {
        return [];
    }

    try {
        checkContentSizes(objectToCheck.content);
    } catch(e) {
        return [{
            ...errorCodes.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL,
            location: calculateLocation(json, objectToCheck),
        }]
    }


    return [];
}