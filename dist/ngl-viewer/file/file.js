var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import * as NGL from 'ngl';
import StageContext from '../stage-context';
import StructureComponentContext from '../context/component-context';
var NGLFile = /** @class */ (function (_super) {
    __extends(NGLFile, _super);
    function NGLFile(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showRepr: true,
            component: null,
            update: false
        };
        return _this;
    }
    NGLFile.prototype.loadFileToStage = function () {
        var _this = this;
        var stage = this.context.stage;
        var file = this.props.file;
        if (stage && file && !this.state.update) {
            this.removeComponentIfExist();
            stage.loadFile(file, this.props.fileSettings)
                .then(function (component) {
                var comp = component;
                if (comp) {
                    var compChains_1 = [];
                    comp.structure.eachChain(function (cp) {
                        var name = cp.chainname;
                        var val = ":".concat(name);
                        compChains_1.push([cp.chainname, val]);
                    }, new NGL.Selection("polymer"));
                    compChains_1.forEach(function (chain) {
                        comp.addRepresentation("cartoon", { sele: chain[1] });
                        comp.addRepresentation("backbone", {
                            visible: false,
                            colorValue: new NGL.Color('lightgrey').getHex(),
                            radiusScale: 2
                        });
                        comp.addRepresentation("spacefill", {
                            sele: "( not polymer or not ( protein or nucleic ) ) and not ( water or ACE or NH2 )",
                            visible: false
                        });
                        comp.addRepresentation("ball+stick", {
                            sele: "none",
                            aspectRatio: 1.1,
                            colorValue: new NGL.Color('lightgrey').getHex(),
                            multipleBond: "symmetric"
                        });
                        comp.addRepresentation("ball+stick", {
                            multipleBond: "symmetric",
                            colorValue: new NGL.Color('grey').getHex(),
                            sele: "none",
                            aspectRatio: 1.2,
                            radiusScale: 2.5
                        });
                        comp.addRepresentation("contact", {
                            sele: "none",
                            radiusSize: 0.07,
                            weakHydrogenBond: false,
                            waterHydrogenBond: false,
                            backboneHydrogenBond: true
                        });
                        comp.addRepresentation("surface", {
                            sele: "none",
                            lazy: true,
                            visibility: true,
                            clipNear: 0,
                            opaqueBack: false,
                            opacity: 0.0,
                            color: "hydrophobicity",
                            roughness: 1.0,
                            surfaceType: "av"
                        });
                        comp.addRepresentation("label", {
                            sele: "none",
                            color: "#333333",
                            yOffset: 0.2,
                            zOffset: 2.0,
                            attachment: "bottom-center",
                            showBorder: true,
                            borderColor: new NGL.Color('lightgrey').getHex(),
                            borderWidth: 0.25,
                            disablePicking: true,
                            radiusType: "size",
                            radiusSize: 0.8,
                            labelType: "residue",
                            labelGrouping: "residue"
                        });
                    });
                    if (_this.props.chains) {
                        comp.eachRepresentation(function (repr) {
                            var _a;
                            if (!((_a = _this.props.chains) === null || _a === void 0 ? void 0 : _a.includes(repr.parameters.sele.slice(1)))) {
                                repr.setVisibility(false);
                            }
                        });
                    }
                    stage.autoView();
                    _this.setState({
                        component: component, update: true
                    }, function () { return _this.setState({ update: false }); });
                    _this.context.updateVersion();
                }
            })
                .catch(function (err) {
                console.error(err);
            });
        }
    };
    NGLFile.prototype.compareState = function (nextState) {
        return nextState.update;
    };
    NGLFile.prototype.removeComponentIfExist = function () {
        var stage = this.context.stage;
        var component = this.state.component;
        if (stage && component)
            stage.removeComponent(component);
    };
    NGLFile.prototype.componentDidMount = function () {
        this.loadFileToStage();
    };
    NGLFile.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        var diffFile = this.props.file !== nextProps.file;
        var diffSettings = this.props.viewSettings !== nextProps.viewSettings;
        var diffStage = this.context.stage !== nextContext.stage;
        var diffState = this.compareState(nextState);
        return diffFile || diffSettings || diffStage || diffState;
    };
    NGLFile.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.chains !== this.props.chains) {
            this.loadFileToStage();
        }
    };
    NGLFile.prototype.componentWillUnmount = function () {
        this.removeComponentIfExist();
    };
    NGLFile.prototype.render = function () {
        return (_jsx(StructureComponentContext.Provider, { value: this.state, children: _jsx("div", { className: 'file-controls', children: this.props.children }) }));
    };
    NGLFile.contextType = StageContext;
    return NGLFile;
}(React.Component));
export default NGLFile;
