export type CustomAPIProps<T, K> = {
    ctx: ContextSession;
    utils: FactoryUtils<T>;
    props: K;
};

export type CustomAPICallback<T, K> = (props: CustomAPIProps<T, K>) => T | Promise<T>;