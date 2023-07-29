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
var NGLSphere = /** @class */ (function (_super) {
    __extends(NGLSphere, _super);
    function NGLSphere(props) {
        var _this = _super.call(this, props) || this;
        _this.addSphere = function (shape) {
            var position = _this.props.position;
            var color = _this.props.color;
            var radius = _this.props.radius;
            var name = _this.props.name ? _this.props.name : _this.randomName;
            return shape.addSphere(position, color, radius, name);
        };
        _this.randomName = randomString(10);
        return _this;
    }
    NGLSphere.prototype.hashProps = function () {
        // Very slow hash, change later
        return JSON.stringify(this.props);
    };
    NGLSphere.prototype.render = function () {
        return (_jsx(BaseShape, { addShape: this.addSphere, viewSettings: this.props.viewSettings, shapeParams: this.props.shapeParams, hash: this.hashProps() }));
    };
    return NGLSphere;
}(React.Component));
export default NGLSphere;
