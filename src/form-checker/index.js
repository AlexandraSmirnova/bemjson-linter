import checkContent from "./check-content";
import checkFooter from "./check-footer";
import checkHeader from "./check-header";
import checkInput from "./check-input";

export default (json) => {
    const errors = [];

    errors.push(...checkContent(json));
    errors.push(...checkFooter(json));
    errors.push(...checkHeader(json));
    errors.push(...checkInput(json));
    
    return errors;
}