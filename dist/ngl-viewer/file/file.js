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
var NGLFile = function (props) {
    var stageContext = useContext(StageContext);
    var _a = useState({
        showRepr: true,
        component: null,
        update: false,
    }), state = _a[0], setState = _a[1];
    var loadFileToStage = function () {
        var _a;
        var stage = stageContext.stage;
        if (stage && props.file && !state.update) {
            var fileExtension_1 = ((_a = props.fileSettings) === null || _a === void 0 ? void 0 : _a.ext)
                ? props.fileSettings.ext
                : props.file instanceof File
                    ? props.file.name.split('.').pop()
                    : '';
            removeComponentIfExist();
            stage.loadFile(props.file, props.fileSettings)
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
                        // if(props.chains){
                        //   comp.eachRepresentation((repr) => {
                        //     if (props.chains?.includes((repr.parameters as any).sele.slice(1))) {
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
    }, [props]);
    useEffect(function () {
        if (state.update) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { update: false })); });
        }
    }, [state.update]);
    useEffect(function () {
        return function () {
            removeComponentIfExist();
        };
    }, []);
    return (_jsx(StructureComponentContext.Provider, __assign({ value: state }, { children: _jsx("div", __assign({ className: "file-controls" }, { children: props.children })) })));
};
export default NGLFile;
