export const removeQuotes = (input: string) => {
    if (input.length >= 2 && input[0] === '"' && input[input.length - 1] === '"') {
        return input.slice(1, -1);
    }
    return input;
};

export const shortAddress = (str: string, strLength?: number) => {
    let max = strLength ?? 20

    if (str.length <= max) return str;

    const ellipsis = '...';
    const availableCharacters = max - ellipsis.length;

    if (availableCharacters < 1) {
        throw new Error('Max length is too short for ellipsis.');
    }

    const startLength = Math.ceil(availableCharacters / 2);
    const endLength = Math.floor(availableCharacters / 2);

    const start = str.substring(0, startLength);
    const end = str.substring(str.length - endLength);

    return start + ellipsis + end;
};