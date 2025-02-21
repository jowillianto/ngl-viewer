import React from "react";
var StageContext = React.createContext({
    stage: null,
    setStage: function () { },
});
export function useStage() {
    var stage = React.useContext(StageContext).stage;
    if (stage === null)
        return null;
    return stage;
}
export default StageContext;
