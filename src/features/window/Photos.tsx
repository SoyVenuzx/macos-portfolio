import { Mail, Search } from "lucide-react";
import { gallery, photosLinks } from "@/constants";
import { WindowWrapper } from "@/features/hoc";
import WindowControls from "@/features/window/WindowControls";
import useWindowStore from "@/store/window/window.store";

function Photos() {
  const { openWindow } = useWindowStore();

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />

        <div className="flex w-full items-center justify-end gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full">
        <div className="sidebar">
          <h2>Photos</h2>

          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <li
                key={id}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "/images/image.png",
                    fileType: "img",
                    kind: "file",
                    imageUrl: img,
                  })
                }
              >
                <img src={img} alt={`Gallery pic ${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
