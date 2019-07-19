(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.lint = {}));
}(this, function (exports) { 'use strict';

    var checkH1 = (json) => {

        return [];
    };

    var checkH2 = (json) => {

        return [];
    };

    var checkH3 = (json) => {

        return [];
    };

    var textLinter = (json) => {
        const errors = [];

        errors.push(...checkH1());
        errors.push(...checkH2());
        errors.push(...checkH3());

        return errors;
    };

    var checkContent = (json) => {

        return [];
    };

    var checkFooter = (json) => {

        return [];
    };

    var checkHeader = (json) => {

        return [];
    };

    const errors = {
        INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL: 'Подписи и поля должны быть одного размера',
        CONTENT_VERTICAL_SPACE_IS_INVALID: `Вертикальный внутренний отступ контентного элемента со значением space-v 
        должен быть на 2 шага больше эталонного размера`,
        CONTENT_HORIZONTAL_SPACE_IS_INVALID: `Горизонтальный внутренний отступ контентного элемента должен задаваться 
        с помощью модификатора space-h на 1 шаг больше эталонного размера`,
        HEADER_TEXT_SIZE_IS_INVALID: `Все текстовые блоки в заголовке формы (элемент header) должны быть со значением 
        модификатора size на 2 шага больше эталонного размера`,
        HEADER_VERTICAL_SPACE_IS_INVALID:  "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
        HEADER_HORIZONTAL_SPACE_IS_INVALID: "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
        FOOTER_VERTICAL_SPACE_IS_INVALID: "Вертикальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
        FOOTER_HORIZONTAL_SPACE_IS_INVALID: "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
        FOOTER_TEXT_SIZE_IS_INVALID: "Размер текстовых блоков в подвале должен соответствовать эталонному"
    };   

    const createErrorsDict = () => {
        const errorsDict = {};
        Object.keys(errors).forEach((code) => {
            errorsDict[code] = {
                code: `FORM.${code}`,
                error: errors[code],
            }; 
        });

        return errorsDict;
    };

    var errorCodes = createErrorsDict();

    const calculateLocation = (errorBlock, json) => {
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
                    simbolIndexToCheck = 0;
                }
            }
        }

        return {
            start: { column: columnStart, line: rowStart },
            end: { column: columnEnd, line: rowEnd },
        }
    };

    const isSizeRight = (size, rightSize) => size === rightSize;

    const checkBlockMods = (block) => block.mods && block.mods.size;  

    const checkBlockContent = (block, etalonSize) => {
        if(checkBlockMods(block)) {
            if (!etalonSize) {
                return block.mods.size;
            } else if (!isSizeRight(block.mods.size, etalonSize)){
                throw new Error();
            }
        }

        if(block.content) {
            checkContentSizes(block.content, etalonSize);
        }

        return etalonSize;
    };

    const checkContentSizes = (content, rightSize = null) => {
        let etalonSize = rightSize;

        if (Array.isArray(content)) {
            content.forEach((item) => {
                etalonSize = checkBlockContent(item, etalonSize);
            });
        } else {
            etalonSize = checkBlockContent(item, etalonSize);
        }
    };

    var checkInput = (objectToCheck, json) => {
        if (!objectToCheck.content) {
            return [];
        }

        try {
            checkContentSizes(objectToCheck.content);
        } catch(e) {
            return [{
                ...errorCodes.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL,
                location: calculateLocation(objectToCheck, json),
            }]
        }


        return [];
    };

    var formLinter = (objToCheck, json) => {
        const errors = [];

        errors.push(...checkContent());
        errors.push(...checkFooter());
        errors.push(...checkHeader());
        errors.push(...checkInput(objToCheck, json));
        
        return errors;
    };

    const checkBlockByName = (obj, blockName) => Boolean(
        obj.block && obj.block === blockName
        || obj.mix && obj.mix.some((mix) => checkBlockByName(mix, blockName))
    );

    const checkBemObj = (obj, json) => {
        const errors = [];

        if(checkBlockByName(obj, 'form')) {
            errors.push(...formLinter(obj, json));
        }

        if(checkBlockByName(obj, 'text')) {
            errors.push(...textLinter());
        }

        return errors
    };


    const lint = (json) => {
        const bemObj = JSON.parse(json);

        return checkBemObj(bemObj, json);
    };

    window.lint = lint;

    exports.lint = lint;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
