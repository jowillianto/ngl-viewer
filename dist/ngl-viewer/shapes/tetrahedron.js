import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useComponent } from './base-shape';
import * as NGL from 'ngl';
import { randomString } from '../utils/utils';
export default function NGLTetrahedron(_a) {
    var name = _a.name, position = _a.position, color = _a.color, size = _a.size, heightAxis = _a.heightAxis, depthAxis = _a.depthAxis, shapeParams = _a.shapeParams, viewSettings = _a.viewSettings, autoViewTimeout = _a.autoViewTimeout;
    var shapeCreator = React.useMemo(function () {
        return new NGL.Shape(undefined, shapeParams).addTetrahedron(position, color, size, heightAxis, depthAxis, name === undefined ? randomString(10) : name);
    }, [name, position, color, size, heightAxis, depthAxis, shapeParams]);
    useComponent(shapeCreator, viewSettings, autoViewTimeout);
    return _jsx(_Fragment, {});
}
