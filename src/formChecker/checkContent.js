import { errorCodes, FormError } from "./errorCodes";
import { calculateLocation } from "../utils/jsonUtils";
import { makeBranches } from "../utils/treeUtils";
import { isSpaceVRight, getSpaceV, getSpaceH, isSpaceHRight, getIndentB, isIndentBRight } from "./sizeHelpers";
import { checkBlockByName } from "../utils/searchUtils";

const checkSpaceV = (mix, etalonSize) => {
    const spaceV = getSpaceV(mix); 
    
    if(spaceV && !isSpaceVRight(spaceV, etalonSize, 2)) {
        throw new FormError(errorCodes.CONTENT_VERTICAL_SPACE_IS_INVALID);
    }
}

const checkSpaceH = (mix, etalonSize) => {
    const spaceH = getSpaceH(mix); 

    if(spaceH && !isSpaceHRight(spaceH, etalonSize, 1)) {
        throw new FormError(errorCodes.CONTENT_HORIZONTAL_SPACE_IS_INVALID);
    }
}

const checkIndentB = (block, json, etalonSize) => {
    makeBranches(block.mix, (mix) => {
        const indentB = getIndentB(mix); 

        if(indentB && !isIndentBRight(indentB, etalonSize, 1)) {
            throw new FormError(
                errorCodes.CONTENT_ITEM_INDENT_IS_INVALID,
                calculateLocation(block, json)
            );
        }
    });
}

const checkSpacesAndIndents = (block, json, etalonSize) => {
    if(block.mix) {
        makeBranches(block.mix, (mix) => {
            checkSpaceV(mix, etalonSize);
            checkSpaceH(mix, etalonSize);
        })
    }

    if (block.content) {
        makeBranches(block.content, (contentItem) => {
            if (checkBlockByName(contentItem, 'content-item') && contentItem.mix) {
                checkIndentB(contentItem, json, etalonSize);
            } 
        })
    }

    return etalonSize;
}


export default (objectToCheck, json, etalonSize) => {
    try {
        checkSpacesAndIndents(objectToCheck, json, etalonSize);
    } catch(e) {
        if (e instanceof FormError) {
            return [{
                code: e.code,
                error: e.error,
                location: e.location ? e.location: calculateLocation(objectToCheck, json) ,
            }]
        }

        throw e;
    }

    return [];
}