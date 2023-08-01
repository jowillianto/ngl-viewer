type ViewSetting<T, P> = {
    type: T;
    params: P;
};
export type ViewSettings = Array<ViewSetting<string, Record<string, number>>>;
export {};
