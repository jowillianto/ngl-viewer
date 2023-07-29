export type OnChangeT<U> = (value: U) => void;
export type FormP<T> = {
    onChange: OnChangeT<T>;
    value: T;
    readOnly: boolean;
};
