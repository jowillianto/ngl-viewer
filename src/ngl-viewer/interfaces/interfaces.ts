type ViewSetting = {
  type    : string,
  params: { [key: string]: number }; 
}

export type ViewSettings = Array<ViewSetting>