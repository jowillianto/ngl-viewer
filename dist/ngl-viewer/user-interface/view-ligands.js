import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useEffect } from "react";
import StageContext from "../stage-context";
import * as NGL from 'ngl';
var ViewLigands = function () {
    var _a = useContext(StageContext), stage = _a.stage, version = _a.version;
    var _b = React.useState([]), ligands = _b[0], setLigands = _b[1];
    var _c = React.useState(null), component = _c[0], setComponent = _c[1];
    var _d = React.useState(0), opacity = _d[0], setOpacity = _d[1];
    var _e = React.useState(0), pocketRadius = _e[0], setPocketRadius = _e[1];
    var _f = React.useState(100), radius = _f[0], setRadius = _f[1];
    var _g = React.useState(0), near = _g[0], setNear = _g[1];
    useEffect(function () {
        var comp = stage === null || stage === void 0 ? void 0 : stage.compList[0];
        if (!comp)
            return;
        setComponent(comp);
        var ligandOptions = [["", "select ligand"]];
        comp.structure.eachResidue(function (rp) {
            if (rp.isWater())
                return;
            var sele = "";
            if (rp.resno !== undefined)
                sele += rp.resno;
            if (rp.inscode)
                sele += "^" + rp.inscode;
            if (rp.chain)
                sele += ":" + rp.chainname;
            var name = (rp.resname ? "[" + rp.resname + "]" : "") + sele;
            if (rp.entity.description)
                name += " (" + rp.entity.description + ")";
            ligandOptions.push([sele, name]);
        }, new NGL.Selection("( not polymer or not ( protein or nucleic ) ) and not ( water or ACE or NH2 )"));
        setLigands(ligandOptions);
        console.log(ligandOptions);
    }, [stage, version]);
    var showLigand = function (sele) {
        var s = component.structure;
        var withinSele = s.getAtomSetWithinSelection(new NGL.Selection(sele), 5);
        var withinGroup = s.getAtomSetWithinGroup(withinSele);
        var expandedSele = withinGroup.toSeleString();
        var neighborSele = expandedSele;
        var sview = s.getView(new NGL.Selection(sele));
        var pocketRadius1 = Math.max(sview.boundingBox.getSize().length() / 2, 2) + 5;
        setPocketRadius(pocketRadius1);
        var withinSele2 = s.getAtomSetWithinSelection(new NGL.Selection(sele), pocketRadius + 2);
        var neighborSele2 = "(" + withinSele2.toSeleString() + ") and not (" + sele + ") and polymer";
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "ball+stick") {
                repr.setParameters({ radiusScale: 0.8 });
                repr.setVisibility(true);
            }
            if (repr.parameters.name === "spacefill") {
                repr.setVisibility(false);
            }
            if (repr.parameters.name === "backbone") {
                repr.setParameters({ radiusScale: 0.8 });
                repr.setVisibility(true);
            }
            if (repr.parameters.name === "ball+stick" && repr.parameters.aspectRatio === 1.2) {
                repr.setVisibility(true);
                repr.setSelection(sele);
            }
            if (repr.parameters.name === "ball+stick" && repr.parameters.aspectRatio === 1.1) {
                repr.setVisibility(true);
                repr.setSelection("(" + neighborSele + ") and (sidechainAttached or not polymer)");
            }
            if (repr.parameters.name === "contact") {
                repr.setVisibility(true);
                repr.setSelection(expandedSele);
            }
            if (repr.parameters.name === "surface") {
                repr.setVisibility(true);
                repr.setSelection(neighborSele2);
                repr.setParameters({
                    clipRadius: pocketRadius * 1,
                    clipCenter: sview.center
                });
            }
            if (repr.parameters.name === "label") {
                repr.setVisibility(true);
            }
            repr.setSelection("(" + neighborSele + ") and not (water or ion)");
        });
        component.autoView(expandedSele, 2000);
    };
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
        setRadius(value);
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "surface") {
                repr.setParameters({ clipRadius: pocketRadius * pocketRadiusClipFactor });
            }
        });
    };
    var setNearFunction = function (value) {
        setNear(value);
        if (stage) {
            var sceneRadius = stage.viewer.boundingBox.getSize(new NGL.Vector3).length() / 2;
            var f = pocketRadius / sceneRadius;
            var v = value / 10000;
            var c = 0.5 - f / 2 + v * f;
            component.eachRepresentation(function (repr) {
                if (repr.parameters.name === "surface") {
                    repr.setParameters({ clipNear: c * 100 });
                }
            });
        }
    };
    var hydroPhobicFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ hydrophobic: e.target.checked });
            }
        });
    };
    var hydrogenBondFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ hydrogenBond: e.target.checked });
            }
        });
    };
    var weakHydrogenBondFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ weakHydrogenBond: e.target.checked });
            }
        });
    };
    var waterHydrogenBondFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ waterHydrogenBond: e.target.checked });
            }
        });
    };
    var backboneHydrogenBondFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ backboneHydrogenBond: e.target.checked });
            }
        });
    };
    var halogenBondFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ halogenBond: e.target.checked });
            }
        });
    };
    var metalComplexFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ metalComplex: e.target.checked });
            }
        });
    };
    var saltBridgeFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ saltBridge: e.target.checked });
            }
        });
    };
    var cationPiFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ cationPi: e.target.checked });
            }
        });
    };
    var piStackingFunction = function (e) {
        component.eachRepresentation(function (repr) {
            if (repr.parameters.name === "contact") {
                repr.setParameters({ piStacking: e.target.checked });
            }
        });
    };
    return (_jsxs("div", { children: [_jsx("select", { onChange: function (e) { return showLigand(e.target.value); }, children: ligands.map(function (ligand) {
                    return (_jsx("option", { value: ligand[0], children: ligand[1] }, ligand[0]));
                }) }), _jsxs("div", { children: [_jsx("span", { children: "pocket opacity" }), _jsx("input", { type: "range", value: opacity, min: 0, max: 100, step: 1, onChange: function (e) { return setOpacityFunction(parseFloat(e.target.value)); } })] }), _jsxs("div", { children: [_jsx("span", { children: "pocket radius clipping" }), _jsx("input", { type: "range", value: radius, min: 0, max: 100, step: 1, onChange: function (e) { return setRadiusFunction(parseFloat(e.target.value)); } })] }), _jsxs("div", { children: [_jsx("span", { children: "pocket near clipping" }), _jsx("input", { type: "range", value: near, min: 0, max: 10000, step: 1, onChange: function (e) { return setNearFunction(parseFloat(e.target.value)); } })] }), _jsxs("div", { children: [_jsx("span", { children: "hydrophobic" }), _jsx("input", { type: "checkbox", onChange: hydroPhobicFunction })] }), _jsxs("div", { children: [_jsx("span", { children: "hydrogen bond" }), _jsx("input", { type: "checkbox", onChange: hydrogenBondFunction })] })] }));
};
export default ViewLigands;
