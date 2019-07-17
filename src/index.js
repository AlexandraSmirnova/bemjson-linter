import { textLinter, checkIfText } from "./text-checker/index";
import { formLinter, checkIfForm } from "./form-checker/index";


const checkBemObj = (obj) => {
    const errors = []

    if(checkIfForm(obj)) {
        errors.push(...formLinter(obj));
    }

    if(checkIfText(obj)) {
        errors.push(...textLinter(obj));
    }

    return errors
}


export const lint = (json) => {
    const bemObj = JSON.parse(json);

    return checkBemObj(bemObj);
};

console.log(lint(JSON.stringify({ block: "form" })));
