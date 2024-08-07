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
var NGLBox = /** @class */ (function (_super) {
    __extends(NGLBox, _super);
    function NGLBox(props) {
        var _this = _super.call(this, props) || this;
        _this.addBox = function (shape) {
            var _a = _this.props, position = _a.position, color = _a.color, size = _a.size, heightAxis = _a.heightAxis, depthAxis = _a.depthAxis;
            var name = _this.props.name ? _this.props.name : _this.randomName;
            return shape.addBox(position, color, size, heightAxis, depthAxis, name);
        };
        _this.randomName = randomString(10);
        return _this;
    }
    NGLBox.prototype.hashProps = function () {
        return JSON.stringify(this.props);
    };
    NGLBox.prototype.render = function () {
        return (_jsx(BaseShape, { addShape: this.addBox, viewSettings: this.props.viewSettings, shapeParams: this.props.shapeParams }));
    };
    return NGLBox;
}(React.Component));
export default NGLBox;
