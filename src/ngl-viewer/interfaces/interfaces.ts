import * as NGL from "ngl";
import { DotRepresentationParameters } from "ngl/dist/declarations/representation/dot-representation";
import { RepresentationParameters } from "ngl/dist/declarations/representation/representation";
import { SliceRepresentationParameters } from "ngl/dist/declarations/representation/slice-representation";
import { SurfaceRepresentationParameters } from "ngl/dist/declarations/representation/surface-representation";

interface StructureRepresentationParametersMap {
  angle: NGL.AngleRepresentationParameters;
  axes: NGL.AxesRepresentationParameters;
  backbone: NGL.BallAndStickRepresentationParameters;
  "ball+stick": NGL.BallAndStickRepresentationParameters;
  base: NGL.BallAndStickRepresentationParameters;
  cartoon: NGL.CartoonRepresentationParameters;
  contact: NGL.ContactRepresentationParameters;
  dihedral: NGL.DihedralRepresentationParameters;
  "dihedral-histogram": NGL.DihedralHistogramRepresentationParameters;
  distance: NGL.DistanceRepresentationParameters;
  dot: DotRepresentationParameters;
  helixorient: NGL.StructureRepresentationParameters;
  hyperball: NGL.HyperballRepresentationParameters;
  label: NGL.LabelRepresentationParameters;
  licorice: NGL.BallAndStickRepresentationParameters;
  line: NGL.LineRepresentationParameters;
  molecularsurface: NGL.MolecularSurfaceRepresentationParameters;
  point: NGL.PointRepresentationParameters;
  ribbon: NGL.RibbonRepresentationParameters;
  rocket: NGL.RocketRepresentationParameters;
  rope: NGL.CartoonRepresentationParameters;
  slice: SliceRepresentationParameters;
  spacefill: NGL.BallAndStickRepresentationParameters;
  surface: SurfaceRepresentationParameters;
  trace: NGL.TraceRepresentationParameters;
  tube: NGL.CartoonRepresentationParameters;
  unitcell: NGL.UnitcellRepresentationParameters;
  validation: NGL.StructureRepresentationParameters;
}

// export type ViewSettingType = NGL.StructureRepresentationType | string;
// export type ViewSettings = Array<
//   ViewSetting<ViewSettingType, Record<string, any>>
// >;
export type ShapeRepresentationParametersMap = {
  buffer: RepresentationParameters;
};

export type StructureViewSetting<
  K extends keyof StructureRepresentationParametersMap
> = {
  type: K;
  params: Partial<StructureRepresentationParametersMap[K]>;
};

export type StructureViewSettings = Array<
  StructureViewSetting<keyof StructureRepresentationParametersMap>
>;

export type ShapeViewSetting<K extends keyof ShapeRepresentationParametersMap> =
  {
    type: K;
    params: Partial<ShapeRepresentationParametersMap[K]>;
  };
export type ShapeViewSettings = Array<
  ShapeViewSetting<keyof ShapeRepresentationParametersMap>
>;

export type ViewSettings = ShapeViewSettings | StructureViewSettings