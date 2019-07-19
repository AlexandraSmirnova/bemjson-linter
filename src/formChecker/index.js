import checkContent from "./checkContent";
import checkFooter from "./checkFooter";
import checkHeader from "./checkHeader";
import checkInput from "./checkInput";

export default (objToCheck, json) => {
    const errors = [];

    errors.push(...checkContent(json));
    errors.push(...checkFooter(json));
    errors.push(...checkHeader(json));
    errors.push(...checkInput(objToCheck, json));
    
    return errors;
}