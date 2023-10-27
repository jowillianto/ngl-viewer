import React from 'react';
import './collapsible.css';
import { ComponentUIDataT } from './component-data';
interface CollapsibleProps {
    children: React.ReactNode[];
    component: ComponentUIDataT;
    index: number;
}
declare const Collapsible: React.FC<CollapsibleProps>;
export default Collapsible;
