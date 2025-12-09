declare module 'photo-sphere-viewer' {
  export interface ViewerOptions {
    container: HTMLElement;
    panorama: string;
    defaultYaw?: number;
    touchmoveTwoFingers?: boolean;
  }

  export class Viewer {
    constructor(options: ViewerOptions);
    destroy(): void;
  }

  export default Viewer;
}


