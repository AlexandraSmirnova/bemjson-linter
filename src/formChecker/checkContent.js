import { errorCodes, FormError } from "./errorCodes";
import calculateLocation from "../utils/calculateLocation";
import { makeBranches } from "../utils/treeUtils";
import { checkBlockByName, getBlockMod, compareWithEtalonSize } from "../utils/checkUtils";

const checkSpaceV = (mix, etalonSize) => {
    const spaceV = getBlockMod(mix, 'space-v');

    if (spaceV && !compareWithEtalonSize(spaceV, etalonSize, 2)) {
        throw new FormError(errorCodes.CONTENT_VERTICAL_SPACE_IS_INVALID);
    }
}

const checkSpaceH = (mix, etalonSize) => {
    const spaceH = getBlockMod(mix, 'space-h');

    if (spaceH && !compareWithEtalonSize(spaceH, etalonSize, 1)) {
        throw new FormError(errorCodes.CONTENT_HORIZONTAL_SPACE_IS_INVALID);
    }
}

const checkIndentB = (block, json, etalonSize) => {
    makeBranches(block.mix, (mix) => {
        const indentB = getBlockMod(mix, 'indent-b');

        if (indentB && !compareWithEtalonSize(indentB, etalonSize, 1)) {
            throw new FormError(
                errorCodes.CONTENT_ITEM_INDENT_IS_INVALID,
                calculateLocation(block, json)
            );
        }
    });
}

const checkSpacesAndIndents = (block, json, etalonSize) => {
    if (block.mix) {
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
    } catch (e) {
        if (e instanceof FormError) {
            return [{
                code: e.code,
                error: e.error,
                location: e.location ? e.location : calculateLocation(objectToCheck, json),
            }]
        }

        throw e;
    }

    return [];
}