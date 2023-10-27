import React, { useContext } from "react";
import StageContext from "../stage-context";

export type CenterStructureProps<T> = {
  render: React.ComponentType<{ onClick: () => void } & T>;
};

const CenterStructure = <T,>({ render }: CenterStructureProps<T>) => {
  const { stage } = useContext(StageContext);

  const centerStructure = () => {
    stage?.autoView();
  };

  const Component = render;
  const renderProps = {
    onClick: centerStructure,
  } as { onClick: () => void } & T;

  return <Component {...renderProps} />;
};

export default CenterStructure;
