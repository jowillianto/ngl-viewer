import React from "react";
import StageContext from "../stage-context";
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
    var _b = React.useContext(StageContext), versionedStage = _b.stage, updateStage = _b.updateStage;
    var stage = React.useMemo(function () {
        if (versionedStage === null)
            return null;
        else
            return versionedStage.stage;
    }, [versionedStage]);
    var removeComponent = React.useCallback(function () {
        setComp(function (prevComp) {
            if (stage !== null && prevComp !== null) {
                stage.removeComponent(prevComp);
                updateStage();
            }
            return null;
        });
    }, [stage, updateStage]);
    React.useEffect(function () {
        if (stage === null)
            return;
        componentToPromise(component, stage)
            .then(function (comp) {
            if (comp === null)
                return;
            setComp(comp);
            stage.addComponent(comp);
            viewSettings.forEach(function (viewSetting) {
                return comp.addRepresentation(viewSetting.type, viewSetting.params);
            });
            if (autoViewTimeout >= 0)
                stage.autoView(autoViewTimeout);
            updateStage();
        })
            .catch(function (err) { return console.error(err); });
        return removeComponent;
    }, [
        stage,
        component,
        viewSettings,
        removeComponent,
        autoViewTimeout,
        updateStage,
    ]);
    return comp;
}
export function useComponentFromObject(obj, viewSettings, autoViewTimeout) {
    var objCreator = React.useCallback(function (stage) {
        if (obj === null || stage === null)
            return null;
        var component = stage.addComponentFromObject(obj);
        if (!component)
            return null;
        return component;
    }, [obj]);
    return useComponent(objCreator, viewSettings, autoViewTimeout);
}
