import { useState } from "react";
import { WindowWrapper } from "@/features/hoc";
import WindowControls from "@/features/window/WindowControls";
import useWindowStore from "@/store/window/window.store";

function ImageFile() {
  const { windows } = useWindowStore();
  const data = windows.imgfile.data;
  const [isZoomed, setIsZoomed] = useState(false);

  if (!data || data.fileType !== "img") return null;

  const previewSrc = data.imageUrl ?? data.image;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2 className="ml-3">{data.name}</h2>
        <button
          type="button"
          className="ml-auto rounded-md border px-2 py-1 text-xs"
          onClick={() => setIsZoomed((prev) => !prev)}
        >
          {isZoomed ? "Zoom out" : "Zoom in"}
        </button>
      </div>

      <div className="preview flex items-center justify-center overflow-hidden bg-gray-100">
        {previewSrc ? (
          <img
            src={previewSrc}
            alt={data.name}
            className={`origin-center transition-transform ${isZoomed ? "scale-125" : "scale-100"}`}
          />
        ) : (
          <p className="p-4 text-gray-500 text-sm">No image available.</p>
        )}
      </div>
    </>
  );
}

const ImageFileWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageFileWindow;
