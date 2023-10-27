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
import { useState } from "react";
var FileUploader = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    var _b = useState(value), selectedFile = _b[0], setSelectedFile = _b[1];
    var handleFileChange = function (event) {
        var file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
        if (file) {
            onChange(file);
        }
    };
    return (_jsx("div", __assign({ className: "file-uploader" }, { children: _jsx("input", { type: "file", onChange: handleFileChange }) })));
};
export default FileUploader;
