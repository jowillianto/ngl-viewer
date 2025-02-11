import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { useComponent, } from "./base-shape";
import * as NGL from "ngl";
import { randomString } from "../utils/utils";
export default function NGLArrow(_a) {
    var position1 = _a.position1, position2 = _a.position2, color = _a.color, radius = _a.radius, name = _a.name, viewSettings = _a.viewSettings, shapeParams = _a.shapeParams;
    var shapeCreator = React.useMemo(function () {
        return new NGL.Shape(undefined, shapeParams).addArrow(position1, position2, color, radius, name === undefined ? randomString(10) : name);
    }, [position1, position2, color, radius, name, shapeParams]);
    useComponent(shapeCreator, viewSettings);
    return _jsx(_Fragment, {});
}
