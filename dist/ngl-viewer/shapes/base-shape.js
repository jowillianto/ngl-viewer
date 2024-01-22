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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as NGL from 'ngl';
import React from 'react';
import StageContext from '../stage-context';
var BaseShape = /** @class */ (function (_super) {
    __extends(BaseShape, _super);
    function BaseShape(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            component: null
        };
        return _this;
    }
    BaseShape.prototype.componentDidMount = function () {
        this.addShapeFromProps();
    };
    BaseShape.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.hash !== prevProps.hash || this.context.stage !== this.context.stage) {
            this.addShapeFromProps();
        }
    };
    BaseShape.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        var sameStage = nextContext.stage === this.context.stage;
        var sameHash = nextProps.hash === this.props.hash;
        return !(sameHash && sameStage);
    };
    BaseShape.prototype.addShapeFromProps = function () {
        this.removeComponentIfExist();
        var shapeParams = this.props.shapeParams;
        var shape = new NGL.Shape("shape", shapeParams);
        var modShape = this.props.addShape(shape);
        var stage = this.context.stage;
        if (stage) {
            var component_1 = stage.addComponentFromObject(modShape);
            if (component_1) {
                var viewSettings = this.props.viewSettings;
                viewSettings.forEach(function (viewSetting) {
                    component_1.addRepresentation(viewSetting.type, viewSetting.params);
                });
                stage.autoView();
                this.context.updateVersion();
                this.setState({ component: component_1 });
            }
        }
    };
    BaseShape.prototype.removeComponentIfExist = function () {
        var _a;
        if (this.state.component)
            (_a = this.context.stage) === null || _a === void 0 ? void 0 : _a.removeComponent(this.state.component);
    };
    BaseShape.prototype.removeShape = function () {
        var stage = this.context.stage;
        var component = this.state.component;
        if (stage && component)
            stage.removeComponent(component);
    };
    BaseShape.prototype.componentWillUnmount = function () {
        this.removeComponentIfExist();
    };
    BaseShape.prototype.render = function () {
        return _jsx(_Fragment, {});
    };
    BaseShape.contextType = StageContext;
    return BaseShape;
}(React.Component));
export default BaseShape;
