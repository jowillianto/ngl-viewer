var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import * as NGL from "ngl";
import StageContext, { VersionedStage } from "./stage-context";
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ]
        : null;
}
var miniStageStyle = {
    height: "100px",
    width: "100px",
    position: "absolute",
    left: 0,
    bottom: 0,
    pointerEvents: "none",
};
var stageStyle = {
    width: "100%",
    height: "100%",
};
export default function Stage(_a) {
    var viewSettings = _a.viewSettings, _b = _a.showAxes, showAxes = _b === void 0 ? true : _b, _c = _a.axesConfig, axesConfig = _c === void 0 ? {} : _c, _d = _a.containerClassName, containerClassName = _d === void 0 ? "" : _d, containerStyles = _a.containerStyles, _e = _a.axesClassName, axesClassName = _e === void 0 ? "" : _e, axesStyles = _a.axesStyles, _f = _a.stageClassName, stageClassName = _f === void 0 ? "" : _f, stageStyles = _a.stageStyles;
    var _g = React.useState(null), miniStage = _g[0], setMiniStage = _g[1];
    var _h = React.useContext(StageContext), versionedStage = _h.stage, setStage = _h.setStage;
    var ref = React.useRef(null);
    var miniStageRef = React.useRef(null);
    var _j = axesConfig.colorX, colorX = _j === void 0 ? "#FF0000" : _j, _k = axesConfig.colorY, colorY = _k === void 0 ? "#00FF00" : _k, _l = axesConfig.colorZ, colorZ = _l === void 0 ? "#0000FF" : _l;
    var stage = React.useMemo(function () {
        if (versionedStage === null)
            return null;
        return versionedStage.stage;
    }, [versionedStage]);
    var updateMiniStageCamera = React.useCallback(function () {
        if (stage && miniStage) {
            miniStage.viewerControls.rotate(stage.viewerControls.rotation);
        }
    }, [stage, miniStage]);
    React.useEffect(function () {
        var curDiv = ref.current;
        if (curDiv === null)
            return;
        var stage = new NGL.Stage(curDiv, viewSettings);
        setStage(new VersionedStage(stage, 0));
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
    // Subscribe to stage changes
    React.useEffect(function () {
        // This thing is in JS
        if (showAxes) {
            stage === null || stage === void 0 ? void 0 : stage.viewerControls.signals.changed.add(updateMiniStageCamera);
            return function () {
                stage === null || stage === void 0 ? void 0 : stage.viewerControls.signals.changed.remove(updateMiniStageCamera);
            };
        }
    }, [stage, updateMiniStageCamera, showAxes]);
    React.useEffect(function () {
        if (stage === null || ref.current === null)
            return;
        var observer = new ResizeObserver(function () { return stage.handleResize(); });
        observer.observe(ref.current);
        return function () { return observer.disconnect(); };
    }, [stage]);
    React.useEffect(function () {
        var curDiv = miniStageRef.current;
        if (curDiv === null)
            return;
        if (showAxes) {
            var stage_1 = new NGL.Stage(curDiv, {
                backgroundColor: viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.backgroundColor,
            });
            setMiniStage(stage_1);
            return function () {
                setMiniStage(null);
                function disposeFunc() {
                    if (stage_1.compList.length !== 0)
                        setTimeout(disposeFunc, 50);
                    else
                        stage_1.dispose();
                }
                disposeFunc();
                curDiv.replaceChildren();
            };
        }
    }, [viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.backgroundColor, showAxes]);
    React.useEffect(function () {
        if (miniStage !== null) {
            var shape = new NGL.Shape(undefined, {})
                .addArrow([0, 0, 0], [5, 0, 0], hexToRgb(colorX) || [255, 0, 0], 0.5, "X")
                .addArrow([0, 0, 0], [0, 5, 0], hexToRgb(colorY) || [0, 255, 0], 0.5, "Y")
                .addArrow([0, 0, 0], [0, 0, 5], hexToRgb(colorZ) || [0, 0, 255], 0.5, "Z");
            var component = miniStage.addComponentFromObject(shape);
            component === null || component === void 0 ? void 0 : component.addRepresentation("buffer", { opacity: 1 });
            miniStage.viewerControls.center([0, 0, 0]);
            miniStage.viewerControls.zoom(0.8);
        }
    }, [miniStage, colorX, colorY, colorZ]);
    return (_jsxs("div", { style: containerStyles, className: containerClassName, children: [_jsx("div", { ref: ref, style: __assign(__assign({}, stageStyle), stageStyles), className: stageClassName }), _jsx("div", { ref: miniStageRef, style: __assign(__assign({}, miniStageStyle), axesStyles), className: axesClassName })] })
    // <div ref={ref} {...props} style = {{
    //   position: "relative",
    //   border: "2px red solid",
    //   ...props.style
    // }}>
    //   <div ref = {miniStageRef} style = {{
    //     position : "absolute",
    //     left: 0,
    //     bottom: 0,
    //     height: "100px",
    //     width: "100px",
    //     border: "1px red solid",
    //     zIndex: 9999
    //   }}>
    //   </div>
    //   {children}
    // </div>
    );
}
