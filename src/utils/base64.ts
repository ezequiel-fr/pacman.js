const hasProp = (obj: any, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop);

export const encode = (token: string) => {
    if (hasProp(globalThis, 'Buffer')) {
        return Buffer.from(token).toString('base64url');
    } else if (hasProp(globalThis, 'btoa')) {
        const encoder = new TextEncoder();
        const data = encoder.encode(token);
        // @ts-ignore
        return btoa(String.fromCharCode.apply(null, data));
    } else return token;
};

export const decode = (token: string) => {
    if (hasProp(globalThis, 'Buffer')) {
        return Buffer.from(token, 'base64url').toString();
    } else if (hasProp(globalThis, 'atob')) {
        const decoder = new TextDecoder();
        const data = atob(token);
        // @ts-ignore
        return decoder.decode(new Uint8Array([...data].map(char => char.charCodeAt(0))));
    } else return token;
};
