import { checkBlockByName } from "./searchUtils";


describe('test checkBlockByName', () => {
    test.each([
        [{ block: "text" }, 'text', true],
        [{ block: "layout" }, 'text', false],
        [{ block: "layout", mix: [{ block: "text"}] }, 'text', true],
        [{ block: "form" }, 'form', true],
        [{ block: "layout" }, 'form', false],
        [{ block: "layout", mix: [{ block: "form"}] }, 'form', true],
    ])('should check object %p on text blocks ', (input, blockName, expected)  => {
        expect(checkBlockByName(input, blockName)).toEqual(expected);
    })
});
