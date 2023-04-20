import './App.css';

import Header from "./components/Header";
import Nav    from "./components/Nav";
import Main   from "./components/Main";
import Footer from "./components/Footer";



function App() {
  return (
    <>
      <head>
        <title>Little Lemon</title>
      </head>
      <body>
        <Header />
        <Nav />
        <Main />
        <Footer />
      </body>
    </>
  );
}

export default App;
