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
}   

const createErrorsDict = () => {
    const errorsDict = {};
    
    Object.keys(errors).forEach((code) => {
        errorsDict[code] = {
            code: `FORM.${code}`,
            error: errors[code],
        } 
    })

    return errorsDict;
}

export default createErrorsDict();