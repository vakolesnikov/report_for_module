import { generateRequestParam, generateRequestParams } from '../helpers';

const baseUrl = '/api';
const participantsUrl = '/webapi/v1/participants';

export function getParticipants(name = '') {
    const requestParams = name ? generateRequestParam('name', name) : '';

    return fetch(`${baseUrl}${participantsUrl}${requestParams}`).then(res => res.json());
}

export function getAccountsOfParticipants(participantId) {
    return fetch(`${baseUrl}${participantsUrl}/${participantId}/accounts`).then(res => res.json());
}

export function getHistoryOperations(participantId, accountId, params = {}) {
    const requestParams = generateRequestParams(params);

    return fetch(
        `${baseUrl}${participantsUrl}/${participantId}/accounts/${accountId}/history${requestParams}&limit=100`
    ).then(res => res.json());
}
