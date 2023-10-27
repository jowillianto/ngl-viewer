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
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext } from "react";
import StageContext from "../stage-context";
var SetCameraType = function (_a) {
    var render = _a.render, type = _a.type;
    var stage = useContext(StageContext).stage;
    var _b = React.useState(type), cameraType = _b[0], setCameraType = _b[1];
    var updateCameraType = function (newCameraType) {
        setCameraType(newCameraType);
        stage === null || stage === void 0 ? void 0 : stage.setParameters({ cameraType: newCameraType });
    };
    var Component = render;
    var renderProps = {
        onClick: function () { return updateCameraType(cameraType); },
    };
    return _jsx(Component, __assign({}, renderProps));
};
export default SetCameraType;
