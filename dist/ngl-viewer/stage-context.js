import React from "react";
var VersionedStage = /** @class */ (function () {
    function VersionedStage(stage, version) {
        if (version === void 0) { version = 0; }
        this.stage = stage;
        this.version = version;
    }
    VersionedStage.prototype.update = function () {
        if (this.version < 90000)
            return new VersionedStage(this.stage, this.version + 1);
        else
            return new VersionedStage(this.stage, 0);
    };
    return VersionedStage;
}());
export { VersionedStage };
var StageContext = React.createContext({
    stage: null,
    setStage: function () { },
    updateStage: function () { }
});
export function useStage() {
    var stage = React.useContext(StageContext).stage;
    if (stage === null)
        return null;
    return stage.stage;
}
export function useStageWithVersion() {
    var stage = React.useContext(StageContext).stage;
    if (stage === null)
        return null;
    return stage;
}
export default StageContext;
