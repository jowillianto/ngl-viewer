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
import React from "react";
import { StageContext } from "../stage";
var NGLScreenshot = function (_a) {
    var params = _a.params, render = _a.render, props = _a.props;
    var stage = React.useContext(StageContext).stage;
    var onClick = React.useCallback(function () {
        var image = stage === null || stage === void 0 ? void 0 : stage.makeImage(params);
        if (image === undefined)
            throw Error("Stage is undefined");
        return image;
    }, [stage, params]);
    var Component = render;
    var renderProps = __assign({ onClick: onClick }, props);
    return (_jsx(Component, __assign({}, renderProps)));
};
export default NGLScreenshot;
