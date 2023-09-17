export type ViewSetting<T, P> = {
    type: T;
    params: P;
};
export type ViewSettings = Array<ViewSetting<string, Record<string, number>>>;
type Molecular_BallPlusStickT = ViewSetting<'ball+stick', {
    aspectRatio: number;
    radiusSegments: number;
    sphereDetail: number;
}>;
type Molecular_CartoonT = ViewSetting<'cartoon', {
    aspectRatio: number;
}>;
type Molecular_RibbonT = ViewSetting<'ribbon', {}>;
type Molecular_LicoriceT = ViewSetting<'licorice', {}>;
type Molecular_SurfaceT = ViewSetting<'surface', {
    sele: string;
    opacity: string;
    colorScheme: number;
    colorDomain: [number, number];
    surfaceType: 'av';
}>;
export type ViewSettingTypes = {
    'ball+stick': Molecular_BallPlusStickT[];
    'cartoon': Molecular_CartoonT[];
    'ribbon': Molecular_RibbonT[];
    'licorice': Molecular_LicoriceT[];
    'surface': Molecular_SurfaceT[];
};
export {};
