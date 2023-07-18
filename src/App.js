import Footer from "./layout/footer/Footer.tsx";
import Header from "./layout/header/Header.tsx";
import Main from "./layout/main/Main.tsx";
import "./index.scss";
import AddBlog from "./components/AddBlog.tsx";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
