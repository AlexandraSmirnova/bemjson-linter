import errorCodes from "./errorCodes";
import { calculateLocation } from "../utils/jsonUtils";
import { makeBranches } from "../utils/treeUtils";
import { isSpaceVRight, getSpaceV, getSpaceH, isSpaceHRight } from "./sizeHelpers";

const checkSpaces = (mix, etalonSize) => {
    const spaceV = getSpaceV(mix); 
    const spaceH = getSpaceH(mix); 
    
    if(spaceV && !isSpaceVRight(spaceV, etalonSize)) {
        throw new Error(errorCodes.CONTENT_VERTICAL_SPACE_IS_INVALID.code);
    }

    if(spaceH && !isSpaceHRight(spaceH, etalonSize)) {
        throw new Error(errorCodes.CONTENT_HORIZONTAL_SPACE_IS_INVALID.code);
    }
}

const checkSpacesAndIndents = (block, etalonSize) => {
    if(block.mix) {
        makeBranches(block.mix, (mix) => {
            checkSpaces(mix, etalonSize);
        })
    }

    return etalonSize;
}


export default (objectToCheck, json, etalonSize) => {
    try {
        checkSpacesAndIndents(objectToCheck, etalonSize);
    } catch(e) {
        const errorCode = e.message.split('.')[1];
        return [{
            ...errorCode ? errorCodes[errorCode] : {},
            location: calculateLocation(objectToCheck, json),
        }]
    }

    return [];
}