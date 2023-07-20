import React, { Component, ReactNode } from "react";
import MyContext, { ContextTypeT }from "./context";
import { ComponentDataT } from "./componentData";

interface MyContextProviderProps extends React.PropsWithChildren{
  children: ReactNode;
}

interface MyContextProviderState {
  componentsArray: ComponentDataT[];
}

class MyContextProvider extends Component<MyContextProviderProps, MyContextProviderState> {
  state: MyContextProviderState = {
    componentsArray: [],
  };

  addComponent = (component: any) => {
    const newArray = this.state.componentsArray.slice()
    newArray.push(component)
    this.setState({componentsArray : newArray})
  };

  removeComponent = (index: number) => {
    const newArray = this.state.componentsArray.slice()
    newArray.slice(index, 1)
    this.setState({componentsArray: newArray})
  };

  replaceComponent = (updatedComponent: ComponentDataT, index: number) => {
    const newArray = this.state.componentsArray.slice()
    newArray[index] = updatedComponent
    this.setState({componentsArray:newArray})
  };

  render() {
    const { children } = this.props;
    const contextValue: ContextTypeT = {
      components: this.state.componentsArray,
      addComponent: this.addComponent,
      removeComponent: this.removeComponent,
      replaceComponent: this.replaceComponent
    };

    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
  }
}

export default MyContextProvider;
