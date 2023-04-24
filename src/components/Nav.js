const Nav = (props) => {
  return (
    <nav {... props}>
      <ul>
        <li key='home'><a href='#home'>Home</a></li>
        <li key='about'><a href='#about'>About</a></li>
        <li key='menu'><a href='#menu'>Menu</a></li>
        <li key='reserve'><a href='#reservations'>Reservations</a></li>
        <li key='order'><a href='#order'>Order Online</a></li>
        <li key='login'><a href='#login'>Login</a></li>
      </ul>
    </nav>
  );
};

export default Nav;