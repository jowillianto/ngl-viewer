var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import BaseShape from './base-shape';
import { randomString } from '../utils/utils';
var NGLCylinder = /** @class */ (function (_super) {
    __extends(NGLCylinder, _super);
    function NGLCylinder(props) {
        var _this = _super.call(this, props) || this;
        _this.addCylinder = function (shape) {
            var _a = _this.props, position1 = _a.position1, position2 = _a.position2, color = _a.color, radius = _a.radius;
            var name = _this.props.name ? _this.props.name : _this.randomName;
            return shape.addCylinder(position1, position2, color, radius, name);
        };
        _this.randomName = randomString(10);
        return _this;
    }
    NGLCylinder.prototype.hashProps = function () {
        // Very slow hash, change later
        return JSON.stringify(this.props);
    };
    NGLCylinder.prototype.render = function () {
        return (_jsx(BaseShape, { addShape: this.addCylinder, viewSettings: this.props.viewSettings, shapeParams: this.props.shapeParams }));
    };
    return NGLCylinder;
}(React.Component));
export default NGLCylinder;
