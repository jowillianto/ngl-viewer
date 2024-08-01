import React, { useContext, useEffect, useState } from "react";
import * as NGL from "ngl";
import StageContext from "../stage-context";
import { StageLoadFileParams } from "ngl/dist/declarations/stage/stage";
import { ViewSettings } from "../interfaces/interfaces";
import StructureComponentContext from "../context/component-context";

export type NGLFileProps = React.PropsWithChildren & {
  file: File | string | Blob | null;
  viewSettings: ViewSettings;
  fileSettings?: Partial<StageLoadFileParams>;
  chains?: string[];
};

const NGLFile: React.FC<NGLFileProps> = ({
  file,
  viewSettings,
  fileSettings,
  chains,
  children,
}) => {
  const { stage, updateVersion } = useContext(StageContext);
  const [component, setComponent] = useState<NGL.StructureComponent | null>(
    null
  );
  const removeComponent = React.useCallback(() => {
    setComponent((prevComponent) => {
      if (prevComponent === null) return null;
      else if (stage === null) return null;
      stage.removeComponent(prevComponent);
      return null
    })
  }, [ stage ]);
  const fileExt = React.useMemo(() => {
    if (fileSettings?.ext) return fileSettings.ext;
    else if (file instanceof File) return file.name.split(".").slice(-1)[0];
    else {
      console.warn("No ext given and file prop is not a file. Using empty");
      return "";
    }
  }, [fileSettings, file]);
  const loadFile = React.useCallback(() => {
    if (stage === null) return;
    else if (file === null) return;
    removeComponent();
    stage.loadFile(file, { ext: fileExt, ...fileSettings }).then((comp) => {
      if (!comp) return;
      viewSettings.forEach((viewSetting) => {
        comp.addRepresentation(viewSetting.type, viewSetting.params);
      });
      setComponent(comp as NGL.StructureComponent);
      stage.autoView();
      updateVersion();
    });
  }, [
    stage,
    file,
    viewSettings,
    fileSettings,
    fileExt,
    removeComponent,
    updateVersion,
  ]);

  useEffect(() => {
    loadFile();
    return () => removeComponent();
  }, [ loadFile, removeComponent, stage]);

  return (
    <StructureComponentContext.Provider value={{ component }}>
      <div className="file-controls">{children}</div>
    </StructureComponentContext.Provider>
  );
};

export default NGLFile;
