import React, { useContext } from 'react';
import PhotoShopContext from './context';
import PhotoshopSelector from './photoshopSelector';
import ComponentSwitch from './renderTest';
import { ComponentUIDataT } from './componentData';

const PhotoShopPanel: React.FC = () => {
    const { components, addComponent, replaceComponent, removeComponent } = useContext(PhotoShopContext);

    const handleUpdateComponent = (id: number) => (newProps: ComponentUIDataT["props"]) => {
        const component = components[id];
        if (!component) return;

        replaceComponent({ ...component, props: newProps }, id);
    }

    const handleRemoveComponent = (id: number) => () => {
        removeComponent(id);
    }

    // const renderComponentItem = (component: ComponentUIDataT, id: number) => {
    //     return (
    //         <div key={id}>
    //             <ComponentSwitch type={component.type} props={component.props} onUpdate={handleUpdateComponent(id)} />
    //             <button onClick={handleRemoveComponent(id)}>Remove</button>
    //         </div>
    //     );
    // }

    const handleAddComponent = (component: ComponentUIDataT) => {
        addComponent(component);
    }

    return (
        <div>
          
        </div>
    );
}

export default PhotoShopPanel;
