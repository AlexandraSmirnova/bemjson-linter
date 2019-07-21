import checkContent from "./checkContent";
import checkFooter from "./checkFooter";
import checkHeader from "./checkHeader";
import checkSizesAndGetEtalon from "./checkSizes";
import { checkBlockByName } from "../utils/searchUtils";
import { makeBranches } from "../utils/treeUtils";

const checkBlockForm = (obj, json) => {
    const errors = [];
    
    const { sizeErrors, etalonSize } = checkSizesAndGetEtalon(obj, json);
    errors.push(...sizeErrors);

    if (checkBlockByName(obj, 'content')) {
        errors.push(...checkContent(obj, json, etalonSize));
    }
    errors.push(...checkFooter(obj, json, etalonSize));
    errors.push(...checkHeader(obj, json, etalonSize));
    
    return errors;
}

export const formLinter = (obj, json) => {
    const errors = [];

    if(checkBlockByName(obj, 'form')) {
        errors.push(...checkBlockForm(obj, json));
    }

    if(obj.content) {
        makeBranches(obj.content, (item) => {
            errors.push(...formLinter(item, json))
        })
    }

    return errors;
}