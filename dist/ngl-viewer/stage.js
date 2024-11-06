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
function abs(v) {
    return v > 0 ? v : -v;
}
function absColor(color) {
    return new NGL.Color(abs(color.r), abs(color.g), abs(color.b));
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
var stageZoom = 0.75;
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
        if (stage === null || miniStage === null)
            return;
        /**
         * rotate the ministage based on the larger stage
         */
        miniStage.viewerControls.rotate(stage.viewerControls.rotation);
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
    /**
     * This attaches a signal handler to the stage so that updates to the stage will be reflected on
     * the miniStage
     */
    React.useEffect(function () {
        // This thing is in JS
        if (stage === null || !showAxes)
            return;
        stage.viewerControls.signals.changed.add(updateMiniStageCamera);
        return function () {
            stage.viewerControls.signals.changed.remove(updateMiniStageCamera);
        };
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
        if (curDiv === null || !showAxes)
            return;
        var stage = new NGL.Stage(curDiv, {
            backgroundColor: viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.backgroundColor,
        });
        setMiniStage(stage);
        stage.viewerControls.center([0, 0, 0]);
        stage.viewerControls.zoom(stageZoom);
        return function () {
            setMiniStage(null);
            stage.dispose();
            curDiv.replaceChildren();
        };
    }, [viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.backgroundColor, showAxes]);
    // console.log(miniStage === null ? "Lol" : miniStage.viewer.renderer.getClearColor())
    React.useEffect(function () {
        if (miniStage === null)
            return;
        var bgColor = miniStage.viewer.renderer.getClearColor(new NGL.Color(0, 0, 0));
        // This inverts the background color, will not work if the background color is 128, 128, 128
        /**
         * Follows the following formula for inversion :
         * invert = 1 - original_color
         * To handle the 0.5 no effect problem :
         * invert = 1 - original_color + ||original_color - 0.5| - 0.5|
         */
        var invertBgColor = bgColor
            .clone()
            .multiplyScalar(-1)
            .addScalar(1)
            .add(absColor(absColor(bgColor.clone().sub(new NGL.Color(0.5, 0.5, 0.5))).sub(new NGL.Color(0.5, 0.5, 0.5))));
        /*
            Creates the axes.
          */
        var shape = new NGL.Shape(undefined, {})
            .addArrow([0, 0, 0], [5, 0, 0], hexToRgb(colorX) || [255, 0, 0], 0.5, "X")
            .addArrow([0, 0, 0], [0, 5, 0], hexToRgb(colorY) || [0, 255, 0], 0.5, "Y")
            .addArrow([0, 0, 0], [0, 0, 5], hexToRgb(colorZ) || [0, 0, 255], 0.5, "Z")
            .addText([5, 0, 0], invertBgColor.clone(), 4, "X")
            .addText([0, 5, 0], invertBgColor.clone(), 4, "Y")
            .addText([0, 0, 5], invertBgColor.clone(), 4, "Z");
        var component = miniStage.addComponentFromObject(shape);
        component === null || component === void 0 ? void 0 : component.addRepresentation("buffer", { opacity: 1 });
    }, [miniStage, colorX, colorY, colorZ]);
    return (_jsxs("div", { style: containerStyles, className: containerClassName, children: [_jsx("div", { ref: ref, style: __assign(__assign({}, stageStyle), stageStyles), className: stageClassName }), _jsx("div", { ref: miniStageRef, style: __assign(__assign({}, miniStageStyle), axesStyles), className: axesClassName })] }));
}
