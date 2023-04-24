import Nav     from "./Nav";
import Socials from "./Socials";
import Contact from "./Contact";

const Footer = () => {
  return (
    <footer>
      <img src="../images/Mario and Adrian b.jpg" alt="Mario and Adrian" />
      <section id='sitenav'>
        <h5>Site Navigation</h5>
        <Nav />
      </section>
      <Contact />
      <Socials />
    </footer>
  );
};

export default Footer;