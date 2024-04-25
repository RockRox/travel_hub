import React from 'react';
import ReactDOM from 'react-dom/client';
import {Navigate} from "react-router-dom";
import { createSearchParams,useSearchParams,useNavigate } from 'react-router-dom';
import { useState , useEffect,useRef } from 'react';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';

import { Card, CardHeader, CardBody, CardFooter,Text,Stack,Box,Heading,HStack, VStack} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Input ,InputLeftAddon,InputGroup } from '@chakra-ui/react';
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
import { Spinner } from '@chakra-ui/react';
import './users_page.css';
function User_page(){
    let n = useNavigate();
    let [params] = useSearchParams();
    let [username,su] = useState(params.get("username"));
    let [gender,gu] = useState(params.get("gender"));
    let [full_name,sf] = useState(params.get("full_name"));
    let [age,sa] = useState(params.get("age"));
    let [pno,spno] = useState(params.get("passport_no"));
    let [adno,sadno] = useState(params.get("adhaar_number"));
    let [contact,scontact] = useState(params.get("contact_no"));
    let [password,spassword] = useState(params.get("password"));
    let [month_val,smonnth] = useState(params.get("month"));
    let [day_val,sdval] = useState(params.get("day"));
    let [year_val,syear_val] = useState(params.get("year"));
    let [month,set_month] = useState('');
    let [day,set_day] = useState('');
    let [year,set_year] = useState('');
    let [dob_ind,set_dob_ind] = useState(0);
    let [load,set_load] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    console.log(full_name);
    
    let observe = (e)=>{
        if(dob_ind == 0){
            if(e.target.value.length == 2){
                set_dob_ind(1);
                document.querySelector("#month").focus();
            }

        }
        else if(dob_ind == 1){
            if(e.target.value.length == 2){
                set_dob_ind(2);
                document.querySelector("#year").focus();
            }

        }
        else{
            if(e.target.value.length == 4){
                set_dob_ind(0);
            }
        }


    }
    let move_to_flights = async()=>{
        let flight_month = document.querySelector("#month").value;
        let flight_day = document.querySelector("#day").value;
        let flight_year = document.querySelector("#year").value;
        let start = document.querySelector("#s").value;
        let end = document.querySelector("#e").value;

        let fr_data = {month:flight_month,day:flight_day,year:flight_year,start:start,end:end};
        set_load(1);
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

    if(load == 1){
        return (
            <div className='us_img' >
                <Button className='settings'>
                <SettingsIcon></SettingsIcon>
                </Button>
                
          
                <div className='container'>
                <Text as='i' fontSize='4xl'>SEARCH FLIGHTS</Text>
                    
                <Card className='App'>
                    <CardBody>
                    <InputGroup mb={4}>
                                
                                <HStack spacing='24px'>
                                    <Input id="day" placeholder='00' onChange={observe} />
                                    <Input id='month' placeholder='00' onChange={observe}/>
                                    <Input id="year" placeholder='0000' onChange={observe} />
    
                                </HStack>
                    </InputGroup>
                    <InputGroup mb={4}>
                                
                                <HStack spacing='24px'>
                                    <Input id="s" placeholder='START LOCATION' onChange={observe} />
                                    <Input id='e' placeholder='END LOCATION' onChange={observe}/>
                                    
    
                                </HStack>
                    </InputGroup>
                    
                    <Spinner color='red.500' />
                    </CardBody>
                </Card>
                </div>
    
    
            </div>
        );

    }

    let log_out = ()=>{
        n({
            pathname:'/log_out'
        })
    }

    
    return (
        <div className='us_img'>
            <div >
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
            <Text as='i' fontSize='4xl'>SEARCH FLIGHTS</Text>
                
            <Card className='App'>
                <CardBody>
                <InputGroup mb={4}>
                            
                            <HStack spacing='24px'>
                                <Input id="day" placeholder='00' onChange={observe} />
                                <Input id='month' placeholder='00' onChange={observe}/>
                                <Input id="year" placeholder='0000' onChange={observe} />

                            </HStack>
                </InputGroup>
                <InputGroup mb={4}>
                            
                            <HStack spacing='24px'>
                                <Input id="s" placeholder='START LOCATION' onChange={observe} />
                                <Input id='e' placeholder='END LOCATION' onChange={observe}/>
                                

                            </HStack>
                </InputGroup>
                
                <Button onClick={move_to_flights}>CLICK TO SEARCH FLIGHTS</Button>
                </CardBody>
            </Card>
            </div>


        </div>

        </div>
        
    );
}
export default User_page;