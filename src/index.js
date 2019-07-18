import textLinter from "./textChecker/index";
import formLinter from "./formChecker/index";
import { checkBlockByName } from "./utils/searchUtils";


const checkBemObj = (obj) => {
    const errors = []

    if(checkBlockByName(obj, 'form')) {
        errors.push(...formLinter(obj));
    }

    if(checkBlockByName(obj, 'text')) {
        errors.push(...textLinter(obj));
    }

    return errors
}


export const lint = (json) => {
    const bemObj = JSON.parse(json);

    return checkBemObj(bemObj);
};

window.lint = lint;
