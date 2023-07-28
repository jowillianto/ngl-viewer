import React from "react";
import { ComponentUIDataT } from "./component-data";
import ViewerContext from "./viewer-context";

type RendererChild<U> = {
  components : ComponentUIDataT[]
} & U

type GenericRendererP<U> = {
  render : 
    React.ComponentType<RendererChild<U>> | 
    React.LazyExoticComponent<React.ComponentType<RendererChild<U>>>
  props : U
}
const GenericRenderer = <U, >({render, props} : GenericRendererP<U>) => {
  const { components } = React.useContext(ViewerContext)
  const renderProps = {
    components, ...props
  } as (
    RendererChild<U> & 
    React.PropsWithRef<RendererChild<U>>
  )
  const Component = render
  return <Component {...renderProps} />
}
export default GenericRenderer
