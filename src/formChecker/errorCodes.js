export const errorCodes = {
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
    [errorCodes.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL]: 'Подписи и поля должны быть одного размера',
    [errorCodes.CONTENT_VERTICAL_SPACE_IS_INVALID]: `Вертикальный внутренний отступ контентного элемента со значением space-v
        должен быть на 2 шага больше эталонного размера`,
    [errorCodes.CONTENT_HORIZONTAL_SPACE_IS_INVALID]: `Горизонтальный внутренний отступ контентного элемента должен задаваться
        с помощью модификатора space-h на 1 шаг больше эталонного размера`,
    [errorCodes.CONTENT_ITEM_INDENT_IS_INVALID]: `Модификатора indent-b у элементов формы content-item должен быть на 1 шаг больше эталонного размера`,
    [errorCodes.HEADER_TEXT_SIZE_IS_INVALID]: `Все текстовые блоки в заголовке формы (элемент header) должны быть со значением
        модификатора size на 2 шага больше эталонного размера`,
    [errorCodes.HEADER_VERTICAL_SPACE_IS_INVALID]: "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
    [errorCodes.HEADER_HORIZONTAL_SPACE_IS_INVALID]: "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
    [errorCodes.FOOTER_VERTICAL_SPACE_IS_INVALID]: "Вертикальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
    [errorCodes.FOOTER_HORIZONTAL_SPACE_IS_INVALID]: "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера",
    [errorCodes.FOOTER_TEXT_SIZE_IS_INVALID]: "Размер текстовых блоков в подвале должен соответствовать эталонному"
}

export const getErrorInfoByCode = (code) => ({
    code: `FORM.${code}`,
    error: errorMessages[code],
});

export class FormError extends Error {
    constructor(code, location = null) {
        super();

        const errorInfo = getErrorInfoByCode(code);
        this.code = errorInfo.code;
        this.error = errorInfo.error;
        this.location = location;
    }
}

export class ErrorCollector {
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
