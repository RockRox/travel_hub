import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {Navigate} from "react-router-dom";
import { createSearchParams,useSearchParams,useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';

import { Button, ButtonGroup } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter,Text,Stack,Box,Heading,HStack, VStack} from '@chakra-ui/react';
import { Input ,InputLeftAddon,InputGroup } from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon , SettingsIcon} from '@chakra-ui/icons';

import { useDisclosure } from '@chakra-ui/react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';
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

import './passenger_details.css';
function Book_flight(){
    let n = useNavigate();
    let [params] = useSearchParams();

    let [username,suse] = useState(params.get("username"));
    let [gender,sgen] = useState(params.get("gender"));
    let [full_name,sful] = useState(params.get("full_name"));
    let [age,sa] = useState(params.get("age"));
    let[pno,spno] = useState(params.get("passport_no"));
    let [adno,sadno] = useState(params.get("adhaar_number"));
    let [contact,scontact] = useState(params.get("contact_no"));
    let [password,spwd] = useState(params.get("password"));
    let [month_val,smv] = useState(params.get("month"));
    let [day_val,sdv] = useState(params.get("day"));
    let [year_val,syv] = useState(params.get("year"));
    let [flight_month,sfm] = useState(params.get("flight_month"));
    let [flight_day,sfd] = useState(params.get("flight_day"));
    let [flight_year,sfy] = useState(params.get("flight_year"));
    let [start,ss] = useState(params.get("start"));
    let [end,send]  = useState(params.get("end"));
    let [flight_number,sfn] = useState(params.get("flight_number"));
    let [company,sc] = useState(params.get("company"));
    let [avl_seats,sas] = useState(params.get("avl_seats"));
    let [time,stc] = useState(params.get("time"));
    let [rows,srq] = useState(params.get("rows"));
    let [cols,sco] = useState(params.get("cols"));
    let [gap_one,sgo] = useState(params.get("gap_one"));
    let [gap_two,sgt] = useState(params.get("gap_two"));
    let [seats,n_use] = useState(JSON.parse(params.get("seats")));
    let [price,n_p_use] = useState(params.get("price"));
    
    console.log(seats);
    console.log(start);
    console.log(end);
    
    let [v,set_v] = useState(0);
    let [a,set_a] = useState([0]);
    let [names,set_name] = useState([full_name]);
    let [ages,set_ages] = useState([age]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    
    let update_v = ()=>{

        

        set_v(v+1);
        let rf = [...a];
        let arge = [...names];
        arge.push('');
        let aop = [...ages];
        aop.push('');
        rf.push(v+1);
        set_a(rf);
        set_name(arge);
        set_ages(aop);
        


    }

    let change_ele_name = (e)=>{

        let rr = e.target.id;
        let index = parseInt(rr);
        let yye = [...names];
        yye[index] = e.target.value;
        console.log(yye);
        set_name(yye);



    }

    let change_ele_age = (e)=>{
        let rfas = e.target.id;
        let index = parseInt(rfas);
        let yyhb = [...ages];
        yyhb[index] = e.target.value;
        console.log(yyhb);
        set_ages(yyhb);
    }

    let move_to_selection = ()=>{
        let abd = [...names];
        let efg = [...ages];

        n({
            pathname:'/seat',
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
                flight_number:flight_number,
                company:company,
                avl_seats:avl_seats,
                time:time,
                rows:rows,
                cols:cols,
                gap_one:gap_one,
                gap_two:gap_two,
                seats:JSON.stringify([...seats]),
                passenger_names : JSON.stringify([...abd]),
                passenger_ages : JSON.stringify([...efg]),
                price:price,

                

                

                
                

            }).toString()

        })

    }

    let cancel_booking = async()=>{
        console.log(start);
        console.log(end);
        
        let fr_data = {month:flight_month,day:flight_day,year:flight_year,start:start,end:end};
        let res = await fetch("http://localhost:8000/get_flight_travels_current",{
                method:"POST",
                headers:{'content-type': 'application/json'},
                body:JSON.stringify(fr_data),

        });

        let rgyu = await res.json();
        console.log(rgyu);
        let flights = [];
        let ards = rgyu.success;
        for(let hre = 0;hre<ards.length;hre++){
            flights.push(ards[hre]);
        }
        console.log(flights);
        n({
            pathname:"/flights_info",
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
                flights : JSON.stringify([...flights]),

                

                
                

            }).toString()

        });

    }

    let log_out = ()=>{
        n({
            pathname:'/log_out'
        })
    }



    return (
        <div className='byd'>
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
                [...a].map((index,value)=>{
                    return(
                        <Card key={value}>
                            <CardBody>
                                <InputGroup mb={4}>
                                    <InputLeftAddon>FULL NAME</InputLeftAddon>
                                    <Input id={index} value={names[index]} onChange={change_ele_name} placeholder='NAME'/>
                                </InputGroup>
                                <InputGroup mb={4}>
                                    <InputLeftAddon>AGE</InputLeftAddon>
                                    <Input id={index} value={ages[index]} onChange={change_ele_age} placeholder='Age'/>
                                </InputGroup>
                    
                            </CardBody>
                        </Card>
                    );
                })
            }
            </div>
            
            <VStack spacing='24px'>
            <Button onClick={update_v}>ADD FLYER</Button>
            <Button onClick={move_to_selection}>PROCEED FOR SEAT SELECTION</Button>

            <Button onClick={cancel_booking}>CANCEL BOOKING</Button>
            </VStack>


            



            



        </div>
    );
}

export default Book_flight;