/// <reference types="react" />
interface FileViewerSelectorProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}
declare const FileViewerSelector: ({ value, onChange, options, }: FileViewerSelectorProps) => JSX.Element;
export default FileViewerSelector;
