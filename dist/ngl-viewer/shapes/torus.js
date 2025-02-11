import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { useComponent } from "./base-shape";
import * as NGL from "ngl";
import { randomString } from "../utils/utils";
export default function NGLEllipsoid(_a) {
    var position = _a.position, majorAxis = _a.majorAxis, minorAxis = _a.minorAxis, color = _a.color, radius = _a.radius, viewSettings = _a.viewSettings, shapeParams = _a.shapeParams, name = _a.name, autoViewTimeout = _a.autoViewTimeout;
    var shapeCreator = React.useMemo(function () {
        return new NGL.Shape(undefined, shapeParams).addTorus(position, color, radius, majorAxis, minorAxis, name === undefined ? randomString(10) : name);
    }, [position, majorAxis, minorAxis, color, radius, name, shapeParams]);
    useComponent(shapeCreator, viewSettings, autoViewTimeout);
    return _jsx(_Fragment, {});
}
