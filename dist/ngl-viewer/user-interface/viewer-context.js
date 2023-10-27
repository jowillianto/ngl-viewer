// types.ts
import React from "react";
var ViewerContext = React.createContext({
    components: [],
    addComponent: function () { },
    replaceComponent: function () { },
    removeComponent: function () { },
    addComponentByType: function () { },
    node: React.createRef()
});
export default ViewerContext;
