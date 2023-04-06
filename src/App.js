import 'antd/dist/reset.css';
import './App.css';
import {BrowserRouter , Router, Routes, Route} from "react-router-dom";
import Home from './Home';
import {Table} from 'antd'
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
