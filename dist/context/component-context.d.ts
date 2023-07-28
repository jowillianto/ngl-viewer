import React from 'react';
import * as NGL from 'ngl';
export type StructureComponentContextT = {
    component: NGL.StructureComponent | null;
};
declare const StructureComponentContext: React.Context<StructureComponentContextT>;
export default StructureComponentContext;
