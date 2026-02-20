import { AnimatedText } from "./components/AnimatedText";

export default function Welcome() {
  return (
    <section id="welcome">
      <AnimatedText
        as="p"
        hoverType="subtitle"
        text="Hey, I'm GB! Welcome to my"
        className="font-georama text-3xl"
        baseWeight={100}
      />
      <AnimatedText
        as="h1"
        hoverType="title"
        text="Portfolio"
        className="font-georama text-9xl italic"
        wrapperClassName="mt-7"
      />

      <div className="small-screen">
        <p>This Portfolio is desgined for desktop/tabled screens only</p>
      </div>
    </section>
  );
}
