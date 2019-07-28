import checkContent from "./checkContent";
import checkFooter from "./checkFooter";
import checkHeader from "./checkHeader";
import checkSizesAndGetEtalon from "./checkSizes";
import { checkBlockByName } from "../utils/checkUtils";
import { makeBranches } from "../utils/treeUtils";

const checkBlockForm = (obj, json, etalonSize = null) => {
    let etalon = etalonSize;
    const errors = [];

    if (!etalon) {
        const { sizeErrors, etalonSize: foundEtalon } = checkSizesAndGetEtalon(obj, json);
        etalon = foundEtalon;
        errors.push(...sizeErrors);
    } else {
        if (checkBlockByName(obj, 'content')) {
            errors.push(...checkContent(obj, json, etalon));
        }
        if (checkBlockByName(obj, 'header')) {
            errors.push(...checkHeader(obj, json, etalon));
        }
        if (checkBlockByName(obj, 'footer')) {
            errors.push(...checkFooter(obj, json, etalon));
        }
    }

    if (obj.content) {
        makeBranches(obj.content, (item) => {
            const { errors: foundErrors, etalon: foundEtalon } = checkBlockForm(item, json, etalon);
            etalon = foundEtalon;
            errors.push(...foundErrors);
        })
    }

    return { errors, etalon };
}

export const formLinter = (obj, json) => {
    const errors = [];

    if (checkBlockByName(obj, 'form')) {
        const { errors: foundErrors} = checkBlockForm(obj, json)
        errors.push(...foundErrors);
    }

    return errors;
}
