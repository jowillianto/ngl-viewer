import React, { useRef, useState, ChangeEvent, useContext } from 'react';
import { StageContext } from "./ngl-viewer/stage";
import NGLFile from "./ngl-viewer/file/file";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
import ScreenshotAndDownload from "./ngl-viewer/user-interface/screenshot-download";
import {
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CNavbar,
    CContainer,
    CNavbarBrand,
    CNavbarToggler,
    CCollapse,
    CNavbarNav,
    CNavItem,
    CNavLink
} from '@coreui/react';
import ViewerContext from './ngl-viewer/user-interface/viewer-context';
import { NGLFileProps } from './ngl-viewer/file/file';

const ViewerComponent: React.FC = () => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [visible, setVisible] = useState(false);
  const [pdb, setPdb] = useState(''); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewerStageRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const defaultViewSettings = [{ type: 'cartoon', params: {} }];
  const viewerContext = useContext(ViewerContext);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
        viewerContext.addComponent({
            type: "file", 
            props: { 
                file: file,
                viewSettings: defaultViewSettings
            },
            config: {}
        });
    }
  };

  return (
        <div className={`viewer ${theme}-theme`} ref={viewerStageRef}>
            <ViewerStage height="80vh" width="80vw"
                viewSettings={{ backgroundColor: theme === 'light' ? 'white' : 'black' }}
            >
                {viewerContext.components.map((component, index) => {
                  if (component.type === "file") {
                      const fileProps = component.props as NGLFileProps; 
                      return <NGLFile key={index} {...fileProps} />
                  }
                  return null;
              })} 

                <CNavbar expand="lg" colorScheme="light" className="bg-light">
                  <CContainer fluid>
                    <CNavbarBrand href="#">CaliciNGL</CNavbarBrand>
                    <CNavbarToggler aria-label="Toggle navigation" aria-expanded={visible} onClick={() => setVisible(!visible)} />
                    <CCollapse className="navbar-collapse" visible={visible}>
                      <CNavbarNav>
                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{display: "none"}} />

                        <CNavItem>
                          <CDropdown variant="nav-item">
                            <CDropdownToggle color="secondary">File</CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem component="button" onClick={() => fileInputRef.current?.click()}>Open</CDropdownItem>
                              <CDropdownItem>
                                <input type="text" placeholder="PDB" value={pdb} onChange={(e) => setPdb(e.target.value)} />
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </CNavItem>

                        <CNavItem>
                          <ScreenshotAndDownload 
                            render={(props: any) => <CNavLink className="clickable" {...props}>Screenshot</CNavLink>}
                            props={{}}
                          />
                        </CNavItem>

                        <CNavItem>
                          <CDropdown variant="nav-item">
                            <CDropdownToggle color="secondary">View</CDropdownToggle>
                            <CDropdownMenu>
                              <StageContext.Consumer>
                                {(context) => (
                                  <>
                                  <CDropdownItem component="button" onClick={() => context.setTheme!('light')}>Light Theme</CDropdownItem>
                                  <CDropdownItem component="button" onClick={() => context.setTheme!('dark')}>Dark Theme</CDropdownItem>
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
    );
}

export default ViewerComponent;
