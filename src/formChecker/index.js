import checkContent from "./checkContent";
import checkFooter from "./checkFooter";
import checkHeader from "./checkHeader";
import checkSizesAndGetEtalon from "./checkSizes";
import { checkBlockByName } from "../utils/checkUtils";
import { makeBranches } from "../utils/treeUtils";

let etalon = null;

const checkBlockForm = (obj, json) => {
    const errors = [];

    const { sizeErrors, etalonSize } = checkSizesAndGetEtalon(obj, json);

    if (etalonSize) {
        etalon = etalonSize;
    }
    errors.push(...sizeErrors);
    if (checkBlockByName(obj, 'content')) {
        errors.push(...checkContent(obj, json, etalon));
    }
    if (checkBlockByName(obj, 'header')) {
        errors.push(...checkHeader(obj, json, etalon));
    }
    if (checkBlockByName(obj, 'footer')) {
        errors.push(...checkFooter(obj, json, etalon));
    }

    return errors;
}

export const formLinter = (obj, json) => {
    const errors = [];

    if (checkBlockByName(obj, 'form')) {
        errors.push(...checkBlockForm(obj, json));
    }

    if (obj.content) {
        makeBranches(obj.content, (item) => {
            errors.push(...formLinter(item, json))
        })
    }

    return errors;
}