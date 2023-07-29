import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ViewerContext from "./viewer-context";
import Select from 'react-select';
var ViewerSelector = function (_a) {
    var options = _a.options, _b = _a.addButton, addButton = _b === void 0 ? 'Add' : _b;
    var _c = React.useState(null), selected = _c[0], setSelected = _c[1];
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
