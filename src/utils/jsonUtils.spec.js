import { calculateLocation } from "./jsonUtils";


const mockJson = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "xl" }
            }
        },
        {
            "block": "input",
            "mods": { "size": "xxl" }
        }
    ]
}`;

describe('test calculate location', () => {
    test.each([
        [
            { block: "input", mods: { size: "xxl" } },
            {
                start: { column: 9, line: 12 },
                end: { column: 10, line: 15 }
            }
        ],
        [
            JSON.parse(mockJson),
            {
                start: { column: 1, "line": 1 },
                end: { column: 2, "line": 17 }
            }
        ]
    ])('should return location %p for block', (searchedBlock, expected) => {
        expect(calculateLocation(mockJson, searchedBlock)).toEqual(expected);
    })
});