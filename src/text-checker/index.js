import checkH1 from "./check-h1";
import checkH2 from "./check-h2";
import checkH3 from "./check-h3";

export const checkIfText = (obj) => obj.block && obj.block === 'text'
    || obj.mix  && obj.mix.some((mix) => checkIfText(mix));

export const textLinter = (json) => {
    const errors = [];

    errors.push(...checkH1(json));
    errors.push(...checkH2(json));
    errors.push(...checkH3(json));

    return errors;
}