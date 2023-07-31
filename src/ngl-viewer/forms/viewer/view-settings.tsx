import { ViewSettings } from "../interfaces/interfaces";

type ViewSettingsInputProps = {
  value: ViewSettings;
  onChange: (viewSettings: ViewSettings) => void;
};

const ViewSettingsInput = ({
  value,
  onChange,
} : ViewSettingsInputProps) => {
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    param: string
  ) => {
    const newSettings = [...value];
    if (param === "zoom") {
      newSettings[index].params = { zoomLevel: Number(e.target.value) };
    } else {
      newSettings[index].params = {
        ...newSettings[index].params,
        [param]: Number(e.target.value),
      };
    }
    onChange(newSettings);
  };

  return (
    <>
      {value.map((setting, index) => (
        <div key={index}>
          <h4>{setting.type} Settings</h4>
          {setting.params &&
            Object.keys(setting.params).map((param) => (
              <div key={param}>
                <label>{param}:</label>
                <input
                  type="number"
                  value={param in setting.params ? setting.params[param] : ""}
                  onChange={(e) => handleInputChange(e, index, param)}
                />
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default ViewSettingsInput;
