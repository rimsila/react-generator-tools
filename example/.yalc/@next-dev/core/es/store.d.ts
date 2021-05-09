declare const storeWithExp: {
    set: (key: string, val: any, exp?: number) => void;
    get: (key: string) => any;
    remove: (key: string) => void;
    clear: () => void;
};
export default storeWithExp;
