import React, { useContext, useEffect } from "react";
import StageContext from "../stage-context";
import * as NGL from 'ngl'
const interactions: Record<string, string> = {
  'hydrophobic': 'hydrophobic',
  'hbond': 'hydrogenBond',
  'weak hbond': 'weakHydrogenBond',
  'water-water hbon': 'waterHydrogenBond',
  'backbone-backbone hbond': 'backboneHydrogenBond',
  'halogen bond': 'halogenBond',
  'metal interaction': 'metalComplex',
  'salt bridge': 'saltBridge',
  'cation-pi': 'cationPi',
  'pi-stacking': 'piStacking',
};
type ligandParamsT = {
  visibility: boolean,
  sele: string,
  neighborSele: string,
  name: string,
  contactSele: string,
  pocketSele: string
}
const ViewLigands = <T,>() => {
  const { stage, version } = useContext(StageContext);

  const [component, setComponent] = React.useState(null as any)
  const [opacity, setOpacity] = React.useState<number>(0);
  const [pocketRadius, setPocketRadius] = React.useState<number>(0);
  const [radius, setRadius] = React.useState<number>(100);
  const [near, setNear] = React.useState<number>(0);

  const [ligandComps, setLigandComps] = React.useState([] as any[])
  const [concatComp, setConcatComp] = React.useState(null as any);
  const [ligandsParams, setLigandsParams] = React.useState<Record<string, ligandParamsT>>({});

  useEffect(() => {
    const comp = stage?.compList[0] as NGL.StructureComponent;
    if(!comp) return
    setComponent(comp)
    const ligandComponents = stage?.compList.slice(1) as NGL.StructureComponent[];
    setLigandComps(ligandComponents)
  }, [stage, version])

  const setOpacityFunction = (value: number) => {
    setOpacity(value)
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "surface"){
        repr.setParameters({ opacity: value / 100 })
      }
    });
  }
  const setRadiusFunction = (value: number) => {
    let pocketRadiusClipFactor = value / 100
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "surface"){
        repr.setParameters({ clipRadius: pocketRadius * pocketRadiusClipFactor })
      }
    });
    setRadius(value)
  }
  const setNearFunction = (value: number) => {
    if(stage){
      let sceneRadius = stage.viewer.boundingBox.getSize(new NGL.Vector3).length() / 2

      let f = pocketRadius / sceneRadius
      let v = value / 10000
      let c = 0.5 - f / 2 + v * f

      component.eachRepresentation((repr: any) => {
        if(repr.parameters.name === "surface"){
          repr.setParameters({ clipNear: c * 100 })
        }
      });
      
      setNear(value)
    }
  }
  const updateInteractionParameter = (parameterName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    component?.eachRepresentation((repr: any) => {
      if (repr.parameters.name === 'contact') {
        const updatedParameters = { [parameterName]: e.target.checked };
        repr.setParameters(updatedParameters);
      }
    });
    ligandComps.forEach((ligandComp) => {
      ligandComp.eachRepresentation((repr: any) => {
        if (repr.parameters.name === 'contact') {
          const updatedParameters = { [parameterName]: e.target.checked };
          repr.setParameters(updatedParameters);
        }
      })
    })
  };
  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    const excludedColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#808080'];

    do {
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    } while (excludedColors.includes(color));

    return color;
  }
  const showLigandWithProtein = () => {
    let ligandLength = ligandComps.length
    let proteinComp = component as NGL.StructureComponent

    let concatStructures = ligandComps.map((ligandComp) => {return ligandComp.structure}) as NGL.Structure[]
    concatStructures.unshift(proteinComp.structure)
    
    let newObj = NGL.concatStructures('concat', ...concatStructures)
    let concatComp = stage?.addComponentFromObject(newObj) as NGL.StructureComponent
    setConcatComp(concatComp)
    let comp = stage?.addComponentFromObject(concatComp.structure)
    if(!comp) return

    stage?.removeComponent(proteinComp)
    ligandComps.forEach((ligandComp) => {
      stage?.removeComponent(ligandComp)
    })
    comp.removeAllRepresentations();
    
    let ligandsParamsTemp = {} as Record<string, ligandParamsT>
    ligandComps.forEach((ligandComp, index) => {

      let pocketRadius = 5
      let withinPocketSele = concatComp.structure.getAtomSetWithinSelection(new NGL.Selection(`/${index+1}`), pocketRadius + 2)
      let pocketSele = `(${withinPocketSele.toSeleString()}) and not (${index+1}) and polymer)`

      // get all the atoms within 5 angstroms of the ligand together with the ligand
      let withinSele = concatComp.structure.getAtomSetWithinSelection(new NGL.Selection(`/${index+1}`), 5)
      // get all the atoms within 5 angstroms of the ligand without ligands
      let filteredWithinSele = withinSele
      ligandComps.forEach((ligandComp2, index2) => {
        // filter out the ligand atoms
        let onlySele = concatComp.structure.getAtomSetWithinSelection(new NGL.Selection(`/${index2+1}`), 0)
        filteredWithinSele = filteredWithinSele.difference(onlySele)
      })
      // get the atom set within 5 angstroms of the ligand without the ligand atoms
      let withinGroup = concatComp.structure.getAtomSet(filteredWithinSele)
      let contactGroup = concatComp.structure.getAtomSet(withinSele)
      // get the sele strings
      let neighborSele = withinGroup.toSeleString()
      let contactSele = contactGroup.toSeleString()
      let ligandParam = {
        visibility: true,
        sele: `/${index + 1}`,
        neighborSele: neighborSele,
        name: ligandComp.name,
        contactSele: contactSele,
        pocketSele: pocketSele
      }
      ligandsParamsTemp[`/${index + 1}`] = ligandParam
    })

    for(let i = 1; i <= ligandLength; i++){
      let sview = concatComp.structure.getView(new NGL.Selection(`/${i}`))

      let ligandRepr = comp.addRepresentation("ball+stick", {
        multipleBond: "symmetric",
        colorValue: getRandomColor(),
        sele: `/${i}`,
        aspectRatio: 1.5,
        radiusScale: 1.5
      })
      let contactRepr = comp.addRepresentation("contact", {
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
        sele: ligandsParamsTemp[`/${i}`].contactSele,
        
      })
      let neighborRepr = comp.addRepresentation("ball+stick", {
        sele: ligandsParamsTemp[`/${i}`].neighborSele,
        aspectRatio: 1.1,
        colorValue: "lightgrey",
        multipleBond: "symmetric"
      })
      let labelRepr = comp.addRepresentation("label", {
        sele: ligandsParamsTemp[`/${i}`].neighborSele,
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
        labelGrouping: "residue"
      })
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

    let backboneRepr = comp.addRepresentation("backbone", {
      visible: true,
      colorValue: "lightgrey",
      radiusScale: 0.5
    })
    let surfaceRepr = comp.addRepresentation("surface", {
      lazy: true,
      visibility: true,
      clipNear: 0,
      opaqueBack: false,
      opacity: 0.5,
      roughness: 1.0,
      surfaceType: "av",
      clipRadius: pocketRadius * 0.5,
      colorScheme: "electrostatic",
      sele : 'polymer', 
      colorDomain : [-80, 80], 
    })
    let cartoonRepr = comp.addRepresentation("cartoon", {
      visible: true,
    })
    stage?.autoView()
    setComponent(comp)
  }
  const toggleLigand = (e: React.ChangeEvent<HTMLInputElement>, ligandStructure: ligandParamsT) => {
    const ligandsParamsTemp = {
      ...ligandsParams,
      [ligandStructure.sele]: {
        ...ligandsParams[ligandStructure.sele],
        visibility: !ligandsParams[ligandStructure.sele].visibility,
      },
    } as Record<string, ligandParamsT>;
    setLigandsParams(ligandsParamsTemp);

    let proteinAndLigandsComp = stage?.compList[1] as NGL.StructureComponent
    if(!proteinAndLigandsComp) return
    
    proteinAndLigandsComp?.eachRepresentation((repr: any) => {
      if(repr.parameters.sele === ligandStructure.sele){
        repr.setVisibility(e.target.checked)
      }
      if(repr.parameters.sele === ligandStructure.neighborSele){
        repr.setVisibility(e.target.checked)
      }
    })
  }

  const proteinReprChange = (e: React.ChangeEvent<HTMLInputElement>, name: string, sele?: string) => {
    let mycomp = stage?.compList[1] as NGL.StructureComponent
    if(!mycomp) return
    mycomp?.eachRepresentation((repr: any) => {
      if(sele){
        if(repr.parameters.name === name && repr.parameters.sele === sele){
          repr.setVisibility(e.target.checked)
        }
      }
      else{
        if(repr.parameters.name === name){
          repr.setVisibility(e.target.checked)
        }
      }
    })
  }
  return(
    <div>
      <div>
        <span>
          pocket opacity
        </span>
        <input
          type="range"
          value={opacity}
          min={0}
          max={100}
          step={1}
          onChange={(e) => setOpacityFunction(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <span>
          pocket radius clipping
        </span>
        <input
          type="range"
          value={radius}
          min={0}
          max={100}
          step={1}
          onChange={(e) => setRadiusFunction(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <span>
          pocket near clipping
        </span>
        <input
          type="range"
          value={near}
          min={0}
          max={10000}
          step={1}
          onChange={(e) => setNearFunction(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <span>
          hydrophobic
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["hydrophobic"], e)}
        />
      </div>
      <div>
        <span>
          hydrogen bond
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["hydrogen bond"], e)}
        />
      </div>
      <div>
        <span>
        weak hbond
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["weak hbond"], e)}
        />
      </div>
      <div>
        <span>
        backbone-backbone hbond
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["backbone-backbone hbond"], e)}
        />
      </div>
      <div>
        <span>
        halogen bond
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["halogen bond"], e)}
        />
      </div>
      <div>
        <span>
        metal interaction
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["metal interaction"], e)}
        />
      </div>
      <div>
        <span>
        salt bridge
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["salt bridge"], e)}
        />
      </div>
      <div>
        <span>
        cation-pi
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["cation-pi"], e)}
        />
      </div>
      <div>
        <span>
        pi-stacking
        </span>
        <input
          type="checkbox"
          onChange={(e) => updateInteractionParameter(interactions["pi-stacking"], e)}
        />
      </div>
      <div>
        <button onClick={showLigandWithProtein}>show interaction</button>
      </div>
      <div>
        {Object.values(ligandsParams).map((ligandParam) => {
          return(
            <div key={ligandParam.name}>
              <label>{ligandParam.name}</label>
              <input type="checkbox" checked={ligandParam.visibility} onChange={(e)=>toggleLigand(e, ligandParam)}/>
            </div>
          )
        })}
      </div>
      <div>
        <div>
          <label>backbone</label>
          <input type="checkbox" onChange={(e)=>proteinReprChange(e, "backbone")}/>
        </div>
        <div>
          <label>cartoon</label>
          <input type="checkbox" onChange={(e)=>proteinReprChange(e, "cartoon")}/>
        </div>
        <div>
          <label>surface</label>
          <input type="checkbox" onChange={(e)=>proteinReprChange(e, "surface", "polymer")}/>
        </div>
      </div>
    </div> 
  );
};


export default ViewLigands;
