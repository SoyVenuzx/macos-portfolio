import dayjs from "dayjs";
import { navIcons, navLinks } from "@/constants";
import useWindowStore from "@/store/window/window.store";

export default function Navbar() {
  const { openWindow } = useWindowStore();

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p className="font-bold">Anto's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: Not using onKeyDown for accessibility since this is a portfolio and not a production app
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
}
