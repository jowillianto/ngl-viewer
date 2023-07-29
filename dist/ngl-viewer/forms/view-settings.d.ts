/// <reference types="react" />
import { ViewSettings } from "../interfaces/interfaces";
type ViewSettingsInputProps = {
    value: ViewSettings;
    onChange: (viewSettings: ViewSettings) => void;
};
declare const ViewSettingsInput: React.FC<ViewSettingsInputProps>;
export default ViewSettingsInput;
