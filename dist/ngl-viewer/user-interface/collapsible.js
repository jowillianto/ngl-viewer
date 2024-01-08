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
import { useState, useContext, useEffect } from 'react';
import './collapsible.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot, faTrash } from '@fortawesome/free-solid-svg-icons';
import ViewerContext from './viewer-context';
import StageContext from '../stage-context';
var Collapsible = function (_a) {
    var component = _a.component, index = _a.index;
    var context = useContext(ViewerContext);
    var stageContext = useContext(StageContext);
    var typeListVal = component.props.viewSettings.map(function (item) { return item.type; });
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = useState(["cartoon", "ribbon", "surface", "licorice", "ball+stick"]), representation = _c[0], setRepresentation = _c[1];
    var _d = useState(typeListVal), typeList = _d[0], setTypeList = _d[1];
    var _e = useState(""), lastClickedItem = _e[0], setLastClickedItem = _e[1];
    var _f = useState(component.props.viewSettings), originalViewSettings = _f[0], setOriginalViewSettings = _f[1];
    var _g = useState(true), showAllRepresentations = _g[0], setShowAllRepresentations = _g[1];
    var _h = useState(''), fileName = _h[0], setFileName = _h[1];
    var toggleCollapsible = function () {
        setIsOpen(!isOpen);
    };
    var deleteRepresentation = function (item) {
        if (item === lastClickedItem) {
            setRepresentation(representation.filter(function (rep) { return rep !== item; }));
            setTypeList(typeList.filter(function (rep) { return rep !== item; }));
            var newSettings = component.props.viewSettings.filter(function (setting) { return setting.type !== item; });
            setOriginalViewSettings(newSettings);
            var oldProps = component.props;
            var newProps = Object.assign(oldProps, { viewSettings: newSettings });
            var newComponent = Object.assign(component, { props: newProps });
            context.replaceComponent(newComponent, index);
            setLastClickedItem("");
        }
        else {
            setLastClickedItem(item);
        }
    };
    var centerStructure = function () {
        var _a;
        (_a = stageContext.stage) === null || _a === void 0 ? void 0 : _a.autoView();
    };
    var changeViewSetting = function (item) {
        var newSettings = __spreadArray([], component.props.viewSettings, true);
        var isItemInRepresentation = typeList.includes(item);
        if (!isItemInRepresentation) {
            setTypeList(__spreadArray(__spreadArray([], typeList, true), [item], false));
            var newItem = __assign(__assign({}, newSettings[0]), { type: item });
            newSettings.push(newItem);
        }
        else {
            setTypeList(typeList.filter(function (rep) { return rep !== item; }));
            newSettings = newSettings.filter(function (setting) { return setting.type !== item; });
        }
        setOriginalViewSettings(newSettings);
        var oldProps = component.props;
        var newProps = Object.assign(oldProps, { viewSettings: newSettings });
        var newComponent = Object.assign(component, { props: newProps });
        context.replaceComponent(newComponent, index);
    };
    var changeViewOfComponent = function () {
        if (showAllRepresentations) {
            var newSettings = [];
            var oldProps = component.props;
            var newProps = Object.assign(oldProps, { viewSettings: newSettings });
            var newComponent = Object.assign(component, { props: newProps });
            context.replaceComponent(newComponent, index);
        }
        else {
            var oldProps = component.props;
            var newProps = Object.assign(oldProps, { viewSettings: originalViewSettings });
            var newComponent = Object.assign(component, { props: newProps });
            context.replaceComponent(newComponent, index);
        }
        setShowAllRepresentations(!showAllRepresentations);
    };
    var deleteComponent = function () {
        context.removeComponent(index);
    };
    useEffect(function () {
        if (component.type === 'file' && component.props.file !== null) {
            if (component.props.file instanceof File) {
                setFileName(component.props.file.name);
            }
        }
        else {
            setFileName(component.type);
        }
    }, [component]);
    return (_jsxs("div", __assign({ className: "collapsible" }, { children: [_jsxs("div", __assign({ className: "collapsible-header" }, { children: [_jsxs("div", __assign({ className: 'title' }, { children: [_jsx("span", __assign({ className: "toggle-icon", onClick: toggleCollapsible }, { children: isOpen ? _jsx(FontAwesomeIcon, { icon: faSquareMinus }) : _jsx(FontAwesomeIcon, { icon: faSquarePlus }) })), _jsx("span", { children: fileName })] })), _jsxs("div", __assign({ className: "actions" }, { children: [_jsx("span", __assign({ onClick: changeViewOfComponent }, { children: showAllRepresentations ? _jsx(FontAwesomeIcon, { icon: faEye }) : _jsx(FontAwesomeIcon, { icon: faEyeSlash }) })), _jsx("span", __assign({ onClick: centerStructure }, { children: _jsx(FontAwesomeIcon, { icon: faCircleDot }) })), _jsx("span", __assign({ onClick: deleteComponent }, { children: _jsx(FontAwesomeIcon, { icon: faTrash }) }))] }))] })), isOpen &&
                _jsx("div", __assign({ className: "collapsible-content" }, { children: representation.map(function (item) {
                        return (_jsxs("div", __assign({ className: "collapsible-header" }, { children: [_jsx("div", __assign({ className: 'title' }, { children: item })), _jsxs("div", __assign({ className: "actions" }, { children: [_jsx("span", __assign({ onClick: function () { return changeViewSetting(item); } }, { children: typeList.includes(item) ? _jsx(FontAwesomeIcon, { icon: faEye }) : _jsx(FontAwesomeIcon, { icon: faEyeSlash }) })), _jsx("span", __assign({ onClick: function () { return deleteRepresentation(item); } }, { children: item === lastClickedItem ? _jsx(FontAwesomeIcon, { icon: faTrash, fade: true }) : _jsx(FontAwesomeIcon, { icon: faTrash }) }))] }))] })));
                    }) }))] })));
};
export default Collapsible;
