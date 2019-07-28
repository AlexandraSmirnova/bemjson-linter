import { errorCodes, FormError, ErrorCollector } from "./errorCodes";
import calculateLocation from "../utils/calculateLocation";
import { makeBranches } from "../utils/treeUtils";
import { checkBlockByName, getBlockMod, compareWithEtalonSize, wrapRule } from "../utils/checkUtils";

let errorCollector = null;
let wrapHeaderRule = null;

const checkSpaceV = (block, etalonSize) => {
    const spaceV = getBlockMod(block, 'space-v');

    if (spaceV && !compareWithEtalonSize(spaceV, etalonSize)) {
        throw new FormError(
            errorCodes.HEADER_VERTICAL_SPACE_IS_INVALID,
        );
    }
}

const checkSpaceH = (block, etalonSize) => {
    const spaceH = getBlockMod(block, 'space-h');

    if (spaceH && !compareWithEtalonSize(spaceH, etalonSize, 1)) {
        throw new FormError(
            errorCodes.HEADER_HORIZONTAL_SPACE_IS_INVALID,
        );
    }
}

const checkTextSize = (block, json, etalonSize) => {
    const blockSize = getBlockMod(block, 'size');

    if (blockSize && !compareWithEtalonSize(blockSize, etalonSize, 2)) {
        throw new FormError(
            errorCodes.HEADER_TEXT_SIZE_IS_INVALID,
            calculateLocation(block, json)
        );
    }
}

const checkHeaderRules = (block, json, etalonSize) => {
    if (block.mix) {
        makeBranches(block.mix, (mix) => {
            if (checkBlockByName(mix, 'item') && mix.mods) {
                wrapHeaderRule(checkSpaceV, [mix, etalonSize]);
                wrapHeaderRule(checkSpaceH, [mix, etalonSize]);
            }
        })
    }

    if (block.content) {
        makeBranches(block.content, (contentItem) => {
            if (checkBlockByName(contentItem, 'text') && contentItem.mods) {
                wrapHeaderRule(checkTextSize, [contentItem, json, etalonSize]);
            }
        })
    }

    return etalonSize;
}


export default (objectToCheck, json, etalonSize) => {
    errorCollector = new ErrorCollector(calculateLocation(objectToCheck, json));
    wrapHeaderRule = wrapRule(errorCollector, FormError);

    checkHeaderRules(objectToCheck, json, etalonSize);

    return errorCollector.getErrors();
}
