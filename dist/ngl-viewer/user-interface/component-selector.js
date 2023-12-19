import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ViewerContext from "./viewer-context";
import Select from 'react-select';
import { componentTypes } from "./component-data";
var ViewerSelector = function (_a) {
    var _b = _a.options, options = _b === void 0 ? componentTypes : _b, _c = _a.addButton, addButton = _c === void 0 ? 'Add' : _c;
    var _d = React.useState(null), selected = _d[0], setSelected = _d[1];
    var addComponentByType = React.useContext(ViewerContext).addComponentByType;
    var onSelectChange = React.useCallback(function (option) {
        if (option)
            setSelected(option.value);
    }, [setSelected]);
    var addComponent = React.useCallback(function () {
        if (!selected)
            return;
        addComponentByType(selected);
    }, [addComponentByType, selected]);
    var selectorOptions = React.useMemo(function () {
        return options.map(function (option) {
            return {
                label: option.charAt(0).toUpperCase() + option.slice(1).toLowerCase(),
                value: option
            };
        });
    }, [options]);
    return (_jsxs("div", { className: 'component-selector', children: [_jsx("div", { className: 'component-selector select', children: _jsx(Select, { options: selectorOptions, onChange: onSelectChange }) }), _jsx("div", { className: 'component-selector add', children: _jsx("button", { onClick: addComponent, children: addButton }) })] }));
};
export default ViewerSelector;
