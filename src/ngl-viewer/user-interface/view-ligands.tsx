import React, { useContext, useEffect } from "react";
import StageContext from "../stage-context";
import * as NGL from 'ngl'

const ViewLigands = <T,>() => {
  const { stage, version } = useContext(StageContext);
  const [ligands, setLigands] = React.useState([] as string[][])
  const [component, setComponent] = React.useState(null as any)
  const [opacity, setOpacity] = React.useState<number>(0);
  const [pocketRadius, setPocketRadius] = React.useState<number>(0);
  const [radius, setRadius] = React.useState<number>(100);
  const [near, setNear] = React.useState<number>(0);
  useEffect(() => {
    const comp = stage?.compList[0] as NGL.StructureComponent;
    if(!comp) return
    setComponent(comp)
    let ligandOptions = [["", "select ligand"]]
    comp.structure.eachResidue(function (rp: any) {
      if (rp.isWater()) return
      let sele = ""
      if (rp.resno !== undefined) sele += rp.resno
      if (rp.inscode) sele += "^" + rp.inscode
      if (rp.chain) sele += ":" + rp.chainname
      let name = (rp.resname ? "[" + rp.resname + "]" : "") + sele
      if (rp.entity.description) name += " (" + rp.entity.description + ")"
      ligandOptions.push([sele, name])
    }, new NGL.Selection("( not polymer or not ( protein or nucleic ) ) and not ( water or ACE or NH2 )"))
    setLigands(ligandOptions)
    console.log(ligandOptions)
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

      var f = pocketRadius / sceneRadius
      var v = value / 10000
      var c = 0.5 - f / 2 + v * f

      component.eachRepresentation((repr: any) => {
        if(repr.parameters.name === "surface"){
          repr.setParameters({ clipNear: c * 100 })
        }
      });
    }
  }
  const hydroPhobicFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ hydrophobic: e.target.checked })
      }
    });
  }
  const hydrogenBondFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ hydrogenBond: e.target.checked })
      }
    });
  }
  const weakHydrogenBondFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ weakHydrogenBond: e.target.checked })
      }
    });
  }
  const waterHydrogenBondFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ waterHydrogenBond: e.target.checked })
      }
    });
  }
  const backboneHydrogenBondFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ backboneHydrogenBond: e.target.checked })
      }
    });
  }
  const halogenBondFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ halogenBond: e.target.checked })
      }
    });
  }
  const metalComplexFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ metalComplex: e.target.checked })
      }
    });
  }
  const saltBridgeFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ saltBridge: e.target.checked })
      }
    });
  }
  const cationPiFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ cationPi: e.target.checked })
      }
    });
  }
  const piStackingFunction = (e: any) => {
    component.eachRepresentation((repr: any) => {
      if(repr.parameters.name === "contact"){
        repr.setParameters({ piStacking: e.target.checked })
      }
    });
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
          onChange={hydroPhobicFunction}
        />
      </div>
      <div>
        <span>
          hydrogen bond
        </span>
        <input
          type="checkbox"
          onChange={hydrogenBondFunction}
        />
      </div>
    </div> 
  );
};


export default ViewLigands;
