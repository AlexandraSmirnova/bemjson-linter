import { checkH1Header, isH1Header, isH2Header, isHeader, getH2Headers, getH3Headers } from "./checkHeaders";
import errorCodes from "./errorCodes";
import calculateLocation from "../utils/calculateLocation";
import { checkBlockByName } from "../utils/checkUtils";
import { makeBranches } from "../utils/treeUtils";

const getLastStartLine = (headers) => headers.length > 0
    ? headers[headers.length - 1].location.start.line + 1 : 0;

const checkBlockText = (objToCheck, json, headers) => {
    const errors = [];

    if (isH1Header(objToCheck.mods.type)) {
        if (!checkH1Header(headers)) {
            errors.push({
                ...errorCodes.SEVERAL_H1,
                location: calculateLocation(objToCheck, json, getLastStartLine(headers))
            })
        }

        const arrayH2 = getH2Headers(headers);

        if (arrayH2.length) {
            arrayH2.forEach((item) => {
                errors.push({
                    ...errorCodes.INVALID_H2_POSITION,
                    location: item.location
                })
            })
        }
    } else if (isH2Header(objToCheck.mods.type)) {
        const arrayH3 = getH3Headers(headers);

        if (arrayH3.length) {
            arrayH3.forEach((item) => {
                errors.push({
                    ...errorCodes.INVALID_H3_POSITION,
                    location: item.location
                })
            })
        }
    }

    return errors;
}

export const textLinter = (obj, json, headers = []) => {
    const errors = [];

    if (checkBlockByName(obj, 'text') && isHeader(obj)) {
        errors.push(...checkBlockText(obj, json, headers));
        headers.push({
            type: obj.mods.type,
            location: calculateLocation(obj, json, getLastStartLine(headers)),
        });
    }

    if (obj.content) {
        makeBranches(obj.content, (item) => {
            errors.push(...textLinter(item, json, headers))
        })
    }

    return errors;
}