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
        var _a;
        var stage = this.context.stage;
        var file = this.props.file;
        if (stage && file && !this.state.update) {
            var fileExtension_1 = ((_a = this.props.fileSettings) === null || _a === void 0 ? void 0 : _a.ext) ?
                this.props.fileSettings.ext :
                file instanceof File ? file.name.split('.').pop() : '';
            this.removeComponentIfExist();
            stage.loadFile(file, this.props.fileSettings)
                .then(function (component) {
                var comp = component;
                if (comp) {
                    if (fileExtension_1 === 'pdb') {
                        // let compChains = [] as [string, string][]
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
                        if (_this.props.chains) {
                            comp.eachRepresentation(function (repr) {
                                var _a;
                                if (!((_a = _this.props.chains) === null || _a === void 0 ? void 0 : _a.includes(repr.parameters.sele.slice(1)))) {
                                    repr.setVisibility(false);
                                }
                            });
                        }
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
        return (_jsx(StructureComponentContext.Provider, __assign({ value: this.state }, { children: _jsx("div", __assign({ className: 'file-controls' }, { children: this.props.children })) })));
    };
    NGLFile.contextType = StageContext;
    return NGLFile;
}(React.Component));
export default NGLFile;
