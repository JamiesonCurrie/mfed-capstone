import Nav     from "./Nav";
import Socials from "./Socials";
import Contact from "./Contact";

const Footer = () => {
  return (
    <footer>
      <img src="../../public/images/Mario and Adrian b.jpg" alt="Mario and Adrian" />
      <section id='sitenav-section'>
        <h5>Site Navigation</h5>
        <Nav id='sitenav'/>
      </section>
      <Contact />
      <Socials />
    </footer>
  );
};

export default Footer;