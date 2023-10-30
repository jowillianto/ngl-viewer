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
var ToggleRockSpinOrOff = function (_a) {
    var render = _a.render, initialState = _a.initialState, props = _a.props;
    var _b = React.useState("off"), rock = _b[0], setRock = _b[1];
    var stage = useContext(StageContext).stage;
    var toggleRock = function () {
        var newRock = rock === initialState ? "off" : initialState;
        setRock(newRock);
        if (newRock === "rock") {
            stage === null || stage === void 0 ? void 0 : stage.toggleRock();
        }
        else if (newRock === "spin") {
            stage === null || stage === void 0 ? void 0 : stage.toggleSpin();
        }
        else if (newRock === "off" && initialState === "rock") {
            stage === null || stage === void 0 ? void 0 : stage.toggleRock();
        }
        else if (newRock === "off" && initialState === "spin") {
            stage === null || stage === void 0 ? void 0 : stage.toggleSpin();
        }
    };
    var Component = render;
    var renderProps = __assign({ onClick: toggleRock }, props);
    return _jsx(Component, __assign({}, renderProps));
};
export default ToggleRockSpinOrOff;
