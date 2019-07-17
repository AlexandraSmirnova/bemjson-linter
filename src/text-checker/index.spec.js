import { checkIfText } from ".";


describe('test checkIfText', () => {
    test.each([
        [{ block: "text" }, true],
        [{ block: "layout" }, false],
        [{ block: "layout", mix: [{ block: "text"}] }, true],

    ])('should check object %p on text blocks ', (input, expected)  => {
        expect(checkIfText(input)).toEqual(expected);
    })
});
