import React, { useEffect, useRef } from "react";
import { NGLFileProps } from "ngl-viewer/file/file";
import * as NGL from "ngl";

const NGLFile: React.FC<NGLFileProps> = ({ file }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  let stage: any;

  useEffect(() => {
    if (file && viewerRef.current) {
      if (stage) {
        stage.removeAllComponents();
      } else {
        stage = new NGL.Stage(viewerRef.current);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const pdbData = e.target?.result;
        if (pdbData) {
          stage
            .loadFile({ ext: 'pdb', defaultRepresentation: true })
            .then(function (o: {
              addRepresentation: (arg0: string) => void;
              autoView: () => void;
            }) {
              o.addRepresentation("cartoon");
              o.autoView();
            });
            
        }
      };
      reader.readAsText(file);
    }

    return () => {
      if (stage) {
        stage.dispose();
      }
    };
  }, [file]);

  return <div ref={viewerRef}></div>;
};

export default NGLFile;
