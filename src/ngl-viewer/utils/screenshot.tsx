import React from "react";
import { StageContext } from "../stage";
import { PromiseButtonProps, RenderProps } from "./utils";

export interface ImageParameters{
  trim        : boolean;
  factor      : number;
  antialias   : boolean;
  transparent : boolean;
  onProgress  : Function | undefined;
}

export interface NGLScreenshotProps extends RenderProps<PromiseButtonProps>{
  params? : Partial<ImageParameters>
}

export default class NGLScreenshot extends React.Component<
  NGLScreenshotProps
>{
  context !: React.ContextType<typeof StageContext>
  static contextType  = StageContext
  onClick = () : Promise<Blob> => {
    return new Promise((res, rej) => {
      const stage   = this.context.stage
      const image   = stage?.makeImage(this.props.params)
      if(image)
        image
        .then((img) => res(img))
        .catch((err) => rej(err))
      else 
        rej(undefined)
    })
  }
  render(): React.ReactNode {
    const render  = this.props.render
    return React.cloneElement(
      render, {...render.props, onClick : this.onClick}
    )
  }
}