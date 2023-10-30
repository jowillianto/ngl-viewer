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
import { useContext } from "react";
import StageContext from "../stage-context";
var SetCameraType = function (_a) {
    var render = _a.render;
    var stage = useContext(StageContext).stage;
    var updateCameraType = function (newCameraType) {
        stage === null || stage === void 0 ? void 0 : stage.setParameters({ cameraType: newCameraType });
    };
    var Component = render;
    var renderProps = {
        onClick: function (cameraType) { return updateCameraType(cameraType); },
    };
    return _jsx(Component, __assign({}, renderProps));
};
export default SetCameraType;
