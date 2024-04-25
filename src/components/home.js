import React from 'react';
import ReactDOM from 'react-dom/client';
import {Navigate} from "react-router-dom";
import { createSearchParams,useSearchParams,useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
function H(){
    return (
        <div className='content'>
            <h1>TRAVEL HUB</h1>
            <Carousel className='custom-carousel'>
      <Carousel.Item>
            <img
                className="d-block w-100"
                src={require("./images/j.jpg")}
                alt="First slide"
                id="img_one"
            />

            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        
        
      </Carousel.Item>
      <Carousel.Item>
      <img
            className="d-block w-100"
            src={require("./images/i.jpg")}
            alt="Second slide"
            id="img_two"
            
          />
        
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
            className="d-block w-100"
            src={require("./images/k.jpg")}
            alt="Third slide"
            id="img_three"
          />
        
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

        </div>
    );
}
export default H;