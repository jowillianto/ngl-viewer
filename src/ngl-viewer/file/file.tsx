import React, { useContext, useEffect, useState } from 'react'
import * as NGL from 'ngl'
import StageContext from '../stage-context'
import { StageLoadFileParams } from 'ngl/dist/declarations/stage/stage'
import { ViewSettings } from '../interfaces/interfaces'
import StructureComponentContext from '../context/component-context'

export type NGLFileProps = React.PropsWithChildren & {
  file          : File | string | Blob | null,
  viewSettings  : ViewSettings,
  fileSettings? : Partial<StageLoadFileParams>
  controls?     : Object
  chains?        : string[]
}
export type  NGLFileState = {
  showRepr      : boolean,
  component     : NGL.StructureComponent | null,
  update        : boolean
}

const NGLFile: React.FC<NGLFileProps> = ({
  file, viewSettings, fileSettings, controls, chains, children
}) => {
  const stageContext = useContext(StageContext);
  const [state, setState] = useState<NGLFileState>({
    showRepr: true,
    component: null,
    update: false,
  });

  const loadFileToStage = () => {
    const stage = stageContext.stage
    if (stage && file && !state.update) {
      const fileExtension = fileSettings?.ext
        ? fileSettings.ext
        : file instanceof File
        ? file.name.split('.').pop()
        : '';
      removeComponentIfExist();
      stage.loadFile(file, fileSettings)
      .then((component: NGL.Component | void) => {
        const comp = component as NGL.StructureComponent;
        if (comp) {
          viewSettings?.forEach((viewSetting) => {
            comp.addRepresentation(
              viewSetting.type, viewSetting.params
            )
          })
          stage.autoView();
          setState((prev) => ({
            ...prev,
            component: comp,
            update: true,
          }));
          stageContext.updateVersion();
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
    }
  };

  const removeComponentIfExist = () => {
    const component = state.component;
    const stage = stageContext.stage;
    if (stage && component) stage.removeComponent(component);
  };

  useEffect(() => {
    loadFileToStage();
  }, [ file, viewSettings, fileSettings, controls, chains, stageContext.version ]);

  useEffect(() => {
    if (state.update) {
      setState(prevState => ({ ...prevState, update: false }));
    }
  }, [state.update]);

  useEffect(() => {
    loadFileToStage()
    return () => {
      removeComponentIfExist();
    };
  }, []);

  return (
    <StructureComponentContext.Provider value={state}>
      <div className="file-controls">{ children}</div>
    </StructureComponentContext.Provider>
  );
};

export default NGLFile;
