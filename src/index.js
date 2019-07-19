import textLinter from "./textChecker/index";
import formLinter from "./formChecker/index";
import { checkBlockByName } from "./utils/searchUtils";


const checkBemObj = (obj, json) => {
    const errors = []

    if(checkBlockByName(obj, 'form')) {
        errors.push(...formLinter(obj, json));
    }

    if(checkBlockByName(obj, 'text')) {
        errors.push(...textLinter(obj, json));
    }

    return errors
}


export const lint = (json) => {
    const bemObj = JSON.parse(json);

    return checkBemObj(bemObj, json);
};

window.lint = lint;
