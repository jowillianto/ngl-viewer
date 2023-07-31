type ViewSetting<T, P> = {
  type    : T
  params : P
}

export type ViewSettings = Array<ViewSetting<string, Record<string, number>>>

type Molecular_BallPlusStickT = ViewSetting<'ball+stick',{
  aspectRatio : number,
  radiusSegments : number, 
  sphereDetail: number
}>

// type Molecular_BackboneT = ViewSetting<'backbone',{
//   aspectRatio : number,
//   radiusSegments : number, 
//   sphereDetail: number
// }>

// type Molecular_BaseT = ViewSetting<'base', {
//   aspectRatio : number,
//   radiusSegments : number, 
//   sphereDetail: number
// }>

type Molecular_CartoonT = ViewSetting<'cartoon', {
  aspectRatio : number
}>

type Molecular_RibbonT = ViewSetting<'ribbon', {}>
type Molecular_LicoriceT = ViewSetting<"licorice", {}>
type Molecular_SurfaceT = ViewSetting<'surface', {}>