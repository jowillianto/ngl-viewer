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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
var ViewSettingsInput = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    var handleInputChange = function (e, index, param) {
        var _a;
        var newSettings = __spreadArray([], value, true);
        if (param === "zoom") {
            newSettings[index].params = { zoomLevel: Number(e.target.value) };
        }
        else {
            newSettings[index].params = __assign(__assign({}, newSettings[index].params), (_a = {}, _a[param] = Number(e.target.value), _a));
        }
        onChange(newSettings);
    };
    return (_jsx(_Fragment, { children: value.map(function (setting, index) { return (_jsxs("div", { children: [_jsxs("h4", { children: [setting.type, " Settings"] }), setting.params &&
                    Object.keys(setting.params).map(function (param) { return (_jsxs("div", { children: [_jsxs("label", { children: [param, ":"] }), _jsx("input", { type: "number", value: param in setting.params ? setting.params[param] : "", onChange: function (e) { return handleInputChange(e, index, param); } })] }, param)); })] }, index)); }) }));
};
export default ViewSettingsInput;
