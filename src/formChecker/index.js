import checkContent from "./checkContent";
import checkFooter from "./checkFooter";
import checkHeader from "./checkHeader";
import checkInput from "./checkInput";
import { checkBlockByName } from "../utils/searchUtils";
import { makeBranches } from "../utils/treeUtils";

const checkBlockForm = (objToCheck, json) => {
    const errors = [];

    errors.push(...checkContent(json));
    errors.push(...checkFooter(json));
    errors.push(...checkHeader(json));
    errors.push(...checkInput(objToCheck, json));
    
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