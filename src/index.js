import { textLinter } from "./textChecker/index";
import { formLinter } from "./formChecker/index";

const checkBemObj = (obj, json) => {
    const errors = []

    errors.push(...formLinter(obj, json));
    errors.push(...textLinter(obj, json));

    return errors;
}


export const lint = (json) => {
    const bemObj = JSON.parse(json);

    return checkBemObj(bemObj, json);
};

window.lint = lint;
