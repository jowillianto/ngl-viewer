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
var ProteinViewer = function (_a) {
    var _b = _a.initialComponents, initialComponents = _b === void 0 ? [] : _b, children = _a.children;
    var _c = React.useState(initialComponents), components = _c[0], setComponents = _c[1];
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
