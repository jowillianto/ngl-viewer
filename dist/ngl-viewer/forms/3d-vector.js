var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var Vector3DInput = function (props) {
    var _a = props.value, x = _a[0], y = _a[1], z = _a[2];
    var handleInputChange = function (index) { return function (event) {
        var updatedValue = __spreadArray([], props.value, true);
        updatedValue[index] = parseFloat(event.target.value);
        props.onChange(updatedValue);
    }; };
    return (_jsxs("div", { children: [_jsxs("label", { children: ["X:", _jsx("input", { type: "number", value: x, onChange: handleInputChange(0) })] }), _jsxs("label", { children: ["Y:", _jsx("input", { type: "number", value: y, onChange: handleInputChange(1) })] }), _jsxs("label", { children: ["Z:", _jsx("input", { type: "number", value: z, onChange: handleInputChange(2) })] })] }));
};
export default Vector3DInput;
