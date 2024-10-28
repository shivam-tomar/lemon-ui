import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import Login from './components/Login';
import Homepage from './components/Homepage';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Dashboard />}></Route>
        <Route path="/registration" element={ <Registration/>}></Route>
        <Route path="/login" element={ <Login/>}></Route>
        <Route path="/homepage" element={ <Homepage/>}></Route>

      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
