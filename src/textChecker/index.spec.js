import { textLinter } from ".";
import * as invalindBemjson from './__mocks__/invalidBemjson';
import errorCodes from "./errorCodes";

describe('test text linter', () => {
    test.each([
        [
            invalindBemjson.json1, 
            {
                start: {column: 9, line: 8},
                end: { column: 10, line: 11 }
            }
        ],
    ])('should return error TEXT.SEVERAL_H1', (json, location) => {
        const expected = [{
            ...errorCodes.SEVERAL_H1,
            location,
        }];
        expect(textLinter(JSON.parse(json), json)).toEqual(expected);
    })

    test.each([
        [
            invalindBemjson.json2, 
            {
                start: {column: 9, line: 4},
                end: { column: 10, line: 7 }
            }
        ],
    ])('should return error TEXT.INVALID_H2_POSITION %#', (json, location) => {
        const expected = [{
            ...errorCodes.INVALID_H2_POSITION,
            location,
        }];
        expect(textLinter(JSON.parse(json), json)).toEqual(expected);
    })

    test.each([
        [
            invalindBemjson.json3, 
            {
                start: {column: 9, line: 4},
                end: { column: 10, line: 7 }
            }
        ],
    ])('should return error TEXT.INVALID_H3_POSITION %#', (json, location) => {
        const expected = [{
            ...errorCodes.INVALID_H3_POSITION,
            location,
        }];
        expect(textLinter(JSON.parse(json), json)).toEqual(expected);
    })

    test.each([
        { block: 'test'},
        {
            block: "form",
            content: [
                { block: "text", mods: { size: "l" } },
                { block: "input", mods: { size: "l" } },
            ]
 
        }

    ])('should return array without errors for %p %#', (obj) => {
        expect(textLinter(obj, JSON.stringify(obj))).toEqual([]);
    });
});