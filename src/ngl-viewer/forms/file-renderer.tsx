import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import * as NGL from 'ngl';

interface PDBViewerProps {
  pdbData: string;
}

const PDBViewer: React.FC<PDBViewerProps> = ({ pdbData }) => {
  const stageRef = useRef<any>();

  useEffect(() => {
    if (!stageRef.current) {
      stageRef.current = new NGL.Stage('viewport');
    }

    // Clear any previous structures
    stageRef.current.removeAllComponents();

    // Load new PDB structure from uploaded data
    stageRef.current.loadFile(pdbData, { ext: 'pdb' }).then((component: any) => {
      component.addRepresentation('cartoon');
      stageRef.current.autoView();
    });

    // Cleanup on unmount
    return () => {
      stageRef.current.dispose();
      stageRef.current = null;
    };
  }, [pdbData]);

  return <div id="viewport" style={{ width: '600px', height: '400px' }} />;
};

type UploaderProps = {
  onFileRead: (fileContent: string) => void;
}

const FileUploader: React.FC<UploaderProps> = ({ onFileRead }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
      const content = (e.target?.result || '') as string;
      onFileRead(content);
    };

    reader.readAsText(file);
  };

  return <input type="file" onChange={handleFileChange} />;
};

export default FileUploader
