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
import { useContext, useEffect, useState } from 'react';
import StageContext from '../stage-context';
import StructureComponentContext from '../context/component-context';
var NGLFile = function (_a) {
    var file = _a.file, viewSettings = _a.viewSettings, fileSettings = _a.fileSettings, controls = _a.controls, chains = _a.chains, children = _a.children;
    var stageContext = useContext(StageContext);
    var _b = useState({
        showRepr: true,
        component: null,
        update: false,
    }), state = _b[0], setState = _b[1];
    var loadFileToStage = function () {
        var stage = stageContext.stage;
        if (stage && file && !state.update) {
            var fileExtension = (fileSettings === null || fileSettings === void 0 ? void 0 : fileSettings.ext)
                ? fileSettings.ext
                : file instanceof File
                    ? file.name.split('.').pop()
                    : '';
            removeComponentIfExist();
            stage.loadFile(file, fileSettings)
                .then(function (component) {
                var comp = component;
                if (comp) {
                    viewSettings === null || viewSettings === void 0 ? void 0 : viewSettings.forEach(function (viewSetting) {
                        comp.addRepresentation(viewSetting.type, viewSetting.params);
                    });
                    stage.autoView();
                    setState(function (prev) { return (__assign(__assign({}, prev), { component: comp, update: true })); });
                    stageContext.updateVersion();
                }
            })
                .catch(function (err) {
                console.error(err);
            });
        }
    };
    var removeComponentIfExist = function () {
        var component = state.component;
        var stage = stageContext.stage;
        if (stage && component)
            stage.removeComponent(component);
    };
    useEffect(function () {
        loadFileToStage();
    }, [file, viewSettings, fileSettings, controls, chains, stageContext.version]);
    useEffect(function () {
        if (state.update) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { update: false })); });
        }
    }, [state.update]);
    useEffect(function () {
        loadFileToStage();
        return function () {
            removeComponentIfExist();
        };
    }, []);
    return (_jsx(StructureComponentContext.Provider, __assign({ value: state }, { children: _jsx("div", __assign({ className: "file-controls" }, { children: children })) })));
};
export default NGLFile;
