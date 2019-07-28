import { formLinter } from '.';
import {
    invalidSpaceJson1, invalidSpaceJson2, invalidSpaceJson3, invalidSpaceJson4,
    invalidIndentJson1, invalidIndentJson2, invalidHeaderJson1, invalidHeaderJson2, invalidHeaderJson3,
    invalidHeaderJson4, invalidHeaderJson5, invalidHeaderJson6, invalidFooterJson1, invalidFooterJson2,
    invalidFooterJson3, invalidFooterJson4, invalidFooterJson5, invalidFooterJson6, invalidSizeJson1,
    invalidSizeJson2, invalidSizeJson3, severalErrorsJson1, severalErrorsJson2
} from './__mocks__/invalidJsons';
import {
    validJson1, validJson2, validJson3, validJson4, validJson5, validJson6, validJson7, validJson8,
    validJson9, validJson10
} from './__mocks__/validJsons';

describe('test form linter', () => {
    test.each([
        invalidSizeJson1,
        invalidSizeJson2,
        invalidSizeJson3
    ])('should return error FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL for %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
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
        severalErrorsJson1,
        severalErrorsJson2,
    ])('should return several errors %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toMatchSnapshot();
    });

    test.each([
        validJson1,
        validJson2,
        validJson3,
        validJson4,
        validJson5,
        validJson6,
        validJson7,
        validJson8,
        validJson9,
        validJson10,
    ])('should return array without errors for %#', (json) => {
        expect(formLinter(JSON.parse(json), json)).toEqual([]);
    });
});
