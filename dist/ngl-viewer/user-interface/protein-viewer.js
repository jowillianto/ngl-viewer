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
    var _a = props.initialComponents, initialComponents = _a === void 0 ? [] : _a, children = props.children, onComponentsChange = props.onComponentsChange;
    var _b = useState(null), stage = _b[0], setStage = _b[1];
    var _c = React.useState(props.components ? props.components : initialComponents), internalComp = _c[0], setInternalComp = _c[1];
    var nodeRef = React.createRef();
    var components = React.useMemo(function () {
        return props.components ? props.components : internalComp;
    }, [props.components, internalComp]);
    var setComponents = React.useCallback(function (comp) {
        setInternalComp(function (components) {
            var newComponents = comp(components);
            if (onComponentsChange)
                onComponentsChange(components);
            return newComponents;
        });
    }, [onComponentsChange, setInternalComp]);
    var addComponent = React.useCallback(function (component) {
        setComponents(function (components) { return __spreadArray(__spreadArray([], components, true), [component], false); });
    }, [setComponents]);
    var addComponentByType = React.useCallback(function (type) {
        if (!(type in mockComponentsDataMap))
            throw Error(type + " is invalid");
        var newComponent = {
            type: type,
            props: mockComponentsDataMap[type].props,
            config: {},
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
            node: nodeRef,
        };
    }, [
        components,
        addComponent,
        removeComponent,
        replaceComponent,
        addComponentByType,
        nodeRef,
    ]);
    var stageContext = React.useMemo(function () {
        return { stage: stage, setStage: setStage };
    }, [stage, setStage]);
    var className = props.className;
    return (_jsx(ViewerContext.Provider, { value: context, children: _jsx(StageContext.Provider, { value: stageContext, children: _jsx("div", { className: "protein-viewer ".concat(className), ref: nodeRef, children: children }) }) }));
};
export default ProteinViewer;
