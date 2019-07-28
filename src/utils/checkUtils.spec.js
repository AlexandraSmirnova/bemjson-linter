import { checkBlockByName } from "./checkUtils";


describe('test checkBlockByName', () => {
    test.each([
        [{ block: "text" }, 'text', true],
        [{ block: "layout" }, 'text', false],
        [{ block: "layout", mix: [{ block: "text"}] }, 'text', true],
        [{ block: "foo", elem: "bar" }, "bar", true],
        [{ block: "foo", content: { block: "bar" } }, 'bar', false],
        [{ block: "layout" }, 'form', false],
        [{ block: "layout", mix: { block: "form"} }, 'form', true],
    ])('should check object %p on text blocks', (input, blockName, expected)  => {
        expect(checkBlockByName(input, blockName)).toEqual(expected);
    })
});
