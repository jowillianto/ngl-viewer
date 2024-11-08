import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { useComponentFromObject, } from "./base-shape";
import * as NGL from "ngl";
export default function NGLText(_a) {
    var position = _a.position, text = _a.text, size = _a.size, color = _a.color, viewSettings = _a.viewSettings, shapeParams = _a.shapeParams, autoViewTimeout = _a.autoViewTimeout;
    var shapeCreator = React.useMemo(function () {
        return new NGL.Shape(undefined, shapeParams).addText(position, color, size, text);
    }, [position, color, size, text, shapeParams]);
    useComponentFromObject(shapeCreator, viewSettings, autoViewTimeout);
    return _jsx(_Fragment, {});
}
