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
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import NGLScreenshot from "../utils/screenshot";
export var ScreenshotDownload = function (_a) {
    var render = _a.render, props = _a.props, onClick = _a.onClick;
    var downloadOnClick = React.useCallback(function () {
        onClick()
            .then(function (blob) {
            var url = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = url;
            link.download = "".concat(Date.now().toString(), "_screenshot.png");
            link.click();
            // clean up to free memory
            window.URL.revokeObjectURL(url);
        }).catch(function (err) {
            console.error("Error capturing screenshot:", err);
        });
    }, [onClick]);
    var Component = render;
    var renderProps = __assign({ onClick: downloadOnClick }, props);
    return (_jsx(Component, __assign({}, renderProps)));
};
var ScreenshotAndDownload = function (props) {
    return (_jsx(NGLScreenshot, { render: ScreenshotDownload, props: {
            render: props.render,
            props: props.props
        }, params: props.params }));
};
export default ScreenshotAndDownload;
