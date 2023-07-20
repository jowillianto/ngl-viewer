import React from "react";
import Select from 'react-select'
import { ComponentDataT } from "./componentData";

interface SelectProps {
    options: ComponentDataT[]
}

export default class Selector extends React.Component<SelectProps> {

    state = {
        selectedComponent:null
    }

    handleSelectChange = (selectedOption:any) => {
        this.setState({selectedComponent: selectedOption});
    }

    render() {
        const { selectedComponent } = this.state;
    
        return (
            <Select options={}/>
        )
    }
}