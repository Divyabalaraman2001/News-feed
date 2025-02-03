import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom'
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from '../src/reducer/UseReducer';
export const UserContext = createContext();

// Created a routing component
const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<News category="all" />} />
      <Route path='/science' element={<News category="science" />} />
      <Route path='/sports' element={<News category="sports" />} />
      <Route path='/politics' element={<News category="politics" />} />
      <Route path='/entertainment' element={<News category="entertainment" />} />
      <Route path='/education' element={<News category="education" />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
