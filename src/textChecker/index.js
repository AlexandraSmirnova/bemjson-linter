import checkH1 from "./checkH1";
import checkH2 from "./checkH2";
import checkH3 from "./checkH3";

export default (json) => {
    const errors = [];

    errors.push(...checkH1(json));
    errors.push(...checkH2(json));
    errors.push(...checkH3(json));

    return errors;
}