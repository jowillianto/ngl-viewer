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
    return (_jsx("div", { className: "file-uploader", children: _jsx("input", { type: "file", onChange: handleFileChange }) }));
};
export default FileUploader;
