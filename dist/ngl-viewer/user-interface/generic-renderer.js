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
import ViewerContext from "./viewer-context";
var GenericRenderer = function (_a) {
    var render = _a.render, props = _a.props;
    var components = React.useContext(ViewerContext).components;
    var renderProps = __assign({ components: components }, props);
    var Component = render;
    return _jsx(Component, __assign({}, renderProps));
};
export default GenericRenderer;
