export function setVacineData(data) {
    return {
        type: '@vacine/SET_VACINE_DATA',
        payload: { data },
    };
}

export function saveCPF(cpf) {
    return {
        type: '@vacine/SAVE_CPF',
        payload: { cpf },
    };
}