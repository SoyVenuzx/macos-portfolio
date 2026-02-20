import { Dock } from "./features/dock";
import { Navbar } from "./features/navbar";
import { Welcome } from "./features/welcome";

export default function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  );
}
