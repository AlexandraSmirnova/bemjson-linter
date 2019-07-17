const errors = {
    SEVERAL_H1: 'Несколько заголовков H1',
    INVALID_H2_POSITION: 'H2 не может следовать перед H1',
    INVALID_H3_POSITION: 'H3 не может следовать перед H2',
}   

const createErrorsDict = () => {
    const errorsDict = {};
    Object.keys(errors).forEach((code) => {
        errorsDict[code] = {
            code: `TEXT.${code}`,
            error: errors[code],
        } 
    })

    return errorsDict;
}

export default createErrorsDict();
