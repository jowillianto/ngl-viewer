import React from "react";
import StageContext from "../stage-context";
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
export function useComponent(component, viewSettings, autoViewTimeout, manageOnly) {
    if (autoViewTimeout === void 0) { autoViewTimeout = 0; }
    if (manageOnly === void 0) { manageOnly = false; }
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
    var addComponent = React.useCallback(function (v) {
        if (v === null)
            return v;
        if (v instanceof NGL.Component) {
            if (manageOnly)
                return v;
            stage === null || stage === void 0 ? void 0 : stage.addComponent(v);
            return v;
        }
        else {
            var c = stage === null || stage === void 0 ? void 0 : stage.addComponentFromObject(v);
            if (!c)
                return null;
            return c;
        }
    }, [stage, manageOnly]);
    React.useEffect(function () {
        if (stage === null)
            return;
        componentToPromise(component, stage)
            .then(function (comp) {
            var component = addComponent(comp);
            if (component === null)
                return;
            viewSettings.forEach(function (viewSetting) {
                return component.addRepresentation(viewSetting.type, viewSetting.params);
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
        addComponent,
        updateStage,
    ]);
    console.log(stage);
    return comp;
}
