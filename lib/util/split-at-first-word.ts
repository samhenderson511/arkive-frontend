function splitAtFirstWord(str: string) {
    const [firstWord, ...rest] = str.split(/\s+/);
    return [firstWord, rest.join(' ')];
}

export {splitAtFirstWord}