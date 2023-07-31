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
import { StageContext } from '../stage';
import StructureComponentContext from '../context/component-context';
var NGLFile = /** @class */ (function (_super) {
    __extends(NGLFile, _super);
    function NGLFile(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showRepr: true,
            component: null,
            update: false
        };
        return _this;
    }
    NGLFile.prototype.loadFileToStage = function () {
        var _this = this;
        var stage = this.context.stage;
        var file = this.props.file;
        if (stage && file && !this.state.update) {
            this.removeComponentIfExist();
            stage.loadFile(file, this.props.fileSettings)
                .then(function (component) {
                var viewSettings = _this.props.viewSettings;
                if (component) {
                    viewSettings.forEach(function (viewSetting) {
                        component.addRepresentation(viewSetting.type, viewSetting.params);
                    });
                    stage.autoView();
                    _this.setState({
                        component: component, update: true
                    }, function () { return _this.setState({ update: false }); });
                }
            })
                .catch(function (err) {
                console.error(err);
            });
        }
    };
    NGLFile.prototype.compareState = function (nextState) {
        return nextState.update;
    };
    NGLFile.prototype.removeComponentIfExist = function () {
        var stage = this.context.stage;
        var component = this.state.component;
        if (stage && component)
            stage.removeComponent(component);
    };
    NGLFile.prototype.componentDidMount = function () {
        this.loadFileToStage();
    };
    NGLFile.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        // Make Update Conditions here
        var diffFile = this.props.file !== nextProps.file;
        var diffSettings = this.props.viewSettings !== nextProps.viewSettings;
        var diffStage = this.context.stage !== nextContext.stage;
        var diffState = this.compareState(nextState);
        return diffFile || diffSettings || diffStage || diffState;
    };
    NGLFile.prototype.componentDidUpdate = function () {
        this.loadFileToStage();
    };
    NGLFile.prototype.componentWillUnmount = function () {
        this.removeComponentIfExist();
    };
    NGLFile.prototype.render = function () {
        return (_jsx(StructureComponentContext.Provider, { value: this.state, children: _jsx("div", { className: 'file-controls', children: this.props.children }) }));
    };
    NGLFile.contextType = StageContext;
    return NGLFile;
}(React.Component));
export default NGLFile;
