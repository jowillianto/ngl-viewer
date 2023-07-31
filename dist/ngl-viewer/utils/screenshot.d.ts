import React from "react";
export type ImageParameters = {
    trim: boolean;
    factor: number;
    antialias: boolean;
    transparent: boolean;
    onProgress: Function | undefined;
};
export type NGLScreenshotButtonP<T> = {
    onClick: () => Promise<Blob>;
} & T;
export type NGLScreenshotP<T> = {
    render: React.ComponentType<NGLScreenshotButtonP<T>> | React.LazyExoticComponent<React.ComponentType<NGLScreenshotButtonP<T>>>;
    props: T;
    params?: Partial<ImageParameters>;
};
declare const NGLScreenshot: <T>({ params, render, props }: NGLScreenshotP<T>) => JSX.Element;
export default NGLScreenshot;
