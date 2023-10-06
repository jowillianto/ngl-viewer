import React, { useRef, useState, ChangeEvent, useContext } from 'react';
import StageContext from './ngl-viewer/stage-context';
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
import 'bootstrap/dist/css/bootstrap.css';
import ViewerContext from './ngl-viewer/user-interface/viewer-context';

const ViewerComponent: React.FC = () => {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [visible, setVisible] = useState(false);
  const [pdb, setPdb] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const defaultViewSettings = [{ type: 'cartoon', params: {} }];
  const viewerContext = useContext(ViewerContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { stage } = useContext(StageContext);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      viewerContext.addComponent({
        type: "file",
        props: {
          file: file,
          viewSettings: defaultViewSettings
        },
        config: {fileName: file.name}
      });
    }
  };

  return (
    <div className={`viewer ${theme}-theme`}>

      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="#">CaliciNGL</CNavbarBrand>
          <CNavbarToggler aria-label="Toggle navigation" aria-expanded={visible} onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <input type="file" ref={fileInputRef} onChange={handleFileSelect} style={{ display: "none" }} />

              <CNavItem>
                <CDropdown variant="nav-item">
                  <CDropdownToggle color="secondary">File</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem component="button" onClick={() => fileInputRef.current?.click()}>Open</CDropdownItem>
                    {/* <CDropdownItem>
                      <input type="text" placeholder="PDB" value={pdb} onChange={(e) => setPdb(e.target.value)} />
                    </CDropdownItem> */}
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
                    <CDropdownItem component="button" onClick={() => {
                      setTheme('light'); stage?.setParameters({ backgroundColor: 'white' })
                    }}>Light Theme</CDropdownItem>
                    <CDropdownItem component="button" onClick={() => {
                      setTheme('light'); stage?.setParameters({ backgroundColor: 'black' })
                    }}>Dark Theme</CDropdownItem>
                    <CDropdownItem component="button" onClick={() => {
                      if (viewerContext.node.current) stage?.toggleFullscreen(viewerContext.node.current)
                    }}>FullScreen</CDropdownItem>
                    <CDropdownItem component="button" onClick={() => {stage?.toggleSpin()}}>Toggle Spin</CDropdownItem>
                    <CDropdownItem component="button" onClick={() => {stage?.toggleRock()}}>Toggle Rock</CDropdownItem>
                    <CDropdownItem component="button"
                      onClick={
                        () => {
                          stage?.setParameters({ cameraType: 'perspective' })
                        }
                      }
                    >
                      Perspective
                    </CDropdownItem>
                    <CDropdownItem component="button"
                      onClick={
                        () => {
                          stage?.setParameters({ cameraType: 'orthographic' })
                        }
                      }
                    >
                      Orthographic
                    </CDropdownItem>
                    <CDropdownItem component="button"
                      onClick={
                        () => {
                          stage?.setParameters({ cameraType: 'stereo' })
                        }
                      }
                    >
                      Stereo
                    </CDropdownItem>
                    <CDropdownItem component="button"
                      onClick={
                        () => {
                          stage?.autoView()
                        }
                      }
                    >
                      Center Structure
                    </CDropdownItem>
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
    </div>
  );
}

export default ViewerComponent;
