import React, {useState} from 'react';
import './App.css';
import HeaderAppBar from "./HeaderAppBar";
import {Route, Routes} from "react-router-dom";
import Products from "./products/Products";
import Toolbar from '@mui/material/Toolbar';
import Analyze from "./Analyze";
import Manage from "./Manage";
import AddProduct from "./AddProduct";

export default function App() {

    const [open, setOpen] = useState(true);

    const handleDrawerChange = (isOpen: boolean) => {
        setOpen(isOpen);
    };

    return (
    <div className="App">
        <HeaderAppBar handleDrawerChange={handleDrawerChange} open={open}></HeaderAppBar>
        <div className="App-content">
            <Toolbar sx={{ marginTop: '1.5rem'}} />
            <Routes>
                <Route path={"/"} element={<>Hello</>}/>
                <Route path={"products"} element={<Products handleDrawerChange={handleDrawerChange} open={open}/>}/>
                <Route path={"analyze"} element={<Analyze/>}/>
                <Route path={"manage"} element={<Manage/>}/>
                <Route path={"add"} element={<AddProduct/>}/>
            </Routes>
        </div>
    </div>
  );
}
