export const validJson1 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "l" }
            }
        },
        { "block": "input", "mods": { "size": "l" } }
    ]
}
`

export const validJson2 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "m" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "xl" } }]
    }
}
`

export const validJson3 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl" } }]
    }
}

`

export const validJson4 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": [
            {
                "block": "form",
                "elem":  "content-item",
                "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "xl" } }],
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

export const validJson5 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "content": [
                {
                    "block": "text",
                    "mods": {
                        "size": "xxl"
                    }
                }
            ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}
`

export const validJson6 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-v": "l" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}
`

export const validJson7 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-h": "xl" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}
`

export const validJson8 = `{
    "block": "form",
    "content": [
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "form",
            "elem": "footer",
            "mix": [{ "block": "form", "elem": "item", "mods": { "space-v": "l" } }]
        }
    ]
}
`

export const validJson9 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-h": "xl" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}
`

export const validJson10 = `{
    "block": "form",
    "content": [
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        },
        {
            "block": "form",
            "elem": "footer",
            "content": [
                {
                    "block": "text",
                    "mods": {
                        "size": "l"
                    }
                }
            ]
        }
    ]
}
`

