import { formLinter } from '.';
import errorCodes from './errorCodes';


describe('test form linter', () => {
    test.each([
        [
            [
                {
                    block: "form",
                    elem: "label",
                    content: {
                        block: "text",
                        mods: { "size": "l" }
                    }
                },
                { block: "input", mods: { size: "s" } }
            ],
            {
                start: {column: 1, line: 1},
                end: { column: 2, line: 21 }
            }
        ],
        [
            [
                { block: "input", mods: { size: "s" } },
                { block: "input", mods: { size: "m" } }
            ],
            {
                start: {column: 1, line: 1},
                end: { column: 2, line: 17 }
            }
        ]
    ])('should return error FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL for %p', (content, location) => {
        const obj = { block: "form", content };
        const expected = [{ 
            ...errorCodes.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL,
            location
        }];

        expect(formLinter(obj, JSON.stringify(obj, null, ' '))).toEqual(expected);
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

    ])('should return array without errors for %p', (obj) => {
        expect(formLinter(obj, JSON.stringify(obj))).toEqual([]);
    });
});