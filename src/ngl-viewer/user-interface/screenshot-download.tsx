import React from "react";
import NGLScreenshot, {
  ImageParameters,
  NGLScreenshotP,
} from "../utils/screenshot";
export type ScreenshotChildT<T> = {
  onClick: () => void;
} & T;

export type ScreenshotDownloadT<T> = {
  render:
    | React.ComponentType<ScreenshotChildT<T>>
    | React.LazyExoticComponent<React.ComponentType<ScreenshotChildT<T>>>;
  props: T;
  onClick: () => Promise<Blob>;
};

export const ScreenshotDownload = <T,>({
  render,
  props,
  onClick,
}: ScreenshotDownloadT<T>) => {
  const downloadOnClick = React.useCallback(() => {
    onClick()
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${Date.now().toString()}_screenshot.png`;
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error("Error capturing screenshot:", err);
      });
  }, [onClick]);
  const Component = render;
  const renderProps = {
    onClick: downloadOnClick,
    ...props,
  } as ScreenshotChildT<T> & React.PropsWithRef<ScreenshotChildT<T>>;
  return <Component {...renderProps} />;
};

type ScreenshotAndDownloadT<T> = {
  render: ScreenshotDownloadT<T>["render"];
  props: T;
  params?: Partial<ImageParameters>;
};

const ScreenshotAndDownload = <T,>(props: ScreenshotAndDownloadT<T>) => {
  return (
    <NGLScreenshot
      render={ScreenshotDownload}
      props={{
        render: props.render,
        props: props.props,
      }}
      params={props.params}
    />
  );
};

export default ScreenshotAndDownload;
