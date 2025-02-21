import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./index.css";
import React from "react";
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer";
import FileComponent from "./ngl-viewer/file/file";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
import NGLBox from "./ngl-viewer/shapes/box";
var containerStyles = {
    width: "100%",
    height: "100%",
};
var stageSettings = {
    backgroundColor: "white",
};
var App = function () {
    var _a = React.useState(true), toggle = _a[0], setToggle = _a[1];
    console.log(toggle);
    return (_jsxs(React.StrictMode, { children: [_jsx("button", { onClick: function () { return setToggle(!toggle); }, children: "Toggle" }), _jsx("div", { style: {
                    backgroundColor: "grey",
                    height: "".concat(window.innerHeight - 32, "px"),
                }, children: _jsxs(ProteinViewer, { children: [_jsx(ViewerStage, { containerStyles: containerStyles, viewSettings: stageSettings }), _jsx(FileComponent, { file: "https://files.rcsb.org/download/2ZLF.pdb", fileSettings: { ext: "pdb" }, viewSettings: [
                                {
                                    type: "ball+stick",
                                    params: {
                                        color: "element",
                                        radius: "0.1",
                                    },
                                },
                            ], chains: ["A"] }), toggle && (_jsx(NGLBox, { position: [1, 1, 1], color: [255, 255, 0], size: 10, heightAxis: [0, 10, 0], depthAxis: [10, 0, 0], viewSettings: [
                                {
                                    type: "buffer",
                                    params: {
                                        opacity: 0.5,
                                    },
                                },
                            ] }))] }) })] }));
};
export default App;
