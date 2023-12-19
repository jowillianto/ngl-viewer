import { jsx as _jsx } from "react/jsx-runtime";
var FileViewerSelector = function (_a) {
    var value = _a.value, onChange = _a.onChange, options = _a.options;
    var handleChange = function (event) {
        onChange(event.target.value);
    };
    return (_jsx("select", { value: value, onChange: handleChange, children: options.map(function (option) { return (_jsx("option", { value: option, children: option }, option)); }) }));
};
export default FileViewerSelector;
