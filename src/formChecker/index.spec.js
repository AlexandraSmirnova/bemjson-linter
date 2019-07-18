import formLinter from '.';
import errorCodes from './errorCodes';


describe('test form linter', () => {
    test.each([
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
        [
            { block: "input", mods: { size: "s" } },
            { block: "input", mods: { size: "m" } }
        ]
    ])('should return error FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL', (content) => {
        const obj = { block: "form", content };
        const expected = [{ 
            ...errorCodes.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL,
            location: {
                start: {column: 3, line: 27},
                end: { column: 4, line: 32 }
            }
        }];
        expect(formLinter(obj)).toEqual(expected);
    })

    test.each([

    ])('should return array without errors', () => {

    });
});