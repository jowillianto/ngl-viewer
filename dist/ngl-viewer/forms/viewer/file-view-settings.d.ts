/// <reference types="react" />
import { ViewSettings } from "../../interfaces/interfaces";
import { FormP } from "../common";
export type FileViewSettingsP = FormP<ViewSettings[]> & {
    options: string[];
};
declare const FileViewSettings: ({ options, value, onChange }: FileViewSettingsP) => JSX.Element;
export default FileViewSettings;
