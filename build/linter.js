(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.lint = {}));
}(this, function (exports) { 'use strict';

    const textTypes = {
        H1: 'h1',
        H2: 'h2',
        H3: 'h3',
        P: 'p'
    };

    const isHeader = (block) => block && block.mods 
        && block.mods.type 
        && block.mods.type !== textTypes.P;

    const isH1Header = (type) => type === textTypes.H1;
    const isH2Header = (type) => type === textTypes.H2;

    const checkH1Header = (headers) => !headers.find((item) => item.type === textTypes.H1);

    const getH2Headers = (headers) => headers.filter((item) => item.type === textTypes.H2);
    const getH3Headers = (headers) => headers.filter((item) => item.type === textTypes.H3);

    const errors = {
        SEVERAL_H1: 'Несколько заголовков H1',
        INVALID_H2_POSITION: 'H2 не может следовать перед H1',
        INVALID_H3_POSITION: 'H3 не может следовать перед H2',
    };   

    const createErrorsDict = () => {
        const errorsDict = {};
        Object.keys(errors).forEach((code) => {
            errorsDict[code] = {
                code: `TEXT.${code}`,
                error: errors[code],
            }; 
        });

        return errorsDict;
    };

    var errorCodes = createErrorsDict();

    const calculateLocation = (errorBlock, json, lineStart = 0) => {
        const rows = json.split('\n');
        const searchedJson = JSON.stringify(errorBlock);

        let lineEnd = 0;
        let columnStart = 0;
        let columnEnd = 0;
        let simbolIndexToCheck = 0;

        let found = false;
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
                    simbolIndexToCheck = 0;
                }
            }
        }

        return {
            start: { column: columnStart, line: lineStart },
            end: { column: columnEnd, line: lineEnd },
        }
    };

    const checkBlockByName = (obj, blockName) => Boolean(
        obj.block && obj.block === blockName
        || obj.mix && obj.mix.some((mix) => checkBlockByName(mix, blockName))
    );

    const makeBranches = (source, callback) => {
        if (Array.isArray(source)) {
            source.forEach(callback);
        } else {
            callback(source);
        }
    };

    const getLastStartLine  = (headers) => headers.length > 0 
        ? headers[headers.length - 1].location.start.line + 1: 0;

    const checkBlockText = (objToCheck, json, headers) => {
        const errors = [];

        if (isH1Header(objToCheck.mods.type)) {
            if (!checkH1Header(headers)) {
                errors.push({
                    ...errorCodes.SEVERAL_H1,
                    location: calculateLocation(objToCheck, json, getLastStartLine(headers))
                });
            }

            const arrayH2 = getH2Headers(headers);

            if (arrayH2.length) {
                arrayH2.forEach((item) => {
                    errors.push({
                        ...errorCodes.INVALID_H2_POSITION,
                        location: item.location
                    });
                });
            }
        } else if (isH2Header(objToCheck.mods.type)) {
            const arrayH3 = getH3Headers(headers);

            if (arrayH3.length) {
                arrayH3.forEach((item) => {
                    errors.push({
                        ...errorCodes.INVALID_H3_POSITION,
                        location: item.location
                    });
                });
            }
        } 

        return errors;
    };

    const textLinter = (obj, json, headers = []) => {
        const errors = [];

        if (checkBlockByName(obj, 'text') && isHeader(obj)) {
            errors.push(...checkBlockText(obj, json, headers));
            headers.push({ 
                type: obj.mods.type,
                location: calculateLocation(obj, json, getLastStartLine(headers)),
            });
        }

        if (obj.content) {
            makeBranches(obj.content, (item) => {
                errors.push(...textLinter(item, json, headers));
            });
        }

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

    const errors$1 = {
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

    const createErrorsDict$1 = () => {
        const errorsDict = {};
        Object.keys(errors$1).forEach((code) => {
            errorsDict[code] = {
                code: `FORM.${code}`,
                error: errors$1[code],
            }; 
        });

        return errorsDict;
    };

    var errorCodes$1 = createErrorsDict$1();

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
            etalonSize = checkContentSizes(block.content, etalonSize);
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
            etalonSize = checkBlockContent(content, etalonSize);
        }

        return etalonSize;
    };

    var checkInput = (objectToCheck, json) => {
        try {
            if (objectToCheck.content) {
                checkContentSizes(objectToCheck.content);
            }
        } catch(e) {
            return [{
                ...errorCodes$1.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL,
                location: calculateLocation(objectToCheck, json),
            }]
        }

        return [];
    };

    const checkBlockForm = (objToCheck, json) => {
        const errors = [];

        errors.push(...checkContent());
        errors.push(...checkFooter());
        errors.push(...checkHeader());
        errors.push(...checkInput(objToCheck, json));
        
        return errors;
    };

    const formLinter = (obj, json) => {
        const errors = [];

        if(checkBlockByName(obj, 'form')) {
            errors.push(...checkBlockForm(obj, json));
        }

        if(obj.content) {
            makeBranches(obj.content, (item) => {
                errors.push(...formLinter(item, json));
            });
        }

        return errors;
    };

    const checkBemObj = (obj, json) => {
        const errors = [];

        errors.push(...formLinter(obj, json));
        errors.push(...textLinter(obj, json));

        return errors;
    };


    const lint = (json) => {
        const bemObj = JSON.parse(json);

        return checkBemObj(bemObj, json);
    };

    window.lint = lint;

    exports.lint = lint;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
