export function formatData(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.round((time - minutes * 60) || 0);

    return `${minutes < 60 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
