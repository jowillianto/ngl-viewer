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
var NGLText = /** @class */ (function (_super) {
    __extends(NGLText, _super);
    function NGLText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addText = function (shape) {
            var _a = _this.props, position = _a.position, text = _a.text, size = _a.size, color = _a.color;
            return shape.addText(position, color, size, text);
        };
        return _this;
    }
    NGLText.prototype.hashProps = function () {
        // Very slow hash, change later
        return JSON.stringify(this.props);
    };
    NGLText.prototype.render = function () {
        return (_jsx(BaseShape, { addShape: this.addText, viewSettings: this.props.viewSettings, shapeParams: this.props.shapeParams }));
    };
    return NGLText;
}(React.Component));
export default NGLText;
