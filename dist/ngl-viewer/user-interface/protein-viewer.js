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
import React from "react";
import { mockComponentsDataMap } from "./component-data";
import ViewerContext from "./viewer-context";
var ProteinViewer = function (props) {
    var _a = props.initialComponents, initialComponents = _a === void 0 ? [] : _a, children = props.children;
    var _b = React.useState(props.components ? props.components : initialComponents), internalComp = _b[0], setInternalComp = _b[1];
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
        addComponent(newComponent);
    }, [addComponent]);
    var removeComponent = React.useCallback(function (id) {
        setComponents(function (components) {
            var newComponents = components.slice();
            newComponents.slice(id, 1);
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
            addComponentByType: addComponentByType
        };
    }, [
        components,
        addComponent,
        removeComponent,
        replaceComponent,
        addComponentByType
    ]);
    return (_jsx(ViewerContext.Provider, { value: context, children: children }));
};
export default ProteinViewer;
