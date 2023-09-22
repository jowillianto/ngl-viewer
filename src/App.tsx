import React, { useRef, ChangeEvent } from "react";
// App.tsx
import { ThemeContext } from './themeContext';
import "./index.css";
import NGLFile from "./ngl-viewer/file/file";
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer";
import ViewerSelector from "./ngl-viewer/user-interface/component-selector";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
import ViewerPanel from "./ngl-viewer/user-interface/viewer-panel";
import ScreenshotAndDownload from "./ngl-viewer/user-interface/screenshot-download";
import { StageContext } from "./ngl-viewer/stage";
import '@coreui/coreui/dist/css/coreui.min.css';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CButton,
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink
} from '@coreui/react';

const App = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const [visible, setVisible] = React.useState(false);
  const [pdb, setPdb] = React.useState(''); // State to store the PDB ID
  // Create a reference to the file input
  const fileInputRef = useRef<HTMLInputElement>(null); // Specify the type here

  // Handle the file selection
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
        console.log("File selected:", file.name);
        setSelectedFile(file);
      }
  };


    // Trigger the file input click when "Open" is clicked
    const handleOpenClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

  // Create a reference for ViewerStage
  const viewerStageRef = useRef<HTMLDivElement>(null);

  
  // State to track the current theme (defaulted to light)
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  // Set theme to light
  const activateLightTheme = () => {
    setTheme('light');
    
  };

  // Set theme to dark
  const activateDarkTheme = () => {
    setTheme('dark');
  };
  const defaultViewSettings = [
    { type: 'cartoon', params: {} },
    // ... add more representations as needed
];
  return ( 
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <ProteinViewer>
          <div className='container1'>
            <div 
                className='viewer ${theme}-theme' 
                ref={viewerStageRef} 
                style={{ backgroundColor: theme === 'light' ? 'white' : 'black' }} // Setting background color based on theme
                
              >
              <ViewerStage height="80vh" width="80vw"
                  viewSettings={{ backgroundColor: theme === 'light' ? 'white' : 'black' }}
              >
                <NGLFile file={selectedFile} viewSettings={defaultViewSettings}>
                      {/* Other children components, if any */}
                </NGLFile>
                <CNavbar expand="lg" colorScheme="light" className="bg-light">
                  <CContainer fluid>
                    <CNavbarBrand href="#">CaliciNGL</CNavbarBrand>
                    <CNavbarToggler
                      aria-label="Toggle navigation"
                      aria-expanded={visible}
                      onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse" visible={visible}>
                      <CNavbarNav>
                        {/* Hidden file input */}
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileSelect} 
                            style={{display: "none"}} 
                          />

                        {/* File Dropdown */}
                        <CNavItem>
                          <CDropdown variant="nav-item">
                            <CDropdownToggle color="secondary">File</CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem component="button" onClick={handleOpenClick}>Open</CDropdownItem>
                              <CDropdownItem>
                                <input 
                                  type="text" 
                                  placeholder="PDB" 
                                  value={pdb}
                                  onChange={(e) => setPdb(e.target.value)}
                                />
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </CNavItem>

                        {/* Screenshot Button */}
                        <CNavItem>
                          <ScreenshotAndDownload 
                            render={(props: any) => 
                              <CNavLink className="clickable" {...props}>
                                Screenshot
                              </CNavLink>
                            }
                            props={{}}
                          />
                        </CNavItem>

                        {/* View Dropdown */}
                        <CNavItem>
                          <CDropdown variant="nav-item">
                            <CDropdownToggle color="secondary">View</CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem component="button" onClick={activateLightTheme}>Light Theme</CDropdownItem>
                              <CDropdownItem component="button" onClick={activateDarkTheme}>Dark Theme</CDropdownItem>
                              <StageContext.Consumer>
                              {(context) => (
                                <>
                                   <CDropdownItem component="button" onClick={context.toggleFullScreen}>FullScreen</CDropdownItem>
                                   <CDropdownItem component="button" onClick={context.toggleSpin}>Toggle Spin</CDropdownItem>
                                   <CDropdownItem component="button" onClick={context.toggleRock}>Toggle Rock</CDropdownItem>
                                   <CDropdownItem component="button" onClick={context.setPerspective}>Perspective</CDropdownItem>
                                   <CDropdownItem component="button" onClick={context.setOrthographic}>Orthographic</CDropdownItem>
                                   <CDropdownItem component="button" onClick={context.setStereo}>Stereo</CDropdownItem>
                                   <CDropdownItem component="button" onClick={context.centerStructure}>Center</CDropdownItem>

                                </>
                              )}
                            </StageContext.Consumer>
                            </CDropdownMenu>
                          </CDropdown>
                        </CNavItem>

                        {/* Help Button */}
                        <CNavItem>
                          <CNavLink href="#">Help</CNavLink>
                        </CNavItem>

                      </CNavbarNav>
                    </CCollapse>
                  </CContainer>
                </CNavbar>
              </ViewerStage>
            </div>
            <div className='selector'>
              <ViewerSelector/>
              <ViewerPanel />
            </div>
          </div>
        </ProteinViewer>
    </ThemeContext.Provider>
  )
}

export default App;
