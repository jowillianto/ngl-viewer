import React from "react";

const characters = 
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function randomString(length : number):string{
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
    }
    return result;
}

export interface ClickButtonProps{
  onClick : () => void
}

export interface PromiseButtonProps{
  onClick : () => Promise<any>
}

export interface RenderProps<T>{
  render  : React.ReactElement<T>
}