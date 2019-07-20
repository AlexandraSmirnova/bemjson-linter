export const makeBranches = (source, callback) => {
    if (Array.isArray(source)) {
        source.forEach(callback);
    } else {
        callback(source);
    }
}