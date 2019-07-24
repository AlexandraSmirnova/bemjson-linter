export const invalidSpaceJson1 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "xl" } }]
    }
}
`

export const invalidSpaceJson2 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "m" } }]
    }
}
`

export const invalidSpaceJson3 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xxl" } }]
    }
}
`

export const invalidSpaceJson4 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": { "size": "l", "space-h": "s" } }]
    }
}`

export const invalidIndentJson1 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": [
            {
                "block": "form",
                "elem":  "content-item",
                "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "l" } }],
                "content": { "block": "input", "mods": { "size": "l" } }
            },
            {
                "block": "form",
                "elem":  "content-item",
                "content": { "block": "input", "mods": { "size": "l" } }
            }
        ]
    }
}
`

export const invalidIndentJson2 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": [
            {
                "block": "form",
                "elem":  "content-item",
                "mix": { "block": "form", "elem": "item", "mods": { "indent-b": "s" } },
                "content": { "block": "input", "mods": { "size": "l" } }
            }
        ]
    }
}
`