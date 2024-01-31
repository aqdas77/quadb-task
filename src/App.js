import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
	

	return (
    <>
     <Navbar/>
		<Routes>
      
			<Route path="/" exact element={<Home />} />
			<Route path="/details" exact element={<Detail />} />
			
		</Routes>
    </>
   
	);
}

export default App;