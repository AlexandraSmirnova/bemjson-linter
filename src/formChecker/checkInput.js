import errorCodes from "./errorCodes";
import { calculateLocation } from "../utils/jsonUtils";

const isSizeRight = (size, rightSize) => size === rightSize;

const checkBlockMods = (block) => block.mods && block.mods.size;  

const checkBlockContent = (block, etalonSize) => {
    if(checkBlockMods(block)) {
        if (!etalonSize) {
            return block.mods.size;
        } else if (!isSizeRight(block.mods.size, etalonSize)){
            throw new Error();
        }
    }

    if(block.content) {
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
    try {
        if (objectToCheck.content) {
            checkContentSizes(objectToCheck.content);
        }
    } catch(e) {
        return [{
            ...errorCodes.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL,
            location: calculateLocation(objectToCheck, json),
        }]
    }

    return [];
}