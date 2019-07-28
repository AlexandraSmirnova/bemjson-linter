import calculateLocation from "./calculateLocation";


const mockJson1 = `{
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


const mockJson2 = `{
    "block": "foo",
    "content": [
        {
            "block": "bar"
        },
        {
            "block": "bar"
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
            JSON.parse(mockJson1),
            {
                start: { column: 1, "line": 1 },
                end: { column: 2, "line": 17 }
            }
        ]
    ])('should return location %p for block', (searchedBlock, expected) => {
        expect(calculateLocation(searchedBlock, mockJson1)).toEqual(expected);
    })

    test.each([
        [
            { block: "bar" },
            0, 
            {
                start: { column: 9, line: 4 },
                end: { column: 10, line: 6 }
            }
        ],
        [
            { block: "bar" },
            5,
            {
                start: { column: 9, line: 7 },
                end: { column: 10, line: 9 }
            }
        ]

    ])('test repeated blocks %#', (searchedBlock, lineStart, expected) => {
        expect(calculateLocation(searchedBlock, mockJson2, lineStart)).toEqual(expected);
    })
});