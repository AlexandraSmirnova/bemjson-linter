export const calculateLocation = (json, errorBlock, startIndex = 0) => {
    const wrongBlockJson = JSON.stringify(errorBlock)
    const startIndex = json.indexOf(wrongBlockJson, startIndex);

    // тут считаем location...
    
    return {
        start: { column: 0, row: 0},
        end: { column: 0, row: 0},
    }
}