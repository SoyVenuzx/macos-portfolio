import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Dock } from "@/features/dock";
import { Navbar } from "@/features/navbar";
import { Welcome } from "@/features/welcome";
import {
  Finder,
  ImageFile,
  Resume,
  Safari,
  Terminal,
  TextFile,
} from "@/features/window";

gsap.registerPlugin(Draggable);

export default function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <TextFile />
      <ImageFile />
      <Finder />
    </main>
  );
}
