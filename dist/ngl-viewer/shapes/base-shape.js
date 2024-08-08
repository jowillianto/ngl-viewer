import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useContext, useState } from "react";
import StageContext from "../stage-context";
import * as NGL from "ngl";
var BaseShape = function (_a) {
    var addShape = _a.addShape, shapeParams = _a.shapeParams, viewSettings = _a.viewSettings;
    var _b = useContext(StageContext), stage = _b.stage, updateVersion = _b.updateVersion;
    var _c = useState(null), component = _c[0], setComponent = _c[1];
    var addShapeFromProps = React.useCallback(function () {
        var shape = new NGL.Shape("shape", shapeParams);
        var modShape = addShape(shape);
        if (stage === null)
            return;
        var newComponent = stage.addComponentFromObject(modShape);
        if (!newComponent)
            return;
        viewSettings.forEach(function (viewSetting) {
            newComponent.addRepresentation(viewSetting.type, viewSetting.params);
        });
        stage.autoView();
        updateVersion();
        setComponent(newComponent);
    }, [addShape, shapeParams, viewSettings, stage, updateVersion]);
    useEffect(function () {
        addShapeFromProps();
        return function () {
            setComponent(function (prevComponent) {
                if (stage === null)
                    return null;
                if (prevComponent !== null)
                    stage.removeComponent(prevComponent);
                return null;
            });
        };
    }, [addShapeFromProps, stage]);
    return _jsx(_Fragment, {});
};
export default BaseShape;
