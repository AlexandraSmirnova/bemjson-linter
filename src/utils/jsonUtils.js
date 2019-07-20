export const calculateLocation = (errorBlock, json, lineStart = 0) => {
    const rows = json.split('\n');
    const searchedJson = JSON.stringify(errorBlock);

    let lineEnd = 0;
    let columnStart = 0;
    let columnEnd = 0;
    let simbolIndexToCheck = 0;

    let found = false
    for (let i = lineStart; i < rows.length && !found ; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === searchedJson[simbolIndexToCheck]) {
                // если совпавший символ в начале или в конце искомого блока - сохраняем позицию
                if (simbolIndexToCheck === 0) {
                    lineStart = i + 1;
                    columnStart = j + 1;
                } else if (simbolIndexToCheck === searchedJson.length - 1) {
                    lineEnd = i + 1;
                    columnEnd = j + 2;
                    found = true;
                    break;
                }
                simbolIndexToCheck++;
            } else if (rows[i][j] !== ' ' && rows[i][j] !== '\t') {
                // если символ не совпал и не пробельный, то сбрасываем
                simbolIndexToCheck = 0
            }
        }
    }

    return {
        start: { column: columnStart, line: lineStart },
        end: { column: columnEnd, line: lineEnd },
    }
}
