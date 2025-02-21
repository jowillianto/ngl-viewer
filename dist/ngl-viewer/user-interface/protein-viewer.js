import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import StageContext from "../stage-context";
var ProteinViewer = function (_a) {
    var children = _a.children;
    var _b = useState(null), stage = _b[0], setStage = _b[1];
    var ctx = React.useMemo(function () {
        return { stage: stage, setStage: setStage };
    }, [stage, setStage]);
    return _jsx(StageContext.Provider, { value: ctx, children: children });
};
export default ProteinViewer;
