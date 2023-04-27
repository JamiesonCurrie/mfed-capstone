import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { key: 'navbar',   text: 'Home'}
, { key: 'reserve',  text: 'Reservations'}
, { key: 'specials', text: 'Menu'}
, { key: 'reviews',  text: 'Reviews'}
, { key: 'about',    text: 'About'}
, { key: 'order',    text: 'Order Online'}
, { key: 'login',    text: 'Login'}
];

const Nav = (props) => {
  const [currentSelected, setCurrentSelected] = useState('');
  const [menuClass, setMenuClass]             = useState(null);

  const handleLinkClick = (anchor) => () => {
    console.log(anchor);
    setCurrentSelected(anchor);
    (menuClass) ? setMenuClass(null) : setMenuClass('open');

    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleBurgerClick = (e) => {
    (menuClass) ? setMenuClass(null) : setMenuClass('open');
  };

  return (
    <nav {... props}>
      <FontAwesomeIcon id={props.id + '-burgernav'} icon={faBars} size='2xl' onClick={handleBurgerClick} />
      <ul id={props.id + '-list'} className={menuClass}>
        {navItems.map((navItem) => {
          const itemKey = navItem.key;
          return (
            <li
              className={(itemKey === currentSelected) ? 'selected' : null}
              key={itemKey}
            >
              <a href={'#' + itemKey} onClick={handleLinkClick(itemKey)}>
                {navItem.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;