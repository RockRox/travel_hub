import './display.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState, useRef, useEffect} from "react"; 

import H from './home';
import A from './about';
import Book_tickets from './book_tickets';
function Display() {
  

  let move_to_home = ()=>{
    document.querySelector("#home").scrollIntoView({ behavior: 'smooth' });
  }

  let move_to_about = () =>{
    document.querySelector("#about").scrollIntoView({ behavior: 'smooth' });
  }

  let move_to_book_tickets = ()=>{
    document.querySelector("#book").scrollIntoView({ behavior: 'smooth' });

  }
 



  

  
  return (
    <div className="App">
      <div className="tabs-container">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab onClick={move_to_home}>HOME</Tab>
            <Tab onClick={move_to_about}>ABOUT</Tab>
            <Tab onClick={move_to_book_tickets}>BOOK TICKETS</Tab>
          </TabList>
        </Tabs>
      </div>
      
      <div className="content">
        <div id="home">
          <H />
        </div>
        <div id="about">
          <A />
          
        </div>
        <div id="book">
          <Book_tickets/>



        </div>
      </div>

      
    </div>
  );
}

export default Display;