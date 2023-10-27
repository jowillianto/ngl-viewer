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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { ColorPicker } from "../forms/color-picker";
import Vector3DInput from "../forms/3d-vector";
import ViewerContext from "./viewer-context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faGear, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./panel.css";
import Collapsible from "./collapsible";
var ViewerPanel = function () {
    var context = useContext(ViewerContext);
    var selectedIndex = 0;
    var handleColorChange = function (color) {
        var component = context.components[selectedIndex];
        var oldProps = component.props;
        var newProps = Object.assign(oldProps, { color: color });
        var newComponent = Object.assign(component, { props: newProps });
        context.replaceComponent(newComponent, selectedIndex);
    };
    var handleCoordinateChange = function (position, position1, position2) {
        var component = context.components[selectedIndex];
        var oldProps = component.props;
        var newProps;
        if (["arrow", "cone", "cylinder"].includes(context.components[selectedIndex].type)) {
            newProps = Object.assign(oldProps, { position1: position1, position2: position2 });
        }
        else if (position) {
            newProps = Object.assign(oldProps, { position: position });
        }
        var newComponent = Object.assign(component, { props: newProps });
        context.replaceComponent(newComponent, selectedIndex);
    };
    var handleViewSettings = function (viewSettings) {
        var component = context.components[selectedIndex];
        var oldProps = component.props;
        var newProps = Object.assign(oldProps, { viewSettings: viewSettings });
        var newComponent = Object.assign(component, { props: newProps });
        context.replaceComponent(newComponent, selectedIndex);
    };
    var handleFileUp = function (file) {
        var component = context.components[selectedIndex];
        var oldProps = component.props;
        var newProps = Object.assign(oldProps, { file: file });
        var newComponent = Object.assign(component, { props: newProps });
        context.replaceComponent(newComponent, selectedIndex);
    };
    var handleViewSettingsChange = function (viewSettings) {
        var component = context.components[selectedIndex];
        if (component.type === 'file') {
            var oldProps = component.props;
            var newProps = Object.assign(oldProps, { viewSettings: viewSettings });
            var newComponent = Object.assign(component, { props: newProps });
            context.replaceComponent(newComponent, selectedIndex);
        }
    };
    var component = context.components[selectedIndex];
    return (_jsxs("div", __assign({ className: "panel" }, { children: [_jsxs("div", __assign({ className: "Sticky" }, { children: [_jsx("span", { children: _jsx(FontAwesomeIcon, { icon: faSquarePlus }) }), _jsx("span", { children: _jsx(FontAwesomeIcon, { icon: faSquareMinus }) }), _jsx("span", { children: _jsx(FontAwesomeIcon, { icon: faCircleDot }) }), _jsx("span", { children: _jsx(FontAwesomeIcon, { icon: faTrash }) }), _jsx("span", { children: _jsx(FontAwesomeIcon, { icon: faGear }) })] })), context.components.map(function (component, index) {
                return (_jsx(Collapsible, { component: component, index: index }));
            }), _jsxs("div", { children: [component && "color" in component.props && (_jsx(ColorPicker, { value: component.props.color, onChange: handleColorChange, readOnly: false })), component &&
                        "position1" in component.props &&
                        "position2" in component.props && (_jsxs(_Fragment, { children: [_jsx(Vector3DInput, { value: component.props.position1, onChange: function (position1) {
                                    if ("position2" in component.props) {
                                        handleCoordinateChange(undefined, position1, component.props.position2);
                                    }
                                }, readOnly: false }), _jsx(Vector3DInput, { value: component.props.position2, onChange: function (position2) {
                                    if ("position1" in component.props) {
                                        handleCoordinateChange(undefined, component.props.position1, position2);
                                    }
                                }, readOnly: false })] })), component && "position" in component.props && (_jsx(Vector3DInput, { value: component.props.position, onChange: function (position) {
                            handleCoordinateChange(position, undefined, undefined);
                        }, readOnly: false }))] })] })));
};
export default ViewerPanel;
