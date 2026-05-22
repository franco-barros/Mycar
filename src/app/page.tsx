import { Hero } from "../components/hero/Hero";
import About from "../components/about/About";
import { Services } from "../components/service/Service";
import BrandsCarousel from "../components/brandscarousel";
import Products from "../components/products";
import Contact from "../components/contact";
import WhatsappButton from "../components/whatsappbutton/WhatsappButton";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <BrandsCarousel />
      <Products />
      <Contact />
      <WhatsappButton
        phoneNumber="2645279792"
        message="Hola, me gustaría más información sobre tus servicios."
      />
    </>
  );
}
