import { formLinter } from '.';
import { getErrorInfoByCode, errorCodes } from './errorCodes';
import { invalidSpaceJson1, invalidSpaceJson2, invalidSpaceJson3, invalidSpaceJson4, invalidIndentJson1, invalidIndentJson2 } from './__mocks__/invalidJson';


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
                start: { column: 1, line: 1 },
                end: { column: 2, line: 21 }
            }
        ],
        [
            [
                { block: "input", mods: { size: "s" } },
                { block: "input", mods: { size: "m" } }
            ],
            {
                start: { column: 1, line: 1 },
                end: { column: 2, line: 17 }
            }
        ]
    ])('should return error FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL for %p', (content, location) => {
        const obj = { block: "form", content };
        const expected = [{
            ...getErrorInfoByCode(errorCodes.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL),
            location
        }];

        expect(formLinter(obj, JSON.stringify(obj, null, ' '))).toEqual(expected);
    })

    test.each([
        [
            invalidSpaceJson1,
            {
                start: { column: 16, line: 3 },
                end: { column: 6, line: 8 }
            },
        ],
        [
            invalidSpaceJson2,
            {
                start: { column: 16, line: 3 },
                end: { column: 6, line: 8 }
            },
        ]
    ])('should return error FORM.CONTENT_VERTICAL_SPACE_IS_INVALID %#', (json, location) => {
        const expected = [{
            ...getErrorInfoByCode(errorCodes.CONTENT_VERTICAL_SPACE_IS_INVALID),
            location
        }];
        expect(formLinter(JSON.parse(json), json)).toEqual(expected);
    });

    test.each([
        [
            invalidSpaceJson3,
            {
                start: { column: 16, line: 3 },
                end: { column: 6, line: 8 }
            },
        ],
        [
            invalidSpaceJson4,
            {
                start: { column: 16, line: 3 },
                end: { column: 6, line: 8 }
            },
        ]
    ])('should return error FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID %#', (json, location) => {
        const expected = [{
            ...getErrorInfoByCode(errorCodes.CONTENT_HORIZONTAL_SPACE_IS_INVALID),
            location
        }];
        expect(formLinter(JSON.parse(json), json)).toEqual(expected);
    });

    test.each([
        [
            invalidIndentJson1,
            {
                start: { column: 13, line: 7 },
                end: { column: 14, line: 12 }
            },
        ],
        [
            invalidIndentJson2,
            {
                start: { column: 13, line: 7 },
                end: { column: 14, line: 12 }
            },
        ]
    ])('should return error FORM.CONTENT_ITEM_INDENT_IS_INVALID %#', (json, location) => {
        const expected = [{
            ...getErrorInfoByCode(errorCodes.CONTENT_ITEM_INDENT_IS_INVALID),
            location
        }];
        expect(formLinter(JSON.parse(json), json)).toEqual(expected);
    });

    test.each([
        { block: 'test' },
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