import { WindowWrapper } from "@/features/hoc";
import WindowControls from "@/features/window/WindowControls";
import useWindowStore from "@/store/window/window.store";

function TextFile() {
  const { windows } = useWindowStore();
  const data = windows.txtfile.data;

  if (!data || data.fileType !== "txt") return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="space-y-4 p-6">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="h-32 w-32 rounded-md object-cover"
          />
        ) : null}

        {data.subtitle ? <p className="text-sm">{data.subtitle}</p> : null}

        {Array.isArray(data.description)
          ? data.description.map((paragraph, index) => (
              <p key={`${data.id}-${index}`} className="text-sm leading-6">
                {paragraph}
              </p>
            ))
          : null}
      </div>
    </>
  );
}

const TextFileWindow = WindowWrapper(TextFile, "txtfile");

export default TextFileWindow;
