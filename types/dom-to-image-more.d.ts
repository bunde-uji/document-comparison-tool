declare module 'dom-to-image-more' {
  type DomToImageFilter = (node: HTMLElement) => boolean;

  interface DomToImageOptions {
    quality?: number;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
    filter?: DomToImageFilter;
  }

  interface DomToImage {
    toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    toJpeg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    toSvg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
  }

  const domtoimage: DomToImage;
  export default domtoimage;
}
