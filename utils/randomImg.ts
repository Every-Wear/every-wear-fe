export const getRandomNumImg = (path?: string): string => {
    const ranNum = Math.floor(Math.random() * 4) + 1;
    if (path) {
        return `${path}${ranNum}`
    }
    return `${ranNum}`
}