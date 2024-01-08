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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import * as NGL from 'ngl';
import StageContext from './stage-context';
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
    //   toggleSpin = () => {
    //     if (this.state.stage) {
    //       const isSpinning = !this.state.isSpinning;
    //       this.state.stage.setSpin(isSpinning);
    //       this.setState({ isSpinning });
    //     }
    // }
    // toggleRock = () => {
    //     if (this.state.stage) {
    //       const isRocking = !this.state.isRocking;
    //       this.state.stage.setRock(isRocking);
    //       this.setState({ isRocking });
    //     }
    // }
    // setPerspective = () => {
    //   this.state.stage?.setParameters({ cameraType: 'perspective' });
    //   this.setState({ projectionType: 'perspective' });
    // }
    // setOrthographic = () => {
    //   this.state.stage?.setParameters({ cameraType: 'orthographic' });
    //   this.setState({ projectionType: 'orthographic' });
    // }
    // setStereo = () => {
    //   this.state.stage?.setParameters({ cameraType: 'stereo' });
    //   this.setState({ projectionType: 'stereo' });
    // // }
    //   componentDidUpdate(prevProps: NGLStageProps) {
    //     if (this.state.stage && prevProps.viewSettings?.backgroundColor !== this.props.viewSettings?.backgroundColor) {
    //       this.state.stage.setParameters({
    //         backgroundColor: this.props.viewSettings?.backgroundColor
    //       });
    //     }
    //   }
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
        var height = this.props.height;
        var width = this.props.width;
        var style = { height: height, width: width };
        return (_jsxs("div", __assign({ className: 'ngl-viewer-stage' }, { children: [_jsx("div", __assign({ className: 'ngl-viewer-tab' }, { children: this.props.children })), _jsx("div", { className: 'ngl-viewer-canvas', ref: this.stageRef, style: style })] })));
    };
    NGLStage.contextType = StageContext;
    return NGLStage;
}(React.Component));
export default NGLStage;
