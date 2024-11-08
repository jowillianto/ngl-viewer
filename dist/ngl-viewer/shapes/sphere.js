import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { useComponentFromObject } from "./base-shape";
import * as NGL from "ngl";
import { randomString } from "../utils/utils";
export default function NGLSphere(_a) {
    var name = _a.name, position = _a.position, color = _a.color, radius = _a.radius, shapeParams = _a.shapeParams, viewSettings = _a.viewSettings, autoViewTimeout = _a.autoViewTimeout;
    var shapeCreator = React.useMemo(function () {
        return new NGL.Shape(undefined, shapeParams).addSphere(position, color, radius, name === undefined ? randomString(10) : name);
    }, [name, position, color, radius, shapeParams]);
    useComponentFromObject(shapeCreator, viewSettings, autoViewTimeout);
    return _jsx(_Fragment, {});
}
