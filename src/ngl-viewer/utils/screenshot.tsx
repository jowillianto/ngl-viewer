import React from "react";
import StageContext, { useStage } from "../stage-context";

export type ImageParameters = {
  trim        : boolean;
  factor      : number;
  antialias   : boolean;
  transparent : boolean;
  onProgress  : Function | undefined;
}

export type NGLScreenshotButtonP<T> = {
  onClick : () => Promise<Blob>
} & T

export type NGLScreenshotP<T>= {
  render : 
    React.ComponentType<NGLScreenshotButtonP<T>> | 
    React.LazyExoticComponent<React.ComponentType<NGLScreenshotButtonP<T>>>
  props : T
  params? : Partial<ImageParameters>
}

const NGLScreenshot = <T,>({params, render, props} : NGLScreenshotP<T>) => {
  const stage = useStage()
  const onClick = React.useCallback(() => {
    const image = stage?.makeImage(params)
    if (image === undefined)
      throw Error("Stage is undefined")
    return image
  }, [ stage, params])
  const Component = render
  const renderProps = {
    onClick, ...props
  } as (
    NGLScreenshotButtonP<T> & 
    React.PropsWithRef<NGLScreenshotButtonP<T>>
  )
  return (
    <Component {...renderProps} />
  )
}

export default NGLScreenshot