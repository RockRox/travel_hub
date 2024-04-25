import logo from './logo.svg';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState, useRef, useEffect} from "react"; 

import H from './components/home';
import A from './components/about';
import Book_tickets from './components/book_tickets';
import User_page from './components/user_page';
import Display from './components/display';
import Flights_info from './components/flights_info';
import Book_flight from './components/selection';
import Seats from './components/seats_choice';
import T from './components/tickets';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
 
  
  return (
    <div>

      <Routes>
        <Route index element={<Display/>}/>
        <Route path='/user_page' element = {<User_page/>} />
        <Route path='/flights_info' element = {<Flights_info/>}/>
        <Route path='/book_flight' element = {<Book_flight/>}/>
        <Route path='/seat' element ={<Seats/>} />
        <Route path='/ticket' element={<T/>}/>
        <Route path='/log_out' element = {<Display/>} />
      </Routes>


      

      
    </div>
  );
}

export default App;