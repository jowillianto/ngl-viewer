import React from 'react';
var StageContext = React.createContext({
    stage: null, setStage: function () { },
    version: 0,
    updateVersion: function () { },
});
export default StageContext;
