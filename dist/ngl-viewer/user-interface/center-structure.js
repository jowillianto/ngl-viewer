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
import { useStage } from "../stage-context";
var CenterStructure = function (_a) {
    var render = _a.render, props = _a.props;
    var stage = useStage();
    var centerStructure = function () {
        stage === null || stage === void 0 ? void 0 : stage.autoView();
    };
    var Component = render;
    var renderProps = __assign({ onClick: centerStructure }, props);
    return _jsx(Component, __assign({}, renderProps));
};
export default CenterStructure;
