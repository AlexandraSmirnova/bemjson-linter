import textChecker from "./text-checker";
import formChecker from "./form-checker";

const lint = (json) => {
    const errors = []

    errors.push(...formChecker(json));
    errors.push(...textChecker(json));
    
    return errors;
};