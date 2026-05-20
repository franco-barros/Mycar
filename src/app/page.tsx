import { Hero } from "../components/hero/Hero";
import About from "../components/about/About";
import { Services } from "../components/servicios/Service";
import WhatsappButton from "../components/whatsappbutton/WhatsappButton";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />

      <WhatsappButton
        phoneNumber="2645279792"
        message="Hola, me gustaría más información sobre tus servicios."
      />
    </>
  );
}
