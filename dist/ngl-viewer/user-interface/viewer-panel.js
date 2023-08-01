import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { ColorPicker } from "../forms/color-picker";
import Vector3DInput from "../forms/3d-vector";
import ViewSettingsInput from "../forms/viewer/view-settings";
import ViewerContext from "./viewer-context";
import FileUploader from "../forms/file-reader";
import FileViewSettings from "../forms/viewer/file-view-settings";
var ViewerPanel = function () {
    var context = useContext(ViewerContext);
    var selectedIndex = 0;
    var handleColorChange = function (color) {
        var component = context.components[selectedIndex];
        var oldProps = component.props;
        var newProps = Object.assign(oldProps, { color: color });
        var newComponent = Object.assign(component, { props: newProps });
        console.log(color);
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
        var oldProps = component.props;
        var newProps = Object.assign(oldProps, { viewSettings: viewSettings });
        var newComponent = Object.assign(component, { props: newProps });
        context.replaceComponent(newComponent, selectedIndex);
    };
    var component = context.components[selectedIndex];
    return (_jsxs("div", { children: [_jsx("h3", { children: "Photoshop Panel" }), _jsxs("div", { children: [component && "color" in component.props && (_jsx(ColorPicker, { value: component.props.color, onChange: handleColorChange, readOnly: false })), component &&
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
                        }, readOnly: false })), component && "file" in component.props && (_jsx(FileUploader, { onChange: handleFileUp, readOnly: false, value: component.props.file })), component && "viewSettings" in component.props && (_jsx(ViewSettingsInput, { value: component.props.viewSettings, onChange: handleViewSettings })), component && "viewSettings" in component.props && (_jsx(FileViewSettings, { options: [
                            "cartoon",
                            "ribbon",
                            "surface",
                            "licorice",
                            "ball+stick",
                        ], value: component.props.viewSettings, onChange: handleViewSettingsChange, readOnly: false }))] })] }));
};
export default ViewerPanel;
