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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import * as NGL from 'ngl';
export var StageContext = React.createContext({
    stage: null
});
var NGLStage = /** @class */ (function (_super) {
    __extends(NGLStage, _super);
    function NGLStage(props) {
        var _this = _super.call(this, props) || this;
        _this.resizeStage = function () {
            var _a;
            (_a = _this.state.stage) === null || _a === void 0 ? void 0 : _a.handleResize();
        };
        _this.state = {
            stage: null
        };
        _this.stageRef = React.createRef();
        return _this;
    }
    NGLStage.prototype.componentDidMount = function () {
        var htmlElm = this.stageRef.current;
        if (htmlElm) {
            var stage = new NGL.Stage(htmlElm, this.props.viewSettings);
            this.setState({ stage: stage });
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
        (_a = this.state.stage) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = this.observer) === null || _b === void 0 ? void 0 : _b.disconnect();
    };
    NGLStage.prototype.render = function () {
        var height = this.props.height;
        var width = this.props.width;
        var style = { height: height, width: width };
        return (_jsxs("div", { className: 'ngl-viewer-stage', children: [_jsx(StageContext.Provider, { value: this.state, children: _jsx("div", { className: 'ngl-viewer-tab', children: this.props.children }) }), _jsx("div", { className: 'ngl-viewer-canvas', ref: this.stageRef, style: style })] }));
    };
    return NGLStage;
}(React.Component));
export default NGLStage;
