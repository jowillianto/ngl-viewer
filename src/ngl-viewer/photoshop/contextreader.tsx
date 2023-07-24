import React, { useContext } from "react";
import PhotoShopContext from "./context";
import { ComponentUIDataT } from "./componentData";

type ComponentOneP<U> = {
  render: React.ComponentType<U & { array: ComponentUIDataT[] }>;
  props: U;
};

type ComponentOneProps = ComponentOneP<any>;

const ComponentPropsReader = <U, >({ render, props } : ComponentOneP<U>) => {
  const contextReader = useContext(PhotoShopContext);
  const Component = render
  const array = React.useMemo(() => {
    return contextReader.components
      .filter((entry) => "props" in entry)
      .map((entry) => entry)
  }, [contextReader.components])
  const newProps = {
    array, ...props
  } as (U & JSX.IntrinsicAttributes & React.PropsWithRef<any>)
  return <Component {...newProps} />;
};

export default ComponentPropsReader;
