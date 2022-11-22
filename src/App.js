import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Main from './pages/Main';
import Mint from './pages/Mint';
import Bg from "../src/component/background";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MyPage from "../src/pages/MyPage";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path = "/mint" element ={<Mint/>}/>
        <Route path = "/MyPage" element = {<MyPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
