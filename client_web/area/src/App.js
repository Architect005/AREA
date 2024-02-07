import './App.css';
import React from 'react';
import Accueil from './components/Accueil';
import Register from './components/Register';
import Connexion from './components/Connexion';
import Home from './components/Home';
import ChooseService from './components/Choose_service';
import ChooseServices from './components/Choose_service_r';
import Profile from './components/profile';
import Choose_action from './components/Choose_action';
import Reaction from './components/Reactions';
import Modal from './components/test';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Accueil/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/connexion" element={<Connexion/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/choose_service" element={<ChooseService/>}/>
          <Route path="/choose_service_r/:id" element={<ChooseServices/>}/>
          <Route path="/Choose_action/:id" element={<Choose_action/>}/>
          <Route path="/Reaction/:name/:id" element={<Reaction/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/test" element={<Modal/>}/>
        </Routes>
      </React.Fragment>
  );
}

export default App;
