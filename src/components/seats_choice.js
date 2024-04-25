import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {Navigate} from "react-router-dom";
import { createSearchParams,useSearchParams,useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';

import { Button, ButtonGroup } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter,Text,Stack,Box,Heading,HStack, VStack} from '@chakra-ui/react';
import { Input ,InputLeftAddon,InputGroup } from '@chakra-ui/react';



import './selection.css';
import { Spinner } from '@chakra-ui/react';
function Seats(){
    let [params] = useSearchParams();
    let n = useNavigate();
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
    console.log(price);

    let [passenger_names,set_npn] = useState(JSON.parse(params.get("passenger_names")));
    let [passenger_ages,set_npa] = useState(JSON.parse(params.get("passenger_ages")));
    let [green,set_green] = useState([]);
    let [load,set_load] = useState(0);

    
    console.log("seats are");
    console.log(seats);

    let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let seat_collection=[];
    let grey_seats = [];
    for(let arfd = 0;arfd<seats.length;arfd++){
        let numb = '';
        let rgdf = seats[arfd].seat;
        for(let ccsd = 0;ccsd<rgdf.length-1;ccsd++){
            numb += rgdf[ccsd];
        }

        let chard = rgdf[rgdf.length-1];

        let iip = parseInt(numb);
        let value_alpha=0;
        for(let rrwq=0;rrwq<26;rrwq++){
            if(alpha[rrwq] == chard){
                value_alpha=rrwq;
                break;
            }

        }
        let arry=[iip,value_alpha+1,rgdf];
        grey_seats.push(rgdf);
        seat_collection.push(arry);


    }
    console.log(seat_collection);
    let [grey,set_grey] = useState([...grey_seats]);

    let clicking_of_seat = (e)=>{

        let abg = e.target.id;
        let ind=0;

        let gr = [...grey];
        let gt = [...green];

        for(let ax = 0;ax<gr.length;ax++){
            if(gr[ax] == e.target.id){
                ind=1;
                break;
            }
        }

        for(let erds = 0;erds<gt.length;erds++){
            if(gt[erds] == e.target.id){
                ind=2;
                break;
            }
        }

        if(ind == 1){
            gt.push(e.target.id);

            let rrsd = [];

            for(let kkop=0;kkop<gr.length;kkop++){
                if(gr[kkop] == e.target.id){
                    continue;
                }
                else{
                    rrsd.push(gr[kkop]);
                }
            }

            console.log(rrsd);
            console.log(gt)

            set_green(gt);
            set_grey(rrsd);

        }

        if(ind == 2){
            gr.push(e.target.id);

            let rrsd = [];

            for(let kkop=0;kkop<gt.length;kkop++){
                if(gt[kkop] == e.target.id){
                    continue;
                }
                else{
                    rrsd.push(gt[kkop]);
                }
            }

            console.log(rrsd);
            console.log(gr);

            set_green(rrsd);
            set_grey(gr);

        }
        
        


    }

    console.log(seat_collection);
    let box = [];

    let ri = parseInt(rows);
    let ci = parseInt(cols);
    for(let k=0;k<ci;k++){
        let arrdf=[];
        for(let tte = 0;tte<ri;tte++){
            let indica=0;
            let strp='';
            let row_val = k+1;
            let col_val = tte+1;
            for(let rrg=0;rrg<seat_collection.length;rrg++){

                let rryu = seat_collection[rrg];
                if(rryu[0] == col_val && rryu[1] == row_val){
                    indica=1;
                    strp = rryu[2];
                    break;

                }

            }

            



            if(indica==1){

                let identifier = 0;

                for(let jjds=0;jjds<grey.length;jjds++){
                    if(strp == grey[jjds]){
                        identifier=1;
                        break;
                    }
                }

                for(let oplj = 0;oplj<green.length;oplj++){
                    if(strp == green[oplj]){
                        identifier=2;
                        break;
                    }
                }


                if(identifier == 1){
                    arrdf.push(
                        <Box key={strp} id={strp} onClick={clicking_of_seat} className='box'>
                            {strp}
                        </Box>
                    );
                }
                if(identifier == 2){
                    arrdf.push(
                        <Box key={strp} id={strp} onClick={clicking_of_seat} className='box_s'>
                            {strp}
                        </Box>
                    );

                }

                
                
            }
            else{
                arrdf.push(
                    <Box key = {tte} className='box_x'>

                    </Box>
                );

            }


        }
        box.push(
            <div key={k} className="rkiop">
                {arrdf}
            </div>
        );
    }

    let final_book = async()=>{

        let abdf = green.length;
        if(abdf != 0){
            let kk = parseInt(price);
            let cost = kk * abdf;

            let not_select = [...grey];
            let avl_seats = not_select.length;
            let fr_data = {flight_number:flight_number,company:company,time:time,seats:not_select,avl_seats:avl_seats,start:start,end:end,flight_month:flight_month,flight_day:flight_day,flight_year:flight_year};
            set_load(1);
            let res = await fetch("http://localhost:8000/update_flight",{
                method:"POST",
                headers:{'content-type': 'application/json'},
                body:JSON.stringify(fr_data),

            });

            n({
                pathname:'/ticket',
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
                    seats:JSON.stringify([...green]),
                    passenger_names : JSON.stringify([...passenger_names]),
                    passenger_ages : JSON.stringify([...passenger_ages]),
                    cost:cost,
    
                    
    
                    
    
                    
                    
    
                }).toString()
    
            })
    
            
        }

        

    }
    let cancel_booking = async()=>{
        
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

    if(load == 1){
        return (
            <div id="parent" className='bdy'>
                {box}
    
                <VStack>
                    <Spinner color='red.500' />
    
                          
                </VStack>
                
    
            </div>
        );
        

    }

    return (
        <div id="parent" className='bdy'>
            {box}

            <VStack>
                <Button onClick={final_book}>BOOK TICKETS</Button>

                <Button onClick={cancel_booking}>CANCEL BOOKING</Button>        
            </VStack>
            

        </div>
    );
}
export default Seats;