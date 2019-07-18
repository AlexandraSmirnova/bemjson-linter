export const calculateLocation = (json, errorBlock) => {
    const rows = json.split('\n');
    const searchedJson = JSON.stringify(errorBlock);

    let rowStart = 0;
    let columnStart = 0;
    let rowEnd = 0;
    let columnEnd = 0;

    let simbolIndexToCheck = 0;

    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (rows[i][j] === searchedJson[simbolIndexToCheck]) {
                // если совпавший символ в начале или в конце искомого блока - сохраняем позицию
                if (simbolIndexToCheck === 0) {
                    rowStart = i + 1;
                    columnStart = j + 1;
                } else if (simbolIndexToCheck === searchedJson.length - 1) {
                    rowEnd = i + 1;
                    columnEnd = j + 2;
                    break;
                }
                simbolIndexToCheck++;
            } else if (rows[i][j] !== ' ') {
                // если символ не совпал и не пробельный, то сбрасываем
                simbolIndexToCheck = 0
            }
        }
    }

    return {
        start: { column: columnStart, line: rowStart },
        end: { column: columnEnd, line: rowEnd },
    }
}