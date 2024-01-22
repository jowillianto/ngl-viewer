import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useContext, useState } from 'react';
import StageContext from '../stage-context';
import * as NGL from 'ngl';
var BaseShape = function (props) {
    var context = useContext(StageContext);
    var _a = useState(null), component = _a[0], setComponent = _a[1];
    useEffect(function () {
        addShapeFromProps();
        return function () {
            removeComponentIfExist();
        };
    }, [props.hash, context.stage]);
    var addShapeFromProps = function () {
        removeComponentIfExist();
        var shapeParams = props.shapeParams;
        var shape = new NGL.Shape('shape', shapeParams);
        var modShape = props.addShape(shape);
        var stage = context.stage;
        if (stage) {
            var newComponent_1 = stage.addComponentFromObject(modShape);
            if (newComponent_1) {
                var viewSettings = props.viewSettings;
                viewSettings.forEach(function (viewSetting) {
                    newComponent_1.addRepresentation(viewSetting.type, viewSetting.params);
                });
                stage.autoView();
                context.updateVersion();
                setComponent(newComponent_1);
            }
        }
    };
    var removeComponentIfExist = function () {
        var _a;
        if (component) {
            (_a = context.stage) === null || _a === void 0 ? void 0 : _a.removeComponent(component);
        }
    };
    var removeShape = function () {
        var stage = context.stage;
        if (stage && component) {
            stage.removeComponent(component);
        }
    };
    return _jsx(_Fragment, {});
};
export default BaseShape;
