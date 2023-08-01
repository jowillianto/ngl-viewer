/// <reference types="react" />
import { ViewSettings } from "../../interfaces/interfaces";
type ViewSettingsInputProps = {
    value: ViewSettings;
    onChange: (viewSettings: ViewSettings) => void;
};
declare const ViewSettingsInput: ({ value, onChange, }: ViewSettingsInputProps) => JSX.Element;
export default ViewSettingsInput;
