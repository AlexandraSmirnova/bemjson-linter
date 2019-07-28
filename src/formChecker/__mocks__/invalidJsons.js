export const invalidSizeJson1 = `{ 
    "block": "form",
    "content":  [
        {
            "block": "form",
            "elem": "label",
            "content": {
                "block": "text",
                "mods": { "size": "l" }
            }
        },
        { 
            "block": "input", 
            "mods": { "size": "s" }
        }
    ]
}`;

export const invalidSizeJson2 = `{ 
    "block": "form",
    "content": [
        { "block": "input", "mods": { "size": "s" } },
        { "block": "input", "mods": { "size": "m" } }
    ]
}`;

export const invalidSizeJson3 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-h": "xl" } } ]
        }
    ]
}`;

export const invalidSpaceJson1 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "xl" } }]
    }
}`;

export const invalidSpaceJson2 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-v": "m" } }]
    }
}`;

export const invalidSpaceJson3 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xxl" } }]
    }
}`;

export const invalidSpaceJson4 = `{
    "block": "form",
    "content": {
        "block": "form",
        "elem": "content",
        "content": { "block": "input", "mods": { "size": "l" } },
        "mix": [{ "block": "form", "elem": "item", "mods": { "size": "l", "space-h": "s" } }]
    }
}`;

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
}`;

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
}`;

export const invalidHeaderJson1 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "content": {
                "block": "text",
                "mods": {
                    "size": "xl"
                }
            }
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

export const invalidHeaderJson2 = `{
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
                },
                {
                    "block": "text",
                    "mods": {
                        "size": "s"
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
}`;

export const invalidHeaderJson3 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-v": "s" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

export const invalidHeaderJson4 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": { "block": "form", "elem": "item", "mods": { "space-v": "xxl" } }
        }, 
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

export const invalidHeaderJson5 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": [ { "block": "form", "elem": "item", "mods": { "space-h": "s" } } ]
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

export const invalidHeaderJson6 = `{
    "block": "form",
    "content": [
        {
            "block": "form",
            "elem": "header",
            "mix": { "block": "form", "elem": "item", "mods": { "space-h": "xxs" } }
        },
        {
            "block": "input",
            "mods": {
                "size": "l"
            }
        }
    ]
}`;

export const invalidFooterJson1 = `{
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
            "mix": { "block": "form", "elem": "item", "mods": { "space-v": "xxl" } }
        }
    ]
}`;

export const invalidFooterJson2 = `{
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
            "mix": [{ "block": "form", "elem": "item", "mods": { "space-v": "s" } }]
        }
    ]
}`;

export const invalidFooterJson3 = `{
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
            "mix": { "block": "form", "elem": "item", "mods": { "space-h": "xxl" } }
        }
    ]
}`;

export const invalidFooterJson4 = `{
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
            "mix": [{ "block": "form", "elem": "item", "mods": { "space-h": "s" } }]
        }
    ]
}`;

export const invalidFooterJson5 = `{
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
                        "size": "xxl"
                    }
                }
            ]
        }
    ]
}`;

export const invalidFooterJson6 = `{
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
            "content": {
                "block": "text",
                "mods": {
                    "size": "s"
                }
            }
        }
    ]
}`;