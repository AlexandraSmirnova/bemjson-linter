import { checkIfForm } from ".";

describe('test checkIfForm', () => {
    test.each([
        [{ block: "form" }, true],
        [{ block: "layout" }, false],
        [{ block: "layout", mix: [{ block: "form"}] }, true],

    ])('should check object %p on form blocks ', (input, expected)  => {
        expect(checkIfForm(input)).toEqual(expected);
    })
});