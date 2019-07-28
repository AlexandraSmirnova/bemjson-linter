import { errorCodes, FormError, ErrorCollector } from "./errorCodes";
import calculateLocation from "../utils/calculateLocation";
import { makeBranches } from "../utils/treeUtils";
import { checkBlockByName, getBlockMod, compareWithEtalonSize, wrapRule } from "../utils/checkUtils";

let errorCollector = null;
let wrapContentRule = null;

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
            wrapContentRule(checkSpaceV, [mix, etalonSize]);
            console.log('v', errorCollector.getErrors());
            wrapContentRule(checkSpaceH, [mix, etalonSize]);
            console.log('h', errorCollector.getErrors());
        })
    }

    if (block.content) {
        makeBranches(block.content, (contentItem) => {
            if (checkBlockByName(contentItem, 'content-item') && contentItem.mix) {
                wrapContentRule(checkIndentB, [contentItem, json, etalonSize]);
            }
        })
    }

    return etalonSize;
}


export default (objectToCheck, json, etalonSize) => {
    errorCollector = new ErrorCollector(calculateLocation(objectToCheck, json));
    wrapContentRule = wrapRule(errorCollector, FormError);

    checkSpacesAndIndents(objectToCheck, json, etalonSize);

    return errorCollector.getErrors();
}
