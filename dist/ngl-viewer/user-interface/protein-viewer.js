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
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import { mockComponentsDataMap } from "./component-data";
import ViewerContext from "./viewer-context";
import StageContext from "../stage-context";
var ProteinViewer = function (props) {
    var _a = props.initialComponents, initialComponents = _a === void 0 ? [] : _a, children = props.children;
    var _b = useState(null), stage = _b[0], setStage = _b[1];
    var _c = useState(0), version = _c[0], setVersion = _c[1];
    var _d = React.useState(props.components ? props.components : initialComponents), internalComp = _d[0], setInternalComp = _d[1];
    var nodeRef = React.createRef();
    var components = React.useMemo(function () {
        return props.components ? props.components : internalComp;
    }, [props.components, internalComp]);
    var setComponents = React.useCallback(function (comp) {
        setInternalComp(function (components) {
            var newComponents = comp(components);
            if (props.onComponentsChange)
                props.onComponentsChange(newComponents);
            return newComponents;
        });
    }, [props.onComponentsChange, setInternalComp]);
    var addComponent = React.useCallback(function (component) {
        setComponents(function (components) { return __spreadArray(__spreadArray([], components, true), [component], false); });
    }, [setComponents]);
    var addComponentByType = React.useCallback(function (type) {
        if (!(type in mockComponentsDataMap))
            throw Error(type + " is invalid");
        var newComponent = {
            type: type,
            props: mockComponentsDataMap[type].props,
            config: {}
        };
        addComponent(newComponent); //TODO: Fix this
    }, [addComponent]);
    var removeComponent = React.useCallback(function (id) {
        setComponents(function (components) {
            var newComponents = components.slice();
            newComponents.splice(id, 1);
            return newComponents;
        });
    }, [setComponents]);
    var replaceComponent = React.useCallback(function (component, id) {
        setComponents(function (components) {
            var newComponents = components.slice();
            newComponents[id] = component;
            return newComponents;
        });
    }, [setComponents]);
    var context = React.useMemo(function () {
        return {
            components: components,
            addComponent: addComponent,
            removeComponent: removeComponent,
            replaceComponent: replaceComponent,
            addComponentByType: addComponentByType,
            node: nodeRef
        };
    }, [
        components,
        addComponent,
        removeComponent,
        replaceComponent,
        addComponentByType,
        nodeRef
    ]);
    var updateStage = React.useCallback(function (stage) {
        setStage(stage);
        setVersion(function (version) { return version + 1; });
    }, [setStage, setVersion]);
    var updateVersion = function () {
        setVersion(function (version) { return version + 1; });
    };
    var stageContext = React.useMemo(function () {
        return { stage: stage, version: version, setStage: updateStage, updateVersion: updateVersion };
    }, [stage, updateStage, version]);
    return (_jsx(ViewerContext.Provider, __assign({ value: context }, { children: _jsx(StageContext.Provider, __assign({ value: stageContext }, { children: _jsx("div", __assign({ className: 'protein-viewer', ref: nodeRef }, { children: children })) })) })));
};
export default ProteinViewer;
