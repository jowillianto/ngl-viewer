import React from 'react';
type UploaderProps = {
    onFileRead: (fileContent: string) => void;
};
declare const FileUploader: React.FC<UploaderProps>;
export default FileUploader;
