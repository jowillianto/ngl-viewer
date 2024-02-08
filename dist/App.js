import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./index.css";
import ProteinViewer from "./ngl-viewer/user-interface/protein-viewer";
import ViewerStage from "./ngl-viewer/user-interface/viewer-stage";
import ViewerPanel from "./ngl-viewer/user-interface/viewer-panel";
import ViewerComponent from "./viewer-component";
var App = function () {
    var exampleComponentUIData = {
        type: "box",
        props: {
            position: [1, 1, 1],
            color: [255, 255, 0],
            size: 1,
            heightAxis: [0, 1, 0],
            depthAxis: [1, 0, 0],
            viewSettings: [
                {
                    type: "buffer",
                    params: {
                        opacity: 1,
                    },
                }
            ],
        },
        config: {},
    };
    var initialComponents = [
        exampleComponentUIData
    ];
    return (_jsx(ProteinViewer, { children: _jsxs("div", { className: 'container1', children: [_jsx(ViewerComponent, {}), _jsxs("div", { className: 'selector', children: [_jsx(ViewerStage, { width: "70vw", height: "92vh" }), _jsx(ViewerPanel, {})] })] }) }));
};
export default App;
