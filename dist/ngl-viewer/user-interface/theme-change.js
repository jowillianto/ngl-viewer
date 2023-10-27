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
import { useContext, useState } from "react";
import StageContext from "../stage-context";
var ThemeSwitcher = function (_a) {
    var render = _a.render;
    var _b = useState('dark'), currentTheme = _b[0], setCurrentTheme = _b[1];
    var stage = useContext(StageContext).stage;
    var toggleTheme = function () {
        var newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        newTheme === 'light' ? stage === null || stage === void 0 ? void 0 : stage.setParameters({ backgroundColor: 'white' }) : stage === null || stage === void 0 ? void 0 : stage.setParameters({ backgroundColor: 'black' });
    };
    var Component = render;
    var renderProps = {
        onClick: toggleTheme,
        currentTheme: currentTheme,
    };
    return _jsx(Component, __assign({}, renderProps));
};
export default ThemeSwitcher;
