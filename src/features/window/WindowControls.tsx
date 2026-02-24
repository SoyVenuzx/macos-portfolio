import useWindowStore from "@/store/window/window.store";
import type { windowKeyType } from "@/store/window/window.types";

type WindowControlsProps = {
  target: windowKeyType;
};

function WindowControls({ target }: WindowControlsProps) {
  const { closeWindow } = useWindowStore();

  console.log({ target });

  return (
    <div id="window-controls">
      <button
        type="button"
        className="close"
        onClick={() => closeWindow(target)}
        aria-label="Close window"
      />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
}

export default WindowControls;
