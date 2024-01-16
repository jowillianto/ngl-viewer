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
import React, { useContext, useEffect, useState } from 'react';
import StageContext from '../stage-context';
import StructureComponentContext from '../context/component-context';
var NGLFile = function (_a) {
    var file = _a.file, viewSettings = _a.viewSettings, fileSettings = _a.fileSettings, chains = _a.chains, children = _a.children;
    var stage = useContext(StageContext).stage;
    var _b = useState(null), component = _b[0], setComponent = _b[1];
    var removeComponent = React.useCallback(function () {
        if (component === null)
            return;
        else if (stage === null)
            return;
        stage.removeComponent(component);
    }, [component, stage]);
    var fileExt = React.useMemo(function () {
        if (fileSettings === null || fileSettings === void 0 ? void 0 : fileSettings.ext)
            return fileSettings.ext;
        else if (file instanceof File)
            return file.name.split('.').slice(-1)[0];
        else {
            console.warn("No ext given and file prop is not a file. Using empty");
            return '';
        }
    }, [fileSettings, file]);
    var loadFile = React.useCallback(function () {
        if (stage === null)
            return;
        else if (file === null)
            return;
        removeComponent();
        stage.loadFile(file, __assign({ ext: fileExt }, fileSettings))
            .then(function (comp) {
            if (!comp)
                return;
            viewSettings.forEach(function (viewSetting) {
                comp.addRepresentation(viewSetting.type, viewSetting.params);
            });
            setComponent(comp);
            stage.autoView();
        });
    }, [stage, file, setComponent, viewSettings, fileSettings, fileExt]);
    useEffect(function () {
        loadFile();
    }, [
        file,
        stage,
        viewSettings,
        fileSettings,
        chains
    ]);
    useEffect(function () {
        loadFile();
        return function () { return removeComponent(); };
    }, []);
    return (_jsx(StructureComponentContext.Provider, __assign({ value: { component: component } }, { children: _jsx("div", __assign({ className: "file-controls" }, { children: children })) })));
};
export default NGLFile;
