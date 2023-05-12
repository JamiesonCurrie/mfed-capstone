import './App.css';

import { Route, Routes } from "react-router-dom";

import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/*" element={<Main />} />
      </Routes>
      <Nav id='navbar'/>
      <Footer />
    </>
  );
}

export default App;
