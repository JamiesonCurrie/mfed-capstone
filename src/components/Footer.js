import Nav     from "./Nav";
import Socials from "./Socials";
import Contact from "./Contact";

const Footer = () => {
  return (
    <footer>
      <img src="/images/restauranfood.jpg" alt="Little Lemon Food" />
      <section id='sitenav-section'>
        <h3>Site Navigation</h3>
        <Nav id='sitenav'/>
      </section>
      <Contact />
      <Socials />
    </footer>
  );
};

export default Footer;