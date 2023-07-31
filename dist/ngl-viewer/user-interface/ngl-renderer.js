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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ComponentSwitch from './component-switch';
import NGLStage from '../stage';
var NGLRenderer = function (_a) {
    var components = _a.components, stageProps = __rest(_a, ["components"]);
    var filteredComponents = React.useMemo(function () {
        return components
            .filter(function (entry) { return "props" in entry; })
            .map(function (entry, id) {
            var props = {
                type: entry.type, key: id, props: entry.props
            };
            return _jsx(ComponentSwitch, __assign({}, props));
        });
    }, [components]);
    return (_jsx(NGLStage, __assign({}, stageProps, { children: filteredComponents })));
};
export default NGLRenderer;
