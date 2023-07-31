/// <reference types="react" />
import { ComponentUIDataT } from './component-data';
import { NGLStageProps } from '../stage';
type NGLRenderererP = NGLStageProps & {
    components: ComponentUIDataT[];
};
declare const NGLRenderer: ({ components, ...stageProps }: NGLRenderererP) => JSX.Element;
export default NGLRenderer;
