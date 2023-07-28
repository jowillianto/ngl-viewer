import { jsx as _jsx } from "react/jsx-runtime";
import NGLRenderer from './ngl-renderer';
import GenericRenderer from './generic-renderer';
var ViewerStage = function (props) {
    return (_jsx(GenericRenderer, { render: NGLRenderer, props: props }));
};
export default ViewerStage;
