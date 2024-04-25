import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {Navigate} from "react-router-dom";
import { createSearchParams,useSearchParams,useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter,Text,Stack,Box,Heading,HStack, VStack} from '@chakra-ui/react';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LockIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Input ,InputLeftAddon,InputGroup } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';

import { Spinner } from '@chakra-ui/react';

function Book_tickets(){
    const [value, setValue] = useState('0');
    let [full_name,set_full_name] = useState('');
    let [email,set_email] = useState('');
    let [gender,set_gender] = useState('');
    let [age,set_age] = useState('');
    let [pno,set_pno] = useState('');
    let [adhaar,set_adhaar_no] =  useState('');
    let [contact,set_contact] = useState('');
    let [month,set_month] = useState('');
    let [day,set_day] = useState('');
    let [year,set_year] = useState('');
    let [dob_ind,set_dob_ind] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const final_ref = useRef(null);
    let [load,set_load] = useState(0);
    

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

    let n  = useNavigate();
    let create_account = async()=>{

        set_email(document.querySelector("#email").value);
        set_full_name(document.querySelector("#full_name").value);
        if(value == 1){
            set_gender("Male");
        }
        else{
            set_gender("Female");
        }

        set_age(document.querySelector("#age").value);
        set_pno(document.querySelector("#pno").value);
        set_adhaar_no(document.querySelector("#adhaar").value);
        set_contact(document.querySelector("#contact").value);
        set_month(document.querySelector("#month").value);
        set_day(document.querySelector("#day").value);
        set_year(document.querySelector("#year").value);
        document.querySelector("#email").value='';
        set_load(2);
        //console.log();

        


    }
    let setusername = ()=>{
        document.querySelector("#jj").value='';
        console.log("hello");
        

    }
    let move_to_load_initial = ()=>{
        set_load(0);
    }

    let d = (e)=>{
       setValue(e);
    }

    let finish_signing_up =async()=>{

        
        let pwd = document.querySelector("#pwd").value;
        
        
        let fr_data = {full_name:full_name,email:email,gender:gender,age:age,pno:pno,adhaar:adhaar,contact:contact,password:pwd,month:month,day:day,year:year};
        set_load(1);
        let res = await fetch("http://localhost:8000/get_user_details",{
                method:"POST",
                headers:{'content-type': 'application/json'},
                body:JSON.stringify(fr_data),

        });
        if(res.status == 300){
            n({
                pathname:"/user_page",
                search: createSearchParams({
                    username : email ,
                    gender : gender,
                    full_name : full_name,
                    age:age,
                    passport_no : pno,
                    adhaar_number : adhaar,
                    contact_no : contact,
                    password : pwd,
                    month : month,
                    day:day,
                    year:year,
                    

                    
                    

                }).toString()

            });

        }


        
    }

    let log_in =  async()=>{

        let i = document.querySelector("#username_log_in").value;
        let j = document.querySelector("#password_log_in").value;

        let fr_data = {username:i,password:j};
        set_load(4);
        let res = await fetch("http://localhost:8000/log_in_check",{
                method:"POST",
                headers:{'content-type': 'application/json'},
                body:JSON.stringify(fr_data),

        });
        let k = await res.json();
        console.log(k);
        n({
            pathname:"/user_page",
            search: createSearchParams({
                username : k.success.email ,
                gender : k.success.Gender,
                full_name : k.success.Full_name,
                age:k.success.Age,
                passport_no : k.success.Passport_Number,
                adhaar_number : k.success.Adhaar_Number,
                contact_no : k.success.Contact_Number,
                password : k.success.Password,
                month : k.success.month,
                day:k.success.day,
                year:k.success.year,
                

                
                

            }).toString()

        });




    }
    if(load == 4){
        return (
            <div className='.content'>
                <Row>
                    <Col xs={6}>
                    <Heading>LOG IN TO YOUR ACCOUNT</Heading>
                    <InputGroup mb={4}>
                        <InputLeftAddon>@</InputLeftAddon>
                        <Input  id="username_log_in" placeholder='Username' />
                    </InputGroup>
                    
                    
                    <InputGroup mb={4}>
                        <InputLeftAddon><LockIcon/></InputLeftAddon>
                        <Input id="password_log_in" placeholder='Password' />
                    </InputGroup>
                    <Spinner color='red.500' />
                    <Divider orientation='horizontal' />
                    <Button onClick={onOpen} colorScheme='green' variant='outline'>CREATE ACCOUNT</Button>
                    <Modal finalFocusRef={final_ref} isOpen={isOpen} onClose={onClose}>
    
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                            
                            <InputGroup mb={4}>
                                <InputLeftAddon>@</InputLeftAddon>
                                <Input id="email" placeholder='Username' />
                            </InputGroup>
                    
                    
                            <InputGroup mb={4}>
                                <InputLeftAddon>FN</InputLeftAddon>
                                <Input id="full_name" placeholder='Full Name' />
                            </InputGroup>
                    
                    
    
                    <InputGroup mb={4}>
                        <InputLeftAddon>G</InputLeftAddon>
                            <RadioGroup onChange={d} value={value}>
                                <Stack direction='row'>
                                    <Radio id="male" value='1'>Male</Radio>
                                    <Radio id="female"  value='2'>Female</Radio>
            
                                </Stack>
                            </RadioGroup>
                    </InputGroup>
                    
                    <InputGroup mb={4}>
                                <InputLeftAddon>A</InputLeftAddon>
                                <Input id="age" placeholder='Age' />
                    </InputGroup>
                    
                    
                    <InputGroup mb={4}>
                                <InputLeftAddon>P</InputLeftAddon>
                                <Input id="pno" placeholder='Passport Number' />
                    </InputGroup>
                    
    
                   
                    <InputGroup mb={4}>
                                <InputLeftAddon>@</InputLeftAddon>
                                <Input id="adhaar" placeholder='Adhaar Number' />
                    </InputGroup>
                    
                    
                    <InputGroup mb={4}>
                                <InputLeftAddon>@</InputLeftAddon>
                                <Input id="contact" placeholder='Contact Number' />
                    </InputGroup>
                    <InputGroup mb={4}>
                                <InputLeftAddon>D</InputLeftAddon>
                                <HStack spacing='24px'>
                                    <Input id="day" placeholder='00' onChange={observe} />
                                    <Input id='month' placeholder='00' onChange={observe}/>
                                    <Input id="year" placeholder='0000' onChange={observe} />
    
                                </HStack>
                    </InputGroup>
                    
    
                                
                            </ModalBody>
    
                            <ModalFooter justifyContent="center">
                                <Button colorScheme='blue' onClick={create_account}>
                                    SIGN UP
                                </Button>
                            
                            </ModalFooter>
                        </ModalContent>
    
                    </Modal>
                    </Col>
                    <Col  xs={1}>
                    <Divider orientation='vertical' />
                    </Col>
                    <Col>
                    <h1>BOOK YOUR TICKETS NOW!</h1>
                    <Card>
                    <CardBody>
                        <Stack  spacing='4'>
                            <Box>
                                <Text>
                                    SAFE
                                </Text>
                            </Box>
                            <Box>
                                <Text>
                                    TRUST WORTHY
                                </Text>
                            </Box>
                            <Box>
                                 <Text>
                                    FAST AND EFFICIENT
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    </Card>
                    </Col>
                </Row>
            </div>
        );

    }

    if(load==3){
        return (
            <div className='.content'>
                <Row>
                    <Col xs={6}>
                    <Heading>LOG IN TO YOUR ACCOUNT</Heading>
                    <InputGroup>
                    <InputLeftAddon>@</InputLeftAddon>
                    <Input  placeholder='Username' />
                </InputGroup>
                
                
                <InputGroup>
                    <InputLeftAddon><LockIcon/></InputLeftAddon>
                    <Input  placeholder='Password' />
                </InputGroup>
                
                
                    <Button colorScheme='green' variant='outline' onClick={setusername}>LOG IN</Button>
                    <Divider orientation='horizontal' />
                    <Button onClick={onOpen} colorScheme='green' variant='outline'>CREATE ACCOUNT</Button>
                    <Modal finalFocusRef={final_ref} isOpen={isOpen} onClose={onClose}>
    
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton onClick={move_to_load_initial}/>
                            <ModalBody justifyContent="center" >
                              <h1>SUCCESSFULL</h1>
                                         
                            </ModalBody>
                            
                        </ModalContent>
    
                    </Modal>
                    </Col>
                    <Col  xs={1}>
                    <Divider orientation='vertical' />
                    </Col>
                    <Col>
                    <h1>BOOK YOUR TICKETS NOW!</h1>
                    <Card>
                    <CardBody>
                        <Stack  spacing='4'>
                            <Box>
                                <Text>
                                    SAFE
                                </Text>
                            </Box>
                            <Box>
                                <Text>
                                    TRUST WORTHY
                                </Text>
                            </Box>
                            <Box>
                                 <Text>
                                    FAST AND EFFICIENT
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    </Card>
                    </Col>
                </Row>
            </div>
        );

    }

    

    if(load == 2){
        return (
            <div className='.content'>
                <Row>
                    <Col xs={6}>
                    <Heading>LOG IN TO YOUR ACCOUNT</Heading>
                    <InputGroup mb={4}>
                    <InputLeftAddon>@</InputLeftAddon>
                    <Input  placeholder='Username' />
                </InputGroup>
                
                
                <InputGroup mb={4}>
                    <InputLeftAddon><LockIcon/></InputLeftAddon>
                    <Input  placeholder='Password' />
                </InputGroup>
                <Button colorScheme='green' variant='outline'>LOG IN</Button>
                <Divider orientation='horizontal' />
                <Button onClick={onOpen} colorScheme='green' variant='outline'>CREATE ACCOUNT</Button>
                    <Modal finalFocusRef={final_ref}  isOpen={isOpen} onClose={onClose}>
    
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton onClick={move_to_load_initial}/>
                            <ModalBody justifyContent="center">
                            
                
                
                            <InputGroup mb={4}>
                                <InputLeftAddon><LockIcon/></InputLeftAddon>
                                <Input id="pwd" placeholder='Password' />
                            </InputGroup>
                            
                                         
                            </ModalBody>
                            <ModalFooter justifyContent="center">
                                <Button colorScheme='green' variant='outline' onClick={finish_signing_up}>FINISH</Button>  
                            </ModalFooter>
                        </ModalContent>
    
                    </Modal>
                    </Col>
                    <Col  xs={1}>
                    <Divider orientation='vertical' />
                    </Col>
                    <Col>
                    <h1>BOOK YOUR TICKETS NOW!</h1>
                    <Card>
                    <CardBody>
                        <Stack  spacing='4'>
                            <Box>
                                <Text>
                                    SAFE
                                </Text>
                            </Box>
                            <Box>
                                <Text>
                                    TRUST WORTHY
                                </Text>
                            </Box>
                            <Box>
                                 <Text>
                                    FAST AND EFFICIENT
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    </Card>
                    </Col>
                </Row>
            </div>
        );
    }

    
    if(load == 1){
        return (
            <div className='.content'>
                <Row>
                    <Col xs={6}>
                    <Heading>LOG IN TO YOUR ACCOUNT</Heading>
                    <InputGroup>
                    <InputLeftAddon>@</InputLeftAddon>
                    <Input  placeholder='Username' />
                </InputGroup>
                
                
                <InputGroup>
                    <InputLeftAddon><LockIcon/></InputLeftAddon>
                    <Input  placeholder='Password' />
                </InputGroup>
                <Button colorScheme='green' variant='outline'>LOG IN</Button>
                <Divider orientation='horizontal' />
                <Button onClick={onOpen} colorScheme='green' variant='outline'>CREATE ACCOUNT</Button>
                    <Modal finalFocusRef={final_ref} isOpen={isOpen} onClose={onClose}>
    
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody justifyContent="center">
                            
                                <Spinner color='red.500' />
    
                                
                            </ModalBody>
    
                            
                        </ModalContent>
    
                    </Modal>
                    </Col>
                    <Col  xs={1}>
                    <Divider orientation='vertical' />
                    </Col>
                    <Col>
                    <h1>BOOK YOUR TICKETS NOW!</h1>
                    <Card>
                    <CardBody>
                        <Stack  spacing='4'>
                            <Box>
                                <Text>
                                    SAFE
                                </Text>
                            </Box>
                            <Box>
                                <Text>
                                    TRUST WORTHY
                                </Text>
                            </Box>
                            <Box>
                                 <Text>
                                    FAST AND EFFICIENT
                                </Text>
                            </Box>
                        </Stack>
                    </CardBody>
                    </Card>
                    </Col>
                </Row>
            </div>
        );

    }

    
    return (
        <div className='.content'>
            <Row>
                <Col xs={6}>
                <Heading>LOG IN TO YOUR ACCOUNT</Heading>
                <InputGroup mb={4}>
                    <InputLeftAddon>@</InputLeftAddon>
                    <Input  id="username_log_in" placeholder='Username' />
                </InputGroup>
                
                
                <InputGroup mb={4}>
                    <InputLeftAddon><LockIcon/></InputLeftAddon>
                    <Input id="password_log_in" placeholder='Password' />
                </InputGroup>
                <Button onClick={log_in} colorScheme='green' variant='outline'>LOG IN</Button>
                <Divider orientation='horizontal' />
                <Button onClick={onOpen} colorScheme='green' variant='outline'>CREATE ACCOUNT</Button>
                <Modal finalFocusRef={final_ref} isOpen={isOpen} onClose={onClose}>

                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        
                        <InputGroup mb={4}>
                            <InputLeftAddon>@</InputLeftAddon>
                            <Input id="email" placeholder='Username' />
                        </InputGroup>
                
                
                        <InputGroup mb={4}>
                            <InputLeftAddon>FN</InputLeftAddon>
                            <Input id="full_name" placeholder='Full Name' />
                        </InputGroup>
                
                

                <InputGroup mb={4}>
                    <InputLeftAddon>G</InputLeftAddon>
                        <RadioGroup onChange={d} value={value}>
                            <Stack direction='row'>
                                <Radio id="male" value='1'>Male</Radio>
                                <Radio id="female"  value='2'>Female</Radio>
        
                            </Stack>
                        </RadioGroup>
                </InputGroup>
                
                <InputGroup mb={4}>
                            <InputLeftAddon>A</InputLeftAddon>
                            <Input id="age" placeholder='Age' />
                </InputGroup>
                
                
                <InputGroup mb={4}>
                            <InputLeftAddon>P</InputLeftAddon>
                            <Input id="pno" placeholder='Passport Number' />
                </InputGroup>
                

               
                <InputGroup mb={4}>
                            <InputLeftAddon>@</InputLeftAddon>
                            <Input id="adhaar" placeholder='Adhaar Number' />
                </InputGroup>
                
                
                <InputGroup mb={4}>
                            <InputLeftAddon>@</InputLeftAddon>
                            <Input id="contact" placeholder='Contact Number' />
                </InputGroup>
                <InputGroup mb={4}>
                            <InputLeftAddon>D</InputLeftAddon>
                            <HStack spacing='24px'>
                                <Input id="day" placeholder='00' onChange={observe} />
                                <Input id='month' placeholder='00' onChange={observe}/>
                                <Input id="year" placeholder='0000' onChange={observe} />

                            </HStack>
                </InputGroup>
                

                            
                        </ModalBody>

                        <ModalFooter justifyContent="center">
                            <Button colorScheme='blue' onClick={create_account}>
                                SIGN UP
                            </Button>
                        
                        </ModalFooter>
                    </ModalContent>

                </Modal>
                </Col>
                <Col  xs={1}>
                <Divider orientation='vertical' />
                </Col>
                <Col>
                <h1>BOOK YOUR TICKETS NOW!</h1>
                <Card>
                <CardBody>
                    <Stack  spacing='4'>
                        <Box>
                            <Text>
                                SAFE
                            </Text>
                        </Box>
                        <Box>
                            <Text>
                                TRUST WORTHY
                            </Text>
                        </Box>
                        <Box>
                             <Text>
                                FAST AND EFFICIENT
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
                </Card>
                </Col>
            </Row>
        </div>
    );
}
export default Book_tickets;