export const sleep = async (time: number = 1e3) => new Promise<void>(resolve => (
    setTimeout(() => resolve(void 0), time)
));
