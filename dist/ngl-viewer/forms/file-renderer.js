import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import * as NGL from 'ngl';
var PDBViewer = function (_a) {
    var pdbData = _a.pdbData;
    var stageRef = useRef();
    useEffect(function () {
        if (!stageRef.current) {
            stageRef.current = new NGL.Stage('viewport');
        }
        // Clear any previous structures
        stageRef.current.removeAllComponents();
        // Load new PDB structure from uploaded data
        stageRef.current.loadFile(pdbData, { ext: 'pdb' }).then(function (component) {
            component.addRepresentation('cartoon');
            stageRef.current.autoView();
        });
        // Cleanup on unmount
        return function () {
            stageRef.current.dispose();
            stageRef.current = null;
        };
    }, [pdbData]);
    return _jsx("div", { id: "viewport", style: { width: '600px', height: '400px' } });
};
var FileUploader = function (_a) {
    var onFileRead = _a.onFileRead;
    var handleFileChange = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var content = (((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) || '');
            onFileRead(content);
        };
        reader.readAsText(file);
    };
    return _jsx("input", { type: "file", onChange: handleFileChange });
};
export default FileUploader;
