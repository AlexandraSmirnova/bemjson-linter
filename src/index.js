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


const lint = (json) => {
    const bemObj = JSON.parse(json);

    return checkBemObj(bemObj);
};

//for future tests
console.log(lint(JSON.stringify({ block: "form" })));
// console.log(lint(JSON.stringify({ block: "layout" })));
// console.log(lint(JSON.stringify({ block: "layout", mix: [{ block: "form"}] })));
// console.log(lint(JSON.stringify({ block: "layout", mix: [{ block: "text"}] })));
// console.log(lint(JSON.stringify({ block: "text" })));
