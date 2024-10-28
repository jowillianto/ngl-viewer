import React from "react";
import * as NGL from "ngl";
import { StageLoadFileParams } from "ngl/dist/declarations/stage/stage";
import { ViewSettings } from "../interfaces/interfaces";
import useComponent from "../shapes/base-shape";

export type NGLFileProps = {
  file: File | string | Blob;
  viewSettings: ViewSettings;
  fileSettings?: Partial<StageLoadFileParams>;
  chains?: string[];
};

const NGLFile: React.FC<NGLFileProps> = ({
  file,
  viewSettings,
  fileSettings, 
  chains
}) => {
  const chainSele = React.useMemo(() => {
    if (chains === undefined)
      return null
    else
      return chains.map((chain) => `:${chain}`).join(" or ")
  }, [ chains ])
  const fileExt = React.useMemo(() => {
    if (fileSettings?.ext) return fileSettings.ext;
    else if (file instanceof File) return file.name.split(".").slice(-1)[0];
    else {
      console.warn("No ext given and file prop is not a file. Using empty");
      return "";
    }
  }, [fileSettings, file]);
  const fileComponentCreator = React.useCallback((stage : NGL.Stage) => {
    return stage.loadFile(file, { ext: fileExt, ...fileSettings }).then((comp) => {
      if (!comp) return null
      return comp
    });
  }, [ fileExt, fileSettings, file ])
  const selectedViewSettings = React.useMemo(() => {
    if (chainSele !== null)
      return viewSettings.map((viewSetting) => ({
        ...viewSetting, params : {
          sele : chainSele, ...viewSetting.params
        }
      }))
    else
      return viewSettings
  }, [ chainSele, viewSettings ])
  console.log(new NGL.Selection(chainSele || ""))
  const component = useComponent(fileComponentCreator, selectedViewSettings)
  return (<></>)
};

export default NGLFile;
