/**
 * Функция для упрощения обработки полей, которые могут быть как объектами, так и массивами
 * @param  {array|object} source - поле, которое может быть как объектом так и массивом объектов
 * @param  {function} callback - функция для обработки объектов
 */
export const makeBranches = (source, callback) => {
    if (Array.isArray(source)) {
        source.forEach(callback);
    } else {
        callback(source);
    }
}