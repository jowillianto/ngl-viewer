import React from "react";
import { useStage } from "../stage-context";
import * as NGL from "ngl";
function componentToPromise(component, stage) {
    if (component === null)
        return new Promise(function (res, rej) { return res(null); });
    else if (component instanceof Promise)
        return component;
    else if (typeof component === "function")
        return componentToPromise(component(stage), stage);
    else
        return new Promise(function (res, rej) { return res(component); });
}
var DestructableValue = /** @class */ (function () {
    function DestructableValue(data, destructor) {
        this.data = data;
        this.destructor = destructor;
    }
    DestructableValue.prototype.destroy = function () {
        if (this.data !== null) {
            try {
                this.destructor(this.data);
            }
            catch (err) {
                console.error(err);
            }
        }
        this.data = null;
    };
    return DestructableValue;
}());
export function useComponent(component, viewSettings, autoViewTimeout, manageOnly) {
    if (autoViewTimeout === void 0) { autoViewTimeout = 0; }
    if (manageOnly === void 0) { manageOnly = false; }
    var _a = React.useState(null), comp = _a[0], setComp = _a[1];
    var stage = useStage();
    var addComponent = React.useCallback(function (v, stage) {
        if (v === null)
            return v;
        if (v instanceof NGL.Component) {
            if (manageOnly)
                return v;
            stage.addComponent(v);
            return v;
        }
        else {
            var c = stage.addComponentFromObject(v);
            if (!c)
                return null;
            return c;
        }
    }, [manageOnly]);
    React.useEffect(function () {
        return function () {
            comp === null || comp === void 0 ? void 0 : comp.destroy();
        };
    }, [comp]);
    React.useEffect(function () {
        if (stage === null) {
            setComp(null);
            return;
        }
        componentToPromise(component, stage)
            .then(function (comp) {
            var component = addComponent(comp, stage);
            if (component === null) {
                setComp(null);
                return;
            }
            else {
                setComp(new DestructableValue(component, function (v) { return stage.removeComponent(v); }));
            }
            viewSettings.forEach(function (viewSetting) {
                return component.addRepresentation(viewSetting.type, viewSetting.params);
            });
            if (autoViewTimeout >= 0)
                stage.autoView(autoViewTimeout);
        })
            .catch(function (err) { return console.error(err); });
    }, [stage, component, autoViewTimeout, addComponent, viewSettings]);
    return comp;
}
