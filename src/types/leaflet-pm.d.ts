import "leaflet";

declare module "leaflet" {
  interface PM {
    enableDraw(shape: string, options?): void;
    disableDraw(): void;

    enableEdit(): void; // ← أضف هنا
    disableEdit(): void;

    setGlobalOptions(options): void;

    enableGlobalEditMode(): void;
    disableGlobalEditMode(): void;

    enableGlobalRemovalMode(): void;
    disableGlobalRemovalMode(): void;

    enableGlobalDragMode(): void;
    disableGlobalDragMode(): void;
  }

  interface Map {
    pm: PM;
  }

  interface Layer {
    pm: PM;
  }
}
