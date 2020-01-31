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

export function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const newMonth = month > 9 ? month : `0${month}`;
    const newDay = day > 9 ? day : `0${day}`;

    return `${year}-${newMonth}-${newDay}`;
}
