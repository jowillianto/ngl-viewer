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
import React from "react";
import * as NGL from "ngl";
import StageContext from "./stage-context";
var NGLStage = /** @class */ (function (_super) {
    __extends(NGLStage, _super);
    function NGLStage(props) {
        var _this = _super.call(this, props) || this;
        _this.resizeStage = function () {
            var _a;
            (_a = _this.context.stage) === null || _a === void 0 ? void 0 : _a.handleResize();
        };
        _this.stageRef = React.createRef();
        return _this;
    }
    NGLStage.prototype.componentDidMount = function () {
        var htmlElm = this.stageRef.current;
        if (htmlElm) {
            var stage = new NGL.Stage(htmlElm, this.props.viewSettings);
            this.context.setStage(stage);
            this.addObserver();
        }
    };
    NGLStage.prototype.addObserver = function () {
        if (this.stageRef.current) {
            this.observer = new ResizeObserver(this.resizeStage);
            this.observer.observe(this.stageRef.current);
        }
    };
    NGLStage.prototype.componentWillUnmount = function () {
        var _a, _b;
        (_a = this.context.stage) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = this.observer) === null || _b === void 0 ? void 0 : _b.disconnect();
    };
    NGLStage.prototype.render = function () {
        var _a = this.props, height = _a.height, width = _a.width, _b = _a.className, className = _b === void 0 ? "" : _b;
        var style = { height: height, width: width };
        return (_jsx("div", { className: "ngl-viewer-canvas ".concat(className), ref: this.stageRef, style: style }));
    };
    NGLStage.contextType = StageContext;
    return NGLStage;
}(React.Component));
export default NGLStage;
