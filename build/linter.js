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

    var calculateLocation = (errorBlock, json, lineStart = 0) => {
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

    const sizes = ['xxxxxs', 'xxxxs', 'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl', 'xxxxxl'];

    const compareWithEtalonSize = (value, etalonSize, step = 0) => {
        const index = sizes.indexOf(etalonSize) + step;

        return sizes[index] === value;
    };

    const getBlockMod = (block, modName) => block.mods && block.mods[modName]
        ? block.mods[modName]
        : null;

    const checkBlockByName = (obj, blockName) => Boolean(
        obj.block && obj.block === blockName
        || obj.elem && obj.elem === blockName
        || obj.mix && (Array.isArray(obj.mix)
            ? obj.mix.some((mix) => checkBlockByName(mix, blockName))
            : checkBlockByName(obj.mix, blockName))
    );

    const wrapRule = (errorCollector, generalErrorType) => (ruleFunc, params) => {
        try {
            ruleFunc(...params);
        } catch (e) {
            if (e instanceof generalErrorType) {
                return errorCollector.addErrors({
                    code: e.code,
                    error: e.error,
                    location: e.location ? e.location : errorCollector.defaultLocation,
                });
            }

            throw e;
        }
    };

    /**
     * Функция для упрощения обработки полей, которые могут быть как объектами, так и массивами
     * @param  {array|object} source - поле, которое может быть как объектом так и массивом объектов
     * @param  {function} callback - функция для обработки объектов
     */
    const makeBranches = (source, callback) => {
        if (Array.isArray(source)) {
            source.forEach(callback);
        } else {
            callback(source);
        }
    };

    const getLastStartLine = (headers) => headers.length > 0
        ? headers[headers.length - 1].location.start.line + 1 : 0;

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

    const errorCodes$1 = {
        INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL: 'INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL',
        CONTENT_VERTICAL_SPACE_IS_INVALID: 'CONTENT_VERTICAL_SPACE_IS_INVALID',
        CONTENT_HORIZONTAL_SPACE_IS_INVALID: 'CONTENT_HORIZONTAL_SPACE_IS_INVALID',
        HEADER_TEXT_SIZE_IS_INVALID: 'HEADER_TEXT_SIZE_IS_INVALID',
        CONTENT_ITEM_INDENT_IS_INVALID: 'CONTENT_ITEM_INDENT_IS_INVALID',
        HEADER_VERTICAL_SPACE_IS_INVALID: 'HEADER_VERTICAL_SPACE_IS_INVALID',
        HEADER_HORIZONTAL_SPACE_IS_INVALID: 'HEADER_HORIZONTAL_SPACE_IS_INVALID',
        FOOTER_VERTICAL_SPACE_IS_INVALID: 'FOOTER_VERTICAL_SPACE_IS_INVALID',
        FOOTER_HORIZONTAL_SPACE_IS_INVALID: 'FOOTER_HORIZONTAL_SPACE_IS_INVALID',
        FOOTER_TEXT_SIZE_IS_INVALID: 'FOOTER_TEXT_SIZE_IS_INVALID'
    };

    const errorMessages = {
        [errorCodes$1.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL]: 'Подписи и поля должны быть одного размера',
        [errorCodes$1.CONTENT_VERTICAL_SPACE_IS_INVALID]: `Вертикальный внутренний отступ контентного элемента со значением space-v
        должен быть на 2 шага больше эталонного размера`,
        [errorCodes$1.CONTENT_HORIZONTAL_SPACE_IS_INVALID]: `Горизонтальный внутренний отступ контентного элемента должен задаваться
        с помощью модификатора space-h на 1 шаг больше эталонного размера`,
        [errorCodes$1.CONTENT_ITEM_INDENT_IS_INVALID]: `Модификатора indent-b у элементов формы content-item должен быть на 1 шаг больше эталонного размера`,
        [errorCodes$1.HEADER_TEXT_SIZE_IS_INVALID]: `Все текстовые блоки в заголовке формы (элемент header) должны быть со значением
        модификатора size на 2 шага больше эталонного размера`,
        [errorCodes$1.HEADER_VERTICAL_SPACE_IS_INVALID]: "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
        [errorCodes$1.HEADER_HORIZONTAL_SPACE_IS_INVALID]: "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
        [errorCodes$1.FOOTER_VERTICAL_SPACE_IS_INVALID]: "Вертикальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
        [errorCodes$1.FOOTER_HORIZONTAL_SPACE_IS_INVALID]: "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
        [errorCodes$1.FOOTER_TEXT_SIZE_IS_INVALID]: "Размер текстовых блоков в подвале должен соответствовать эталонному"
    };

    const getErrorInfoByCode = (code) => ({
        code: `FORM.${code}`,
        error: errorMessages[code],
    });

    class FormError extends Error {
        constructor(code, location = null) {
            super();

            const errorInfo = getErrorInfoByCode(code);
            this.code = errorInfo.code;
            this.error = errorInfo.error;
            this.location = location;
        }
    }

    class ErrorCollector {
        constructor(defaultLocation) {
            this.errors = [];
            this.defaultLocation = defaultLocation;
        }

        getErrors () {
            return this.errors;
        }

        addErrors(value) {
            this.errors.push(value);
        }
    }

    let errorCollector = null;
    let wrapContentRule = null;

    const checkSpaceV = (mix, etalonSize) => {
        const spaceV = getBlockMod(mix, 'space-v');

        if (spaceV && !compareWithEtalonSize(spaceV, etalonSize, 2)) {
            throw new FormError(errorCodes$1.CONTENT_VERTICAL_SPACE_IS_INVALID);
        }
    };

    const checkSpaceH = (mix, etalonSize) => {
        const spaceH = getBlockMod(mix, 'space-h');

        if (spaceH && !compareWithEtalonSize(spaceH, etalonSize, 1)) {
            throw new FormError(errorCodes$1.CONTENT_HORIZONTAL_SPACE_IS_INVALID);
        }
    };

    const checkIndentB = (block, json, etalonSize) => {
        makeBranches(block.mix, (mix) => {
            const indentB = getBlockMod(mix, 'indent-b');

            if (indentB && !compareWithEtalonSize(indentB, etalonSize, 1)) {
                throw new FormError(
                    errorCodes$1.CONTENT_ITEM_INDENT_IS_INVALID,
                    calculateLocation(block, json)
                );
            }
        });
    };

    const checkSpacesAndIndents = (block, json, etalonSize) => {
        if (block.mix) {
            makeBranches(block.mix, (mix) => {
                wrapContentRule(checkSpaceV, [mix, etalonSize]);
                wrapContentRule(checkSpaceH, [mix, etalonSize]);
            });
        }

        if (block.content) {
            makeBranches(block.content, (contentItem) => {
                if (checkBlockByName(contentItem, 'content-item') && contentItem.mix) {
                    wrapContentRule(checkIndentB, [contentItem, json, etalonSize]);
                }
            });
        }

        return etalonSize;
    };


    var checkContent = (objectToCheck, json, etalonSize) => {
        errorCollector = new ErrorCollector(calculateLocation(objectToCheck, json));
        wrapContentRule = wrapRule(errorCollector, FormError);

        checkSpacesAndIndents(objectToCheck, json, etalonSize);

        return errorCollector.getErrors();
    };

    let errorCollector$1 = null;
    let wrapFooterRule = null;

    const checkSpaceV$1 = (block, etalonSize) => {
        const spaceV = getBlockMod(block, 'space-v');

        if (spaceV && !compareWithEtalonSize(spaceV, etalonSize)) {
            throw new FormError(
                errorCodes$1.FOOTER_VERTICAL_SPACE_IS_INVALID,
            );
        }
    };

    const checkSpaceH$1 = (block, etalonSize) => {
        const spaceH = getBlockMod(block, 'space-h');

        if (spaceH && !compareWithEtalonSize(spaceH, etalonSize, 1)) {
            throw new FormError(
                errorCodes$1.FOOTER_HORIZONTAL_SPACE_IS_INVALID,
            );
        }
    };

    const checkTextSize = (block, json, etalonSize) => {
        const blockSize = getBlockMod(block, 'size');

        if (blockSize && !compareWithEtalonSize(blockSize, etalonSize)) {
            throw new FormError(
                errorCodes$1.FOOTER_TEXT_SIZE_IS_INVALID,
                calculateLocation(block, json)
            );
        }
    };

    const checkFooterRules = (block, json, etalonSize) => {
        if (block.mix) {
            makeBranches(block.mix, (mix) => {
                if (checkBlockByName(mix, 'item') && mix.mods) {
                    wrapFooterRule(checkSpaceV$1, [mix, etalonSize]);
                    wrapFooterRule(checkSpaceH$1, [mix, etalonSize]);
                }
            });
        }

        if (block.content) {
            makeBranches(block.content, (contentItem) => {
                if (checkBlockByName(contentItem, 'text') && contentItem.mods) {
                    wrapFooterRule(checkTextSize, [contentItem, json, etalonSize]);
                }
            });
        }

        return etalonSize;
    };


    var checkFooter = (objectToCheck, json, etalonSize) => {
        errorCollector$1 = new ErrorCollector(calculateLocation(objectToCheck, json));
        wrapFooterRule = wrapRule(errorCollector$1, FormError);

        checkFooterRules(objectToCheck, json, etalonSize);

        return errorCollector$1.getErrors();
    };

    let errorCollector$2 = null;
    let wrapHeaderRule = null;

    const checkSpaceV$2 = (block, etalonSize) => {
        const spaceV = getBlockMod(block, 'space-v');

        if (spaceV && !compareWithEtalonSize(spaceV, etalonSize)) {
            throw new FormError(
                errorCodes$1.HEADER_VERTICAL_SPACE_IS_INVALID,
            );
        }
    };

    const checkSpaceH$2 = (block, etalonSize) => {
        const spaceH = getBlockMod(block, 'space-h');

        if (spaceH && !compareWithEtalonSize(spaceH, etalonSize, 1)) {
            throw new FormError(
                errorCodes$1.HEADER_HORIZONTAL_SPACE_IS_INVALID,
            );
        }
    };

    const checkTextSize$1 = (block, json, etalonSize) => {
        const blockSize = getBlockMod(block, 'size');

        if (blockSize && !compareWithEtalonSize(blockSize, etalonSize, 2)) {
            throw new FormError(
                errorCodes$1.HEADER_TEXT_SIZE_IS_INVALID,
                calculateLocation(block, json)
            );
        }
    };

    const checkHeaderRules = (block, json, etalonSize) => {
        if (block.mix) {
            makeBranches(block.mix, (mix) => {
                if (checkBlockByName(mix, 'item') && mix.mods) {
                    wrapHeaderRule(checkSpaceV$2, [mix, etalonSize]);
                    wrapHeaderRule(checkSpaceH$2, [mix, etalonSize]);
                }
            });
        }

        if (block.content) {
            makeBranches(block.content, (contentItem) => {
                if (checkBlockByName(contentItem, 'text') && contentItem.mods) {
                    wrapHeaderRule(checkTextSize$1, [contentItem, json, etalonSize]);
                }
            });
        }

        return etalonSize;
    };


    var checkHeader = (objectToCheck, json, etalonSize) => {
        errorCollector$2 = new ErrorCollector(calculateLocation(objectToCheck, json));
        wrapHeaderRule = wrapRule(errorCollector$2, FormError);

        checkHeaderRules(objectToCheck, json, etalonSize);

        return errorCollector$2.getErrors();
    };

    const checkBlockContent = (block, etalonSize) => {
        const itemSize = getBlockMod(block, 'size');

        if (itemSize) {
            if (!etalonSize) {
                return itemSize;
            } else if (!compareWithEtalonSize(itemSize, etalonSize)) {
                throw new Error(etalonSize);
            }
        }

        return etalonSize;
    };

    const checkContentSizes = (block, rightSize = null) => {
        let etalonSize = rightSize;
        const elemsToCheck = ['label', 'input', 'button'];

        if (block.content) {
            makeBranches(block.content, (item) => {
                if (elemsToCheck.some((elem) => checkBlockByName(block, elem) || checkBlockByName(item, elem))) {
                    etalonSize = checkBlockContent(item, etalonSize);
                }
                etalonSize = checkContentSizes(item, etalonSize);
            });
        }

        return etalonSize;
    };

    var checkSizesAndGetEtalon = (objectToCheck, json) => {
        let etalonSize = null;
        try {
            etalonSize = checkContentSizes(objectToCheck);
            if (!etalonSize) {
                throw new Error();
            }
        } catch (e) {
            etalonSize = e.message;
            return {
                sizeErrors: [{
                    ...getErrorInfoByCode(errorCodes$1.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL),
                    location: calculateLocation(objectToCheck, json),
                }],
                etalonSize
            }
        }

        return { sizeErrors: [], etalonSize };
    };

    const checkBlockForm = (obj, json, etalonSize = null) => {
        let etalon = etalonSize;
        const errors = [];

        if (!etalon) {
            const { sizeErrors, etalonSize: foundEtalon } = checkSizesAndGetEtalon(obj, json);
            etalon = foundEtalon;
            errors.push(...sizeErrors);
        } else {
            if (checkBlockByName(obj, 'content')) {
                errors.push(...checkContent(obj, json, etalon));
            }
            if (checkBlockByName(obj, 'header')) {
                errors.push(...checkHeader(obj, json, etalon));
            }
            if (checkBlockByName(obj, 'footer')) {
                errors.push(...checkFooter(obj, json, etalon));
            }
        }

        if (obj.content) {
            makeBranches(obj.content, (item) => {
                const { errors: foundErrors, etalon: foundEtalon } = checkBlockForm(item, json, etalon);
                etalon = foundEtalon;
                errors.push(...foundErrors);
            });
        }

        return { errors, etalon };
    };

    const formLinter = (obj, json) => {
        const errors = [];

        if (checkBlockByName(obj, 'form')) {
            const { errors: foundErrors} = checkBlockForm(obj, json);
            errors.push(...foundErrors);
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
