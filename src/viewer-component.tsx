import React, { useRef, useState, ChangeEvent, useContext } from 'react';
import StageContext from './ngl-viewer/stage-context';
import ScreenshotAndDownload from './ngl-viewer/user-interface/screenshot-download';
import ViewerContext from './ngl-viewer/user-interface/viewer-context';
import ThemeSwitcher from './ngl-viewer/user-interface/theme-change';
import CenterStructure from './ngl-viewer/user-interface/center-structure';
import SetCameraType from './ngl-viewer/user-interface/view-perspective';
import ToggleRockSpinOrOff from './ngl-viewer/user-interface/toggle-rock-spin';
import Select from 'react-select';
import './viewer.css';
const ViewerComponent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [pdb, setPdb] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const defaultViewSettings = [{ type: 'cartoon', params: {} }];
  const viewerContext = useContext(ViewerContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { stage } = useContext(StageContext);

  type OptionT = {
    label : React.ReactNode, value : string
  }
  type ViewSelectP<T extends OptionT[]> = {
    onClick : (e: T[number]["value"]) => void
    options : T
    defaultValue : OptionT
  }
  const ViewSelect = <T extends OptionT[]>({ onClick, options, defaultValue } : ViewSelectP<T>) => {
    const onChange = React.useCallback((option : OptionT | null) => {
      if (option === null) return
      onClick(option.value)
    }, [onClick])
    return(
      <Select
        options = {options}
        onChange={onChange}
        defaultValue = {defaultValue}
      />
    )
  }

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      viewerContext.addComponent({
        type: 'file',
        props: {
          file: file,
          viewSettings: defaultViewSettings,
        },
        config: { fileName: file.name },
      });
    }
  };

  return (
    <div className={`viewer ${theme}-theme`}>
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand">CaliciNGL</div>
          {/* <button
            className="navbar-toggler"
            aria-label="Toggle navigation"
            onClick={() => setVisible(!visible)}
          >
            Toggle
          </button> */}
            <div className="navbar-collapse">
              <ul className="navbar-nav">
                <li>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <button onClick={() => fileInputRef.current?.click()}>Open</button>
                </li>
                <li>
                  <ScreenshotAndDownload render={(props: any) => <button {...props}>Screenshot</button>} props={{}} />
                </li>
                <li>
                  <ThemeSwitcher
                    render={(props) => (
                      <button onClick={props.onClick}>
                        {props.currentTheme === "light" ? "Light" : "Dark"}
                      </button>
                    )}
                    props={{}}
                  />
                </li>
                <li>
                  <ToggleRockSpinOrOff 
                    initialState="spin"
                    render={(props) => (<button {...props}>toggle spin</button>)}
                    props={{}}
                  />
                </li>
                <li>
                  <ToggleRockSpinOrOff 
                    initialState="rock"
                    render={(props) => (<button {...props}>toggle rock</button>)}
                    props={{}}
                  />
                </li>
                <li>
                  <SetCameraType
                    render={ViewSelect}
                    props = {{
                      options : [{
                        label : "Perspective",
                        value : "perspective" as 'perspective'
                      }, {
                        label : "Orthographic",
                        value : "orthographic" as 'orthographic'
                      }, {
                        label : "Stereo",
                        value : "stereo" as 'stereo'
                      }], 
                      defaultValue : {
                        label : "Perspective",
                        value : "perspective"
                      },
                    }}
                  />
                </li>
                <li>
                  <CenterStructure 
                    render={(props) => (
                      <button {...props}>Center Structure</button>
                    )}
                    props={{}}
                  />
                </li>
                <li>
                  <button onClick={() => console.log(viewerContext)}>asd</button>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerComponent;
