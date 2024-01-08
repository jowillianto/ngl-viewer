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
import { useContext, useEffect, useState } from 'react';
import * as NGL from 'ngl';
import StageContext from '../stage-context';
import StructureComponentContext from '../context/component-context';
var NGLFile = function (_a) {
    var file = _a.file, viewSettings = _a.viewSettings, fileSettings = _a.fileSettings, controls = _a.controls, chains = _a.chains, children = _a.children;
    var stageContext = useContext(StageContext);
    var _b = useState({
        showRepr: true,
        component: null,
        update: false,
    }), state = _b[0], setState = _b[1];
    var loadFileToStage = function () {
        var stage = stageContext.stage;
        if (stage && file) {
            var fileExtension_1 = (fileSettings === null || fileSettings === void 0 ? void 0 : fileSettings.ext)
                ? fileSettings.ext
                : file instanceof File
                    ? file.name.split('.').pop()
                    : '';
            removeComponentIfExist();
            stage.loadFile(file, fileSettings)
                .then(function (component) {
                var comp = component;
                if (comp) {
                    if (fileExtension_1 === 'pdb') {
                        // let compChains  = [] as [string, string][]
                        // comp.structure.eachChain((cp: any) => {
                        //   le`t name = cp.chainname
                        //   let val = `:${name}`
                        //   compChains.push([cp.chainname, val])
                        // }, new NGL.Selection("polymer"))
                        comp.addRepresentation("cartoon", {
                            visible: false,
                            colorScheme: "atomindex",
                        });
                        comp.addRepresentation("backbone", {
                            visible: false,
                            colorScheme: "atomindex",
                            radiusScale: 1.2
                        });
                        comp.addRepresentation("spacefill", {
                            visible: false,
                            colorScheme: "atomindex",
                        });
                        comp.addRepresentation("licorice", {
                            visible: false,
                            colorScheme: "atomindex",
                            radiusScale: 1
                        });
                        comp.addRepresentation("line", {
                            visible: false,
                            colorScheme: "atomindex",
                            multipleBond: "symmetric",
                        });
                        comp.addRepresentation("ball+stick", {
                            visible: true,
                            colorScheme: "atomindex",
                            multipleBond: "symmetric",
                        });
                        comp.addRepresentation("surface", {
                            colorScheme: "electrostatic",
                            sele: 'polymer',
                            opacity: 0.5,
                            colorDomain: [-80, 80],
                            surfaceType: 'av',
                            visible: false
                        });
                        comp.addRepresentation("contact", {
                            radiusSize: 0.07,
                            weakHydrogenBond: false,
                            waterHydrogenBond: false,
                            backboneHydrogenBond: false,
                            hydrogenBond: false,
                            ionicInteraction: false,
                            metalCoordination: false,
                            piStacking: false,
                            cationPi: false,
                            weakHalogenBond: false,
                        });
                        // if(chains){
                        //   comp.eachRepresentation((repr) => {
                        //     if (chains?.includes((repr.parameters as any).sele.slice(1))) {
                        //       repr.setVisibility(false);
                        //     }
                        //   }); 
                        // }
                    }
                    else if (fileExtension_1 === 'pdbqt') {
                        comp.addRepresentation("ball+stick", {
                            multipleBond: "symmetric",
                            colorValue: new NGL.Color('grey').getHex(),
                            sele: "(not polymer or not (protein or nucleic)) and chain L",
                            radiusScale: 1.3,
                            visible: true
                        });
                        comp.addRepresentation("contact", {
                            contactType: "residue",
                            atomRadius: 5,
                            scale: 1,
                            masterModel: 0,
                            sele: "(not polymer or not (protein or nucleic)) and chain L",
                            radiusSize: 0.07,
                            weakHydrogenBond: false,
                            waterHydrogenBond: false,
                            backboneHydrogenBond: false,
                            hydrogenBond: false,
                            ionicInteraction: false,
                            metalCoordination: false,
                            piStacking: false,
                            cationPi: false,
                            weakHalogenBond: false,
                        });
                    }
                    stage.autoView();
                    setState(function (prev) { return (__assign(__assign({}, prev), { component: comp, update: true })); });
                    stageContext.updateVersion();
                }
            })
                .catch(function (err) {
                console.error(err);
            });
        }
    };
    var removeComponentIfExist = function () {
        var component = state.component;
        var stage = stageContext.stage;
        if (stage && component)
            stage.removeComponent(component);
    };
    useEffect(function () {
        loadFileToStage();
    }, [file, viewSettings, fileSettings, controls, chains, stageContext.version]);
    useEffect(function () {
        if (state.update) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { update: false })); });
        }
    }, [state.update]);
    useEffect(function () {
        loadFileToStage();
        return function () {
            removeComponentIfExist();
        };
    }, []);
    return (_jsx(StructureComponentContext.Provider, __assign({ value: state }, { children: _jsx("div", __assign({ className: "file-controls" }, { children: children })) })));
};
export default NGLFile;
