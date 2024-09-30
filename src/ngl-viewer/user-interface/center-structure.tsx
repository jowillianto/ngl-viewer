import React from "react";
import { useStage } from "../stage-context";

export type CenterStructureProps<T> = {
  render: React.ComponentType<{ onClick: () => void } & T>;
  props: T;
};

const CenterStructure = <T,>({ render, props }: CenterStructureProps<T>) => {
  const stage = useStage()

  const centerStructure = () => {
    stage?.autoView();
  };

  const Component = render;
  const renderProps = {
    onClick: centerStructure,
    ...props
  } 

  return <Component {...renderProps} />;
};

export default CenterStructure;
