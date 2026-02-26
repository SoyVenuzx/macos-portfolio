import clsx from "clsx";
import { Search } from "lucide-react";

import { locations } from "@/constants";
import { WindowWrapper } from "@/features/hoc";
import WindowControls from "@/features/window/WindowControls";
import useLocationStore from "@/store/location/location.store";
import useWindowStore from "@/store/window/window.store";
import type { LocationItem, locationsType } from "@/types";

function Finder() {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const openItem = (item: LocationItem) => {
    if (item.kind === "folder") return setActiveLocation(item);

    if (item.kind === "file" && item.fileType === "pdf")
      return openWindow("resume");

    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    if (item.fileType === "img") return openWindow("imgfile", item);

    if (item.fileType === "txt") return openWindow("txtfile", item);
  };

  const renderList = (name: string, items: locationsType | LocationItem[]) => {
    if (Array.isArray(items)) {
      return (
        <div>
          <h3>{name}</h3>

          <ul>
            {items.map((item) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: lol
              <li
                key={item.id}
                onClick={() => {
                  if (item.kind === "folder") {
                    setActiveLocation(item);
                  } else {
                    openItem(item);
                  }
                }}
                className={clsx(
                  item.id === activeLocation?.id ? "active" : "not-active",
                )}
              >
                <img src={item.icon} alt={item.name} className="w-4" />
                <p className="truncate font-medium text-sm">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <h3>{name}</h3>

        <ul>
          {Object.entries(items).map(([key, item]) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: lol
            <li
              key={item.id}
              onClick={() => setActiveLocation(key as keyof locationsType)}
              className={clsx(
                item.id === activeLocation?.id ? "active" : "not-active",
              )}
            >
              <img src={item.icon} alt={item.name} className="w-4" />
              <p className="truncate font-medium text-sm">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const currentChildren =
    activeLocation && activeLocation.kind === "folder"
      ? activeLocation.children
      : [];

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="flex h-full bg-white">
        <div className="sidebar">
          {renderList("Favorites", locations)}
          {renderList("Work", locations.work.children)}
        </div>

        <ul className="content">
          {currentChildren.map((item) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: lol
            <li
              key={item.id}
              onClick={() => openItem(item)}
              className={item.position}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
