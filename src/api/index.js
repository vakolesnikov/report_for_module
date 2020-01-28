import { generateRequestParam, generateRequestParams } from '../helpers/api';

const baseUrl = 'http://167.71.63.9:8080';
const participantsUrl = '/webapi/v1/participants';

export function getParticipants(name = '') {
    const requestParams = name ? generateRequestParam('name', name) : '';

    return fetch(`${baseUrl}${participantsUrl}${requestParams}`)
        .then(res => res.json())
        .then(res => console.log(res));
}

export function getAccountsOfParticipants(participantId) {
    return fetch(`${baseUrl}${participantsUrl}/${participantId}/accounts`)
        .then(res => res.json())
        .then(res => console.log(res));
}

export function getHistoryOperations(participantId, accountId, params) {
    const requestParams = generateRequestParams(params);

    return fetch(
        `${baseUrl}${participantsUrl}/${participantId}/accounts/${accountId}/history${requestParams}`
    )
        .then(res => res.json())
        .then(res => console.log(res));
}
