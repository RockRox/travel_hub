import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {Navigate} from "react-router-dom";
import { createSearchParams,useSearchParams,useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter,Text,Stack,Box,Heading,HStack, VStack} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';

import { PhoneIcon, AddIcon, WarningIcon , SettingsIcon} from '@chakra-ui/icons';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';
import './flights_info.css';
function Flights_info(){

    
    let [params] = useSearchParams();
    let username = params.get("username");
    let gender = params.get("gender");
    let full_name = params.get("full_name");
    let age = params.get("age");
    let pno = params.get("passport_no");
    let adno = params.get("adhaar_number");
    let contact = params.get("contact_no");
    let password = params.get("password");
    let month_val = params.get("month");
    let day_val = params.get("day");
    let year_val = params.get("year");
    let flight_month = params.get("flight_month");
    let flight_day = params.get("flight_day");
    let flight_year = params.get("flight_year");
    let start = params.get("start");
    let end  = params.get("end");
    let flights =JSON.parse(params.get("flights"));
    let n = useNavigate();
    console.log(flights);
    console.log("start");
    console.log(start);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    let move_booking_section = (e)=>{

        let rgd = [...flights];

        let rrgh = parseInt(e.target.id);
        let abdf = rgd[rrgh];
        let ffgh = [...abdf.seats];
        
       


        n({
            pathname:'/book_flight',
            search: createSearchParams({
                username : username ,
                gender : gender,
                full_name : full_name,
                age:age,
                passport_no : pno,
                adhaar_number : adno,
                contact_no : contact,
                password : password,
                month : month_val,
                day:day_val,
                year:year_val,
                flight_month:flight_month,
                flight_day :flight_day,
                flight_year:flight_year,
                start:start,
                end : end,
                flight_number:abdf.id,
                company:abdf.company,
                avl_seats:abdf.seats_avl,
                time:abdf.time,
                rows:abdf.rows,
                cols:abdf.cols,
                gap_one:abdf.gap_one,
                gap_two:abdf.gap_two,
                price:abdf.price,
                seats:JSON.stringify([...ffgh]),
                

                

                
                

            }).toString()

        })


    }

    let go_back = ()=>{
        n({
            pathname:"/user_page",
            search: createSearchParams({
                username : username ,
                gender : gender,
                full_name : full_name,
                age:age,
                passport_no : pno,
                adhaar_number : adno,
                contact_no : contact,
                password : password,
                month : month_val,
                day:day_val,
                year:year_val,
                

                
                

            }).toString()

        });
    }

    let log_out = ()=>{
        n({
            pathname:'/log_out'
        })
    }

    if(flights.length == 0){
        return (
            <div className='m'>

<Menu>
  <MenuButton as={Button}>
    <SettingsIcon></SettingsIcon>
  </MenuButton>
  <MenuList>
    <MenuItem>email : {username}</MenuItem>
    <MenuItem onClick={log_out}>Log out</MenuItem>
    
  </MenuList>
</Menu>
                <div className='container'>
                <Card>
                    <CardBody>
                        <Text as='i'>NO FLIGHTS AVAILABLE</Text>
                    </CardBody>
                </Card>

                </div>
                <Button onClick={go_back}>GO BACK</Button>
            </div>
        );
    }



    
    
    return (
        
        <div className='m'>
            
            <Menu>
  <MenuButton as={Button}>
    <SettingsIcon></SettingsIcon>
  </MenuButton>
  <MenuList>
    <MenuItem>email : {username}</MenuItem>
    <MenuItem onClick={log_out}>Log out</MenuItem>
    
  </MenuList>
</Menu>
            <div className='container'>
            {
                [...flights].map((index,value)=>{
                    let abd = index.company;
                    let id = index.id;
                    let avl_seats = index.seats_avl;
                    let st = index.start;
                    let end = index.end;
                    let time = index.time;
                    let price = index.price;
                    if(avl_seats != 0){
                        return(
                            <Card  key={value}>
                                <CardBody>
                                    <HStack spacing='24px'>
                                    <div>
                                    <VStack>
                                    <HStack spacing='24px'>
                                    <Text as='i'>{abd}</Text>
                                    <Text as='i'>flight number : {id}</Text>
                                    </HStack>
                                    <HStack spacing='24px'>
                                    <Text as='i'>seats left : {avl_seats}</Text>
                                    <Text as='i' >FROM : {st}</Text>
                                    <Text as='i'>TO : {end}</Text>
                                    <Text as='i'>TIME : {time}</Text>
                                    <Text as='i'>PRICE PER SEAT : {price}</Text>


                                    </HStack>
                                    </VStack>
                                    </div>
                                    <Button id={value} onClick={move_booking_section}>BOOK NOW</Button>
                                    </HStack>
                                </CardBody>
                            </Card>
                        );

                    }
                    
                })
            }
            </div>
            <Button onClick={go_back}>GO BACK</Button>

            

        </div>
    );
}
export default Flights_info;