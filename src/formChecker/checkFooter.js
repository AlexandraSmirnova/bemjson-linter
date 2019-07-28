import { errorCodes, FormError } from "./errorCodes";
import { isSizeRight, isSpaceVRight, isSpaceHRight, getBlockMod } from "./sizeHelpers";
import { calculateLocation } from "../utils/jsonUtils";
import { makeBranches } from "../utils/treeUtils";
import { checkBlockByName } from "../utils/searchUtils";

const checkSpaceV = (block, etalonSize) => {
    const spaceV = getBlockMod(block, 'space-v'); 
    
    if(spaceV && !isSpaceVRight(spaceV, etalonSize)) {
        throw new FormError(
            errorCodes.FOOTER_VERTICAL_SPACE_IS_INVALID,
        );
    }
}

const checkSpaceH = (block, etalonSize) => {
    const spaceH = getBlockMod(block, 'space-h'); 

    if(spaceH && !isSpaceHRight(spaceH, etalonSize, 1)) {
        throw new FormError(
            errorCodes.FOOTER_HORIZONTAL_SPACE_IS_INVALID,
        );
    }
}

const checkTextSize = (block, json, etalonSize) => {
    const blockSize = getBlockMod(block, 'size'); 

    if(blockSize && !isSizeRight(blockSize, etalonSize)) {
        throw new FormError(
            errorCodes.FOOTER_TEXT_SIZE_IS_INVALID,
            calculateLocation(block, json)
        );
    }
}

const checkHeaderRules = (block, json, etalonSize) => {
    if(block.mix) {
        makeBranches(block.mix, (mix) => {
            if (checkBlockByName(mix, 'item') && mix.mods) {            
                checkSpaceV(mix, etalonSize);
                checkSpaceH(mix, etalonSize);
            }
        })
    }

    if (block.content) {
        makeBranches(block.content, (contentItem) => {
            if (checkBlockByName(contentItem, 'text') && contentItem.mods) {
                checkTextSize(contentItem, json, etalonSize);
            } 
        })
    }

    return etalonSize;
}


export default (objectToCheck, json, etalonSize) => {
    try {
        checkHeaderRules(objectToCheck, json, etalonSize);
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