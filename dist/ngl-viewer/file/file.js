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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import useComponent from "../shapes/base-shape";
var NGLFile = function (_a) {
    var file = _a.file, viewSettings = _a.viewSettings, fileSettings = _a.fileSettings, chains = _a.chains, autoViewTimeout = _a.autoViewTimeout;
    var chainSele = React.useMemo(function () {
        if (chains === undefined)
            return null;
        else
            return chains.map(function (chain) { return ":".concat(chain); }).join(" or ");
    }, [chains]);
    var fileExt = React.useMemo(function () {
        if (fileSettings === null || fileSettings === void 0 ? void 0 : fileSettings.ext)
            return fileSettings.ext;
        else if (file instanceof File)
            return file.name.split(".").slice(-1)[0];
        else {
            console.warn("No ext given and file prop is not a file. Using empty");
            return "";
        }
    }, [fileSettings, file]);
    var fileComponentCreator = React.useCallback(function (stage) {
        return stage
            .loadFile(file, __assign({ ext: fileExt }, fileSettings))
            .then(function (comp) {
            if (!comp)
                return null;
            return comp;
        });
    }, [fileExt, fileSettings, file]);
    var selectedViewSettings = React.useMemo(function () {
        if (chainSele !== null)
            return viewSettings.map(function (viewSetting) { return (__assign(__assign({}, viewSetting), { params: __assign({ sele: chainSele }, viewSetting.params) })); });
        else
            return viewSettings;
    }, [chainSele, viewSettings]);
    useComponent(fileComponentCreator, selectedViewSettings, autoViewTimeout);
    return _jsx(_Fragment, {});
};
export default NGLFile;
