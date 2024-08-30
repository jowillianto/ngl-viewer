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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useEffect } from "react";
import StageContext from "../stage-context";
import * as NGL from "ngl";
var interactions = {
    hydrophobic: "hydrophobic",
    hbond: "hydrogenBond",
    "weak hbond": "weakHydrogenBond",
    "water-water hbon": "waterHydrogenBond",
    "backbone-backbone hbond": "backboneHydrogenBond",
    "halogen bond": "halogenBond",
    "metal interaction": "metalComplex",
    "salt bridge": "saltBridge",
    "cation-pi": "cationPi",
    "pi-stacking": "piStacking",
};
var ViewLigands = function () {
    var stage = useContext(StageContext).stage;
    var _a = React.useState(null), component = _a[0], setComponent = _a[1];
    var _b = React.useState(0), opacity = _b[0], setOpacity = _b[1];
    var _c = React.useState(0), pocketRadius = _c[0], setPocketRadius = _c[1];
    var _d = React.useState(100), radius = _d[0], setRadius = _d[1];
    var _e = React.useState(0), near = _e[0], setNear = _e[1];
    var _f = React.useState([]), ligandComps = _f[0], setLigandComps = _f[1];
    var _g = React.useState(null), concatComp = _g[0], setConcatComp = _g[1];
    var _h = React.useState({}), ligandsParams = _h[0], setLigandsParams = _h[1];
    useEffect(function () {
        var comp = stage === null || stage === void 0 ? void 0 : stage.compList[0];
        if (!comp)
            return;
        setComponent(comp);
        var ligandComponents = stage === null || stage === void 0 ? void 0 : stage.compList.slice(1);
        setLigandComps(ligandComponents);
    }, [stage]);
    var setOpacityFunction = function (value) {
        setOpacity(value);
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "surface") {
                repr.setParameters({ opacity: value / 100 });
            }
        });
    };
    var setRadiusFunction = function (value) {
        var pocketRadiusClipFactor = value / 100;
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "surface") {
                repr.setParameters({
                    clipRadius: pocketRadius * pocketRadiusClipFactor,
                });
            }
        });
        setRadius(value);
    };
    var setNearFunction = function (value) {
        if (stage) {
            var sceneRadius = stage.viewer.boundingBox.getSize(new NGL.Vector3()).length() / 2;
            var f = pocketRadius / sceneRadius;
            var v = value / 10000;
            var c_1 = 0.5 - f / 2 + v * f;
            component.eachRepresentation(function (repr) {
                if (repr.parameters.name === "surface") {
                    repr.setParameters({ clipNear: c_1 * 100 });
                }
            });
            setNear(value);
        }
    };
    var updateInteractionParameter = function (parameterName, e) {
        component === null || component === void 0 ? void 0 : component.eachRepresentation(function (repr) {
            var _a;
            if (repr.parameters.name === "contact") {
                var updatedParameters = (_a = {}, _a[parameterName] = e.target.checked, _a);
                repr.setParameters(updatedParameters);
            }
        });
        ligandComps.forEach(function (ligandComp) {
            ligandComp.eachRepresentation(function (repr) {
                var _a;
                if (repr.parameters.name === "contact") {
                    var updatedParameters = (_a = {}, _a[parameterName] = e.target.checked, _a);
                    repr.setParameters(updatedParameters);
                }
            });
        });
    };
    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        var excludedColors = [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFFFF",
            "#808080",
        ];
        do {
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        } while (excludedColors.includes(color));
        return color;
    }
    var showLigandWithProtein = function () {
        var ligandLength = ligandComps.length;
        var proteinComp = component;
        var concatStructures = ligandComps.map(function (ligandComp) {
            return ligandComp.structure;
        });
        concatStructures.unshift(proteinComp.structure);
        var newObj = NGL.concatStructures.apply(NGL, __spreadArray(["concat"], concatStructures, false));
        var concatComp = stage === null || stage === void 0 ? void 0 : stage.addComponentFromObject(newObj);
        setConcatComp(concatComp);
        var comp = stage === null || stage === void 0 ? void 0 : stage.addComponentFromObject(concatComp.structure);
        if (!comp)
            return;
        stage === null || stage === void 0 ? void 0 : stage.removeComponent(proteinComp);
        ligandComps.forEach(function (ligandComp) {
            stage === null || stage === void 0 ? void 0 : stage.removeComponent(ligandComp);
        });
        comp.removeAllRepresentations();
        var ligandsParamsTemp = {};
        ligandComps.forEach(function (ligandComp, index) {
            var pocketRadius = 5;
            var withinPocketSele = concatComp.structure.getAtomSetWithinSelection(new NGL.Selection("/".concat(index + 1)), pocketRadius + 2);
            var pocketSele = "(".concat(withinPocketSele.toSeleString(), ") and not (").concat(index + 1, ") and polymer)");
            // get all the atoms within 5 angstroms of the ligand together with the ligand
            var withinSele = concatComp.structure.getAtomSetWithinSelection(new NGL.Selection("/".concat(index + 1)), 5);
            // get all the atoms within 5 angstroms of the ligand without ligands
            var filteredWithinSele = withinSele;
            ligandComps.forEach(function (ligandComp2, index2) {
                // filter out the ligand atoms
                var onlySele = concatComp.structure.getAtomSetWithinSelection(new NGL.Selection("/".concat(index2 + 1)), 0);
                filteredWithinSele = filteredWithinSele.difference(onlySele);
            });
            // get the atom set within 5 angstroms of the ligand without the ligand atoms
            var withinGroup = concatComp.structure.getAtomSet(filteredWithinSele);
            var contactGroup = concatComp.structure.getAtomSet(withinSele);
            // get the sele strings
            var neighborSele = withinGroup.toSeleString();
            var contactSele = contactGroup.toSeleString();
            var ligandParam = {
                visibility: true,
                sele: "/".concat(index + 1),
                neighborSele: neighborSele,
                name: ligandComp.name,
                contactSele: contactSele,
                pocketSele: pocketSele,
            };
            ligandsParamsTemp["/".concat(index + 1)] = ligandParam;
        });
        for (var i = 1; i <= ligandLength; i++) {
            var sview = concatComp.structure.getView(new NGL.Selection("/".concat(i)));
            var ligandRepr = comp.addRepresentation("ball+stick", {
                multipleBond: "symmetric",
                colorValue: getRandomColor(),
                sele: "/".concat(i),
                aspectRatio: 1.5,
                radiusScale: 1.5,
            });
            var contactRepr = comp.addRepresentation("contact", {
                masterModelIndex: 0,
                weakHydrogenBond: true,
                hydrogenBond: true,
                hydrophobic: true,
                backboneHydrogenBond: true,
                metalComplex: true,
                piStacking: true,
                halogenBond: true,
                saltBridge: true,
                cationPi: true,
                waterHydrogenBond: true,
                maxHbondDonPlaneAngle: 35,
                sele: ligandsParamsTemp["/".concat(i)].contactSele,
            });
            var neighborRepr = comp.addRepresentation("ball+stick", {
                sele: ligandsParamsTemp["/".concat(i)].neighborSele,
                aspectRatio: 1.1,
                colorValue: "lightgrey",
                multipleBond: "symmetric",
            });
            var labelRepr = comp.addRepresentation("label", {
                sele: ligandsParamsTemp["/".concat(i)].neighborSele,
                color: "#333333",
                yOffset: 0.2,
                zOffset: 2.0,
                attachment: "bottom-center",
                showBorder: true,
                borderColor: "lightgrey",
                borderWidth: 0.25,
                disablePicking: true,
                radiusType: "size",
                radiusSize: 0.8,
                labelType: "residue",
                labelGrouping: "residue",
            });
            // let pocketRepr = comp.addRepresentation("surface", {
            //   sele: ligandsParamsTemp[`/${i}`].pocketSele,
            //   lazy: true,
            //   visibility: true,
            //   clipNear: 0,
            //   opaqueBack: false,
            //   opacity: 0.5,
            //   color: "hydrophobicity",
            //   roughness: 1.0,
            //   surfaceType: "av",
            //   clipRadius: pocketRadius * 0.5,
            //   clipCenter: sview.center,
            // })
        }
        setLigandsParams(ligandsParamsTemp);
        var backboneRepr = comp.addRepresentation("backbone", {
            visible: true,
            colorValue: "lightgrey",
            radiusScale: 0.5,
        });
        var surfaceRepr = comp.addRepresentation("surface", {
            lazy: true,
            visibility: true,
            clipNear: 0,
            opaqueBack: false,
            opacity: 0.5,
            roughness: 1.0,
            surfaceType: "av",
            clipRadius: pocketRadius * 0.5,
            colorScheme: "electrostatic",
            sele: "polymer",
            colorDomain: [-80, 80],
        });
        var cartoonRepr = comp.addRepresentation("cartoon", {
            visible: true,
        });
        stage === null || stage === void 0 ? void 0 : stage.autoView();
        setComponent(comp);
    };
    var toggleLigand = function (e, ligandStructure) {
        var _a;
        var ligandsParamsTemp = __assign(__assign({}, ligandsParams), (_a = {}, _a[ligandStructure.sele] = __assign(__assign({}, ligandsParams[ligandStructure.sele]), { visibility: !ligandsParams[ligandStructure.sele].visibility }), _a));
        setLigandsParams(ligandsParamsTemp);
        var proteinAndLigandsComp = stage === null || stage === void 0 ? void 0 : stage.compList[1];
        if (!proteinAndLigandsComp)
            return;
        proteinAndLigandsComp === null || proteinAndLigandsComp === void 0 ? void 0 : proteinAndLigandsComp.eachRepresentation(function (repr) {
            if (repr.parameters.sele === ligandStructure.sele) {
                repr.setVisibility(e.target.checked);
            }
            if (repr.parameters.sele === ligandStructure.neighborSele) {
                repr.setVisibility(e.target.checked);
            }
        });
    };
    var proteinReprChange = function (e, name, sele) {
        var mycomp = stage === null || stage === void 0 ? void 0 : stage.compList[1];
        if (!mycomp)
            return;
        mycomp === null || mycomp === void 0 ? void 0 : mycomp.eachRepresentation(function (repr) {
            if (sele) {
                if (repr.parameters.name === name && repr.parameters.sele === sele) {
                    repr.setVisibility(e.target.checked);
                }
            }
            else {
                if (repr.parameters.name === name) {
                    repr.setVisibility(e.target.checked);
                }
            }
        });
    };
    return (_jsxs("div", { children: [_jsxs("div", { children: [_jsx("span", { children: "pocket opacity" }), _jsx("input", { type: "range", value: opacity, min: 0, max: 100, step: 1, onChange: function (e) { return setOpacityFunction(parseFloat(e.target.value)); } })] }), _jsxs("div", { children: [_jsx("span", { children: "pocket radius clipping" }), _jsx("input", { type: "range", value: radius, min: 0, max: 100, step: 1, onChange: function (e) { return setRadiusFunction(parseFloat(e.target.value)); } })] }), _jsxs("div", { children: [_jsx("span", { children: "pocket near clipping" }), _jsx("input", { type: "range", value: near, min: 0, max: 10000, step: 1, onChange: function (e) { return setNearFunction(parseFloat(e.target.value)); } })] }), _jsxs("div", { children: [_jsx("span", { children: "hydrophobic" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["hydrophobic"], e);
                        } })] }), _jsxs("div", { children: [_jsx("span", { children: "hydrogen bond" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["hydrogen bond"], e);
                        } })] }), _jsxs("div", { children: [_jsx("span", { children: "weak hbond" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["weak hbond"], e);
                        } })] }), _jsxs("div", { children: [_jsx("span", { children: "backbone-backbone hbond" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["backbone-backbone hbond"], e);
                        } })] }), _jsxs("div", { children: [_jsx("span", { children: "halogen bond" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["halogen bond"], e);
                        } })] }), _jsxs("div", { children: [_jsx("span", { children: "metal interaction" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["metal interaction"], e);
                        } })] }), _jsxs("div", { children: [_jsx("span", { children: "salt bridge" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["salt bridge"], e);
                        } })] }), _jsxs("div", { children: [_jsx("span", { children: "cation-pi" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["cation-pi"], e);
                        } })] }), _jsxs("div", { children: [_jsx("span", { children: "pi-stacking" }), _jsx("input", { type: "checkbox", onChange: function (e) {
                            return updateInteractionParameter(interactions["pi-stacking"], e);
                        } })] }), _jsx("div", { children: _jsx("button", { onClick: showLigandWithProtein, children: "show interaction" }) }), _jsx("div", { children: Object.values(ligandsParams).map(function (ligandParam) {
                    return (_jsxs("div", { children: [_jsx("label", { children: ligandParam.name }), _jsx("input", { type: "checkbox", checked: ligandParam.visibility, onChange: function (e) { return toggleLigand(e, ligandParam); } })] }, ligandParam.name));
                }) }), _jsxs("div", { children: [_jsxs("div", { children: [_jsx("label", { children: "backbone" }), _jsx("input", { type: "checkbox", onChange: function (e) { return proteinReprChange(e, "backbone"); } })] }), _jsxs("div", { children: [_jsx("label", { children: "cartoon" }), _jsx("input", { type: "checkbox", onChange: function (e) { return proteinReprChange(e, "cartoon"); } })] }), _jsxs("div", { children: [_jsx("label", { children: "surface" }), _jsx("input", { type: "checkbox", onChange: function (e) { return proteinReprChange(e, "surface", "polymer"); } })] })] })] }));
};
export default ViewLigands;
