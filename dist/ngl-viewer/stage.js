import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import * as NGL from "ngl";
import StageContext from "./stage-context";
export default function Stage(_a) {
    var height = _a.height, width = _a.width, _b = _a.className, className = _b === void 0 ? "" : _b, viewSettings = _a.viewSettings, children = _a.children;
    var _c = React.useContext(StageContext), stage = _c.stage, setStage = _c.setStage;
    var ref = React.useRef(null);
    var containerStyle = React.useMemo(function () {
        if (height === undefined || width === undefined)
            return {};
        return { height: height, width: width };
    }, [height, width]);
    React.useEffect(function () {
        var curDiv = ref.current;
        if (curDiv === null)
            return;
        var stage = new NGL.Stage(curDiv, viewSettings);
        setStage(stage);
        return function () {
            setStage(null);
            function disposeFunc() {
                if (stage.compList.length !== 0)
                    setTimeout(disposeFunc, 50);
                else
                    stage.dispose();
            }
            disposeFunc();
            curDiv.replaceChildren();
        };
    }, [setStage, viewSettings]);
    React.useEffect(function () {
        if (stage === null || ref.current === null)
            return;
        var observer = new ResizeObserver(function () { return stage.handleResize(); });
        observer.observe(ref.current);
        return function () { return observer.disconnect(); };
    }, [stage]);
    return (_jsx("div", { className: "ngl-viewer-canvas ".concat(className), ref: ref, style: containerStyle, children: children }));
}
