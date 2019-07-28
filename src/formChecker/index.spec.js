import { formLinter } from '.';
import { getErrorInfoByCode, errorCodes } from './errorCodes';
import { invalidSpaceJson1, invalidSpaceJson2, invalidSpaceJson3, invalidSpaceJson4, invalidIndentJson1, invalidIndentJson2, invalidHeaderJson1, invalidHeaderJson2, invalidHeaderJson3, invalidHeaderJson4, invalidHeaderJson5, invalidHeaderJson6, invalidFooterJson1, invalidFooterJson2, invalidFooterJson3, invalidFooterJson4, invalidFooterJson5, invalidFooterJson6 } from './__mocks__/invalidJson';


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
        invalidSpaceJson1,
        invalidSpaceJson2,
    ])('should return error FORM.CONTENT_VERTICAL_SPACE_IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        invalidSpaceJson3,
        invalidSpaceJson4,
    ])('should return error FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        invalidIndentJson1,
        invalidIndentJson2,
    ])('should return error FORM.CONTENT_ITEM_INDENT_IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        invalidHeaderJson1,
        invalidHeaderJson2,
    ])('should return error FORM.HEADER_TEXT_SIZE_IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        invalidHeaderJson3,
        invalidHeaderJson4,
    ])('should return error FORM.HEADER_VERTICAL_SPACE_IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        invalidHeaderJson5,
        invalidHeaderJson6,
    ])('should return error FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        invalidFooterJson1,
        invalidFooterJson2,
    ])('should return error FORM.FOOTER_VERTICAL_SPACE__IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        invalidFooterJson3,
        invalidFooterJson4,
    ])('should return error FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        invalidFooterJson5,
        invalidFooterJson6,
    ])('should return error FORM.FOOTER_TEXT_SIZE_IS_INVALID %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
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