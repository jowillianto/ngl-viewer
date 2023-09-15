import React from "react";
import { ImageParameters } from "../utils/screenshot";
export type ScreenshotChildT<T> = {
    onClick: () => void;
} & T;
export type ScreenshotDownloadT<T> = {
    render: React.ComponentType<ScreenshotChildT<T>> | React.LazyExoticComponent<React.ComponentType<ScreenshotChildT<T>>>;
    props: T;
    onClick: () => Promise<Blob>;
};
export declare const ScreenshotDownload: <T>({ render, props, onClick }: ScreenshotDownloadT<T>) => JSX.Element;
type ScreenshotAndDownloadT<T> = {
    render: ScreenshotDownloadT<T>["render"];
    props: T;
    params?: Partial<ImageParameters>;
};
declare const ScreenshotAndDownload: <T>(props: ScreenshotAndDownloadT<T>) => JSX.Element;
export default ScreenshotAndDownload;
