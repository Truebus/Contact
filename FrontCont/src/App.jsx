import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContForm } from './Components/ContForm';
import { Map } from './Components/Map'; // Import the Map component
import { Detail } from './Components/Detail';
import { UpdateForm } from './Components/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/datalist" element={<ContForm />} /> {/* Show the form on the home route */}
        <Route path="/" element={<Map />} /> {/* Show the list of contacts */}
        <Route path="/datalist/:id" element={<Detail />} /> 
        <Route path="/update/:id" element={<UpdateForm />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
