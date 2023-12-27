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
const ViewLigands = <T,>() => {
  const { stage, version } = useContext(StageContext);
  const [ligands, setLigands] = React.useState([] as string[][])
  const [component, setComponent] = React.useState(null as any)
  const [opacity, setOpacity] = React.useState<number>(0);
  const [pocketRadius, setPocketRadius] = React.useState<number>(0);
  const [radius, setRadius] = React.useState<number>(100);
  const [near, setNear] = React.useState<number>(0);
  const [ligandComps, setLigandComps] = React.useState([] as any[])
  const [ligandStructuresLocal, setLigandStructuresLocal] = React.useState([] as any[])
  const [concatComp, setConcatComp] = React.useState(null as any);
  useEffect(() => {
    const comp = stage?.compList[0] as NGL.StructureComponent;
    if(!comp) return
    setComponent(comp)
    const ligandComponents = stage?.compList.slice(1) as NGL.StructureComponent[];
    setLigandComps(ligandComponents)
    // let ligandOptions = [["", "select ligand"]]
    // comp.structure.eachResidue(function (rp: any) {
    //   if (rp.isWater()) return
    //   let sele = ""
    //   if (rp.resno !== undefined) sele += rp.resno
    //   if (rp.inscode) sele += "^" + rp.inscode
    //   if (rp.chain) sele += ":" + rp.chainname
    //   let name = (rp.resname ? "[" + rp.resname + "]" : "") + sele
    //   if (rp.entity.description) name += " (" + rp.entity.description + ")"
    //   ligandOptions.push([sele, name])
    // }, new NGL.Selection("( not polymer or not ( protein or nucleic ) ) and not ( water or ACE or NH2 )"))
    // setLigands(ligandOptions)
  }, [stage, version])

  const showLigand = (sele: any) => {
    let s = component.structure
  
    let withinSele = s.getAtomSetWithinSelection(new NGL.Selection(sele), 5)
    let withinGroup = s.getAtomSetWithinGroup(withinSele)
    let expandedSele = withinGroup.toSeleString()
    let neighborSele = expandedSele
  
    let sview = s.getView(new NGL.Selection(sele))
    let pocketRadius1 = Math.max(sview.boundingBox.getSize().length() / 2, 2) + 5
    setPocketRadius(pocketRadius1)
    let withinSele2 = s.getAtomSetWithinSelection(new NGL.Selection(sele), pocketRadius + 2)
    let neighborSele2 = "(" + withinSele2.toSeleString() + ") and not (" + sele + ") and polymer"
    
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "ball+stick"){
        repr.setParameters({ radiusScale: 0.8 })
        repr.setVisibility(true)
      }
      if(repr.parameters.name === "spacefill"){
        repr.setVisibility(false)
      }
      if(repr.parameters.name === "backbone"){
        repr.setParameters({ radiusScale: 0.8 })
        repr.setVisibility(true)
      }
      if(repr.parameters.name === "ball+stick" && repr.parameters.aspectRatio === 1.2){
        repr.setVisibility(true)
        repr.setSelection(sele)
      }
      if(repr.parameters.name === "ball+stick" && repr.parameters.aspectRatio === 1.1){
        repr.setVisibility(true)
        repr.setSelection(
          "(" + neighborSele + ") and (sidechainAttached or not polymer)"
        )
      }
      if(repr.parameters.name === "contact"){
        repr.setVisibility(true)
        repr.setSelection(expandedSele)
      }
      if(repr.parameters.name === "surface"){
        repr.setVisibility(true)
        repr.setSelection(neighborSele2)
        repr.setParameters({
          clipRadius: pocketRadius * 1,
          clipCenter: sview.center
        })
      }
      if(repr.parameters.name === "label"){
        repr.setVisibility(true)
      }
      repr.setSelection("(" + neighborSele + ") and not (water or ion)")
    }); 
    component.autoView(expandedSele, 2000)
  }
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
    setRadius(value)
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "surface"){
        repr.setParameters({ clipRadius: pocketRadius * pocketRadiusClipFactor })
      }
    });
  }
  const setNearFunction = (value: number) => {
    setNear(value)
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
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const showLigandWithProtein = () => {
    let ligandLength = ligandComps.length
    let proteinComp = component as NGL.StructureComponent
    let concatStructures = ligandComps.map((ligandComp) => {return ligandComp.structure}) as NGL.Structure[]
    let ligands = [] as any[]
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
    
    ligandComps.forEach((ligandComp, index) => {
      let withinSele = concatComp.structure.getAtomSetWithinSelection(new NGL.Selection(`/${index+1}`), 5)
      let withinGroup = concatComp.structure.getAtomSet(withinSele)
      let expandedSele = withinGroup.toSeleString()
      let neighborSele = expandedSele
      ligands.push([ligandComp.name, `/${index + 1}`, neighborSele])
    })
    setLigandStructuresLocal(ligands)

    // let sview = concatComp.structure.getView(new NGL.Selection("/1"))
    // let pocketRadius = Math.max(sview.boundingBox.getSize(new NGL.Vector3()).length() / 2, 2) + 5
    // let withinSele2 = concatComp.structure.getAtomSetWithinSelection(new NGL.Selection("/1"), pocketRadius + 2)
    // let neighborSele2 = "(" + withinSele2.toSeleString() + ") and not (" + "/1" + ") and polymer"

    for(let i = 1; i <= ligandLength; i++){
      comp.addRepresentation("ball+stick", {
        multipleBond: "symmetric",
        colorValue: getRandomColor(),
        sele: `/${i}`,
        aspectRatio: 1.5,
        radiusScale: 1.5
      })

      let contact = comp.addRepresentation("contact", {
        masterModelIndex: 0,
        weakHydrogenBond: true,
        maxHbondDonPlaneAngle: 35,
        sele: ligands[i-1][2]
      })      
      let neighborRepr = comp.addRepresentation("ball+stick", {
        sele: ligands[i-1][2],
        aspectRatio: 1.1,
        colorValue: "lightgrey",
        multipleBond: "symmetric"
      })

      let labelRepr = comp.addRepresentation("label", {
        sele: ligands[i-1][2] + ` and not /${i}`,
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
    }
    let backboneRepr = comp.addRepresentation("backbone", {
      visible: true,
      colorValue: "lightgrey",
      radiusScale: 0.5
    })
    // let pocketRepr = comp.addRepresentation("surface", {
    //   sele: "none",
    //   lazy: true,
    //   visibility: true,
    //   clipNear: 0,
    //   opaqueBack: false,
    //   opacity: 0.0,
    //   color: "hydrophobicity",
    //   roughness: 1.0,
    //   surfaceType: "av"
    // })
    // contact.setSelection(expandedSele)
    // pocketRepr.setSelection(neighborSele2)
    // pocketRepr.setParameters({
    //   clipRadius: pocketRadius * pocketRadiusClipFactor,
    //   clipCenter: sview.center
    // })
    stage?.autoView()
    setComponent(comp)
  }
  const toggleLigand = (e: React.ChangeEvent<HTMLInputElement>, ligandStructure: any) => {
    let mycomp = stage?.compList[1] as NGL.StructureComponent
    if(!mycomp) return
    console.log(ligandStructure)
    
    mycomp?.eachRepresentation((repr: any) => {
      if(repr.parameters.sele === ligandStructure[1]){
        repr.setVisibility(e.target.checked)
        // repr.setSelection(ligandStructure[1])
      }
      if(repr.parameters.sele === ligandStructure[2]){
        repr.setVisibility(e.target.checked)
        // repr.setSelection(ligandStructure[2])
      }
    })
  }
  const proteinReprChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    let mycomp = stage?.compList[1] as NGL.StructureComponent
    if(!mycomp) return
    mycomp?.eachRepresentation((repr: any) => {
      if(repr.parameters.name === name){
        repr.setVisibility(e.target.checked)
      }
    })
  }
  return(
    <div>
      <select onChange={(e)=>showLigand(e.target.value)}>
        {ligands.map((ligand) => {
          return(
            <option key={ligand[0]} value={ligand[0]}>{ligand[1]}</option>
          )
        })}
      </select>
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
        <button onClick={showLigandWithProtein}>show only parts</button>
      </div>
      <div>
        {ligandStructuresLocal.map((ligandStructure) => {
          return(
            <div key={ligandStructure[0]}>
              <label>{ligandStructure[0]}</label>
              <input type="checkbox" onChange={(e)=>toggleLigand(e, ligandStructure)}/>
            </div>
          )
        })}
      </div>
      <div>
        <div>
          <label>backbone</label>
          <input type="checkbox" onChange={(e)=>proteinReprChange(e, "backbone")}/>
        </div>
      </div>
    </div> 
  );
};


export default ViewLigands;
