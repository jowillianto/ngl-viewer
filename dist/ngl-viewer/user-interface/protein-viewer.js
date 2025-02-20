import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import StageContext from "../stage-context";
var ProteinViewer = function (_a) {
    var children = _a.children;
    var _b = useState(null), stage = _b[0], setStage = _b[1];
    var updateStage = React.useCallback(function () {
        setStage(function (prevStage) {
            if (prevStage === null)
                return null;
            return prevStage.update();
        });
    }, []);
    var stageContext = React.useMemo(function () {
        return { stage: stage, setStage: setStage, updateStage: updateStage };
    }, [stage, setStage, updateStage]);
    return (_jsx(StageContext.Provider, { value: stageContext, children: children }));
};
export default ProteinViewer;
