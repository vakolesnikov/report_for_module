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

export function getFormattedDate(date, separator = '-') {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const newMonth = month > 9 ? month : `0${month}`;
    const newDay = day > 9 ? day : `0${day}`;

    return `${year}${separator}${newMonth}${separator}${newDay}`;
}

export function getFormattedDateTime(date) {
    const reverseDate = getFormattedDate(date, '.')
        .split('.')
        .reverse()
        .join('.');

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const newHours = String(hours).length > 1 ? hours : `0${hours}`;
    const newMinutes = String(minutes).length > 1 ? minutes : `0${minutes}`;

    return `${reverseDate} ${newHours}:${newMinutes}`;
}
