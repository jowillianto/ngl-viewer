import React from "react";
import { useStage } from "../stage-context";
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
export default function useComponent(component, viewSettings, autoViewTimeout) {
    if (autoViewTimeout === void 0) { autoViewTimeout = 0; }
    var _a = React.useState(null), comp = _a[0], setComp = _a[1];
    var stage = useStage();
    var removeComponent = React.useCallback(function () {
        setComp(function (prevComp) {
            if (stage !== null && prevComp !== null) {
                stage.removeComponent(prevComp);
            }
            return null;
        });
    }, [stage]);
    React.useEffect(function () {
        if (stage === null)
            return;
        componentToPromise(component, stage).then(function (comp) {
            if (comp === null)
                return;
            setComp(comp);
            stage.addComponent(comp);
            stage.autoView(autoViewTimeout);
            viewSettings.forEach(function (viewSetting) {
                return comp.addRepresentation(viewSetting.type, viewSetting.params);
            });
        })
            .catch(function (err) { return console.error(err); });
        return removeComponent;
    }, [stage, component, viewSettings, removeComponent, autoViewTimeout]);
    return comp;
}
export function useComponentFromObject(obj, viewSettings) {
    var objCreator = React.useCallback(function (stage) {
        if (obj === null || stage === null)
            return null;
        var component = stage.addComponentFromObject(obj);
        if (!component)
            return null;
        return component;
    }, [obj]);
    return useComponent(objCreator, viewSettings);
}
