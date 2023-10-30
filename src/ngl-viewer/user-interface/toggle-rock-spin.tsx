import React, { useContext } from "react";
import StageContext from "../stage-context";

export type ToggleRockProps<T> = {
  render: React.ComponentType<{ onClick: () => void } & T>;
  initialState: "rock" | "spin" | "off";
  props : T
};

const ToggleRockSpinOrOff = <T,>({ render, initialState, props }: ToggleRockProps<T>) => {
  const [rock, setRock] = React.useState<"rock" | "spin" | "off">("off");
  const {stage} = useContext(StageContext)
  const toggleRock = () => {
    const newRock = rock === initialState ? "off" : initialState;
    setRock(newRock);
    if(newRock === "rock" ){
      stage?.toggleRock();
    }
    else if(newRock === "spin"){
      stage?.toggleSpin();
    }
    else if(newRock === "off" && initialState === "rock"){
      stage?.toggleRock();
    }
    else if(newRock === "off" && initialState === "spin"){
      stage?.toggleSpin();
    }
  };

  const Component = render;
  const renderProps = {
    onClick: toggleRock,
    ...props
  }

  return <Component {...renderProps} />;
};

export default ToggleRockSpinOrOff;
