/// <reference types="react" />
import { FormP } from "./common";
type FileUploaderP = FormP<File>;
declare const FileUploader: ({ value, onChange }: FileUploaderP) => JSX.Element;
export default FileUploader;
