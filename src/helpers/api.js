export function generateRequestParam(name, value) {
    return `${name}=${encodeURIComponent(value)}&`;
}

export function generateRequestParams(params) {
    const reqParams = Object.keys(params).reduce(
        (acc, key) => `${acc}${generateRequestParam(key, params[key])}`,
        '?'
    );
    return reqParams.slice(0, reqParams.length - 1);
}
