import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard'
import TicketPage from './pages/TicketPage';
import CategoriesContext from './context';

const App = () => {
  const [categories, setCategories] = useState(null)
  const value = { categories, setCategories }

  return (
    <div className="App">
      <CategoriesContext.Provider value={value}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/ticket' element={<TicketPage />} />
            <Route path='/ticket/:id' element={<TicketPage editMode={true}/>} />
          </Routes>
        </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
}

export default App;
