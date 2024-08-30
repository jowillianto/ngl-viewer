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
import React, { useRef, useState, useContext } from 'react';
import StageContext from './ngl-viewer/stage-context';
import ScreenshotAndDownload from './ngl-viewer/user-interface/screenshot-download';
import ViewerContext from './ngl-viewer/user-interface/viewer-context';
import ThemeSwitcher from './ngl-viewer/user-interface/theme-change';
import CenterStructure from './ngl-viewer/user-interface/center-structure';
import SetCameraType from './ngl-viewer/user-interface/view-perspective';
import ToggleRockSpinOrOff from './ngl-viewer/user-interface/toggle-rock-spin';
import Select from 'react-select';
import './viewer.css';
var ViewerComponent = function () {
    var _a = useState(false), visible = _a[0], setVisible = _a[1];
    var _b = useState(''), pdb = _b[0], setPdb = _b[1];
    var _c = useState('light'), theme = _c[0], setTheme = _c[1];
    var defaultViewSettings = [{ type: 'cartoon', params: {} }];
    var viewerContext = useContext(ViewerContext);
    var fileInputRef = useRef(null);
    var stage = useContext(StageContext).stage;
    var ViewSelect = function (_a) {
        var onClick = _a.onClick, options = _a.options, defaultValue = _a.defaultValue;
        var onChange = React.useCallback(function (option) {
            if (option === null)
                return;
            onClick(option.value);
        }, [onClick]);
        return (_jsx(Select, { options: options, onChange: onChange, defaultValue: defaultValue }));
    };
    var handleFileSelect = function (event) {
        var file = event.target.files[0];
        if (file) {
            var reader_1 = new FileReader();
            var readAsArrayBuffer = function () {
                return new Promise(function (resolve, reject) {
                    reader_1.onload = function () { return resolve(reader_1.result); };
                    reader_1.onerror = reject;
                    reader_1.readAsArrayBuffer(file);
                });
            };
            readAsArrayBuffer().then(function (arrayBuffer) {
                var blob = new Blob([arrayBuffer], { type: file.type });
                viewerContext.addComponent({
                    type: 'file',
                    props: {
                        file: blob,
                        viewSettings: defaultViewSettings,
                        fileSettings: { ext: 'pdb' },
                    },
                    config: { fileName: file.name },
                });
            });
        }
    };
    return (_jsx("div", { className: "viewer ".concat(theme, "-theme"), children: _jsx("div", { className: "navbar", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "navbar-brand", children: "CaliciNGL" }), _jsx("div", { className: "navbar-collapse", children: _jsxs("ul", { className: "navbar-nav", children: [_jsxs("li", { children: [_jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileSelect, style: { display: 'none' } }), _jsx("button", { onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, children: "Open" })] }), _jsx("li", { children: _jsx(ScreenshotAndDownload, { render: function (props) { return _jsx("button", __assign({}, props, { children: "Screenshot" })); }, props: {} }) }), _jsx("li", { children: _jsx(ThemeSwitcher, { render: function (props) { return (_jsx("button", { onClick: props.onClick, children: props.currentTheme === "light" ? "Light" : "Dark" })); }, props: {} }) }), _jsx("li", { children: _jsx(ToggleRockSpinOrOff, { initialState: "spin", render: function (props) { return (_jsx("button", __assign({}, props, { children: "toggle spin" }))); }, props: {} }) }), _jsx("li", { children: _jsx(ToggleRockSpinOrOff, { initialState: "rock", render: function (props) { return (_jsx("button", __assign({}, props, { children: "toggle rock" }))); }, props: {} }) }), _jsx("li", { children: _jsx(SetCameraType, { render: ViewSelect, props: {
                                            options: [{
                                                    label: "Perspective",
                                                    value: "perspective"
                                                }, {
                                                    label: "Orthographic",
                                                    value: "orthographic"
                                                }, {
                                                    label: "Stereo",
                                                    value: "stereo"
                                                }],
                                            defaultValue: {
                                                label: "Perspective",
                                                value: "perspective"
                                            },
                                        } }) }), _jsx("li", { children: _jsx(CenterStructure, { render: function (props) { return (_jsx("button", __assign({}, props, { children: "Center Structure" }))); }, props: {} }) }), _jsx("li", {}), _jsx("li", {})] }) })] }) }) }));
};
export default ViewerComponent;
