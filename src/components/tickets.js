import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate } from "react-router-dom"
import { createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Text, Stack, Box, Heading, HStack, VStack } from '@chakra-ui/react'
import { Input, InputLeftAddon, InputGroup } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'

import { Spinner } from '@chakra-ui/react'

function T() {
    const [params] = useSearchParams()
    const n = useNavigate()
    const [username, setUsername] = useState(params.get("username"))
    const [gender, setGender] = useState(params.get("gender"))
    const [full_name, setFullName] = useState(params.get("full_name"))
    const [age, setAge] = useState(params.get("age"))
    const [pno, setPno] = useState(params.get("passport_no"))
    const [adno, setAdno] = useState(params.get("adhaar_number"))
    const [contact, setContact] = useState(params.get("contact_no"))
    const [password, setPassword] = useState(params.get("password"))
    const [month_val, setMonth_val] = useState(params.get("month"))
    const [day_val, setDay_val] = useState(params.get("day"))
    const [year_val, setYear_val] = useState(params.get("year"))
    const [flight_month, setFlight_month] = useState(params.get("flight_month"))
    const [flight_day, setFlight_day] = useState(params.get("flight_day"))
    const [flight_year, setFlight_year] = useState(params.get("flight_year"))
    const [start, setStart] = useState(params.get("start"))
    const [end, setEnd] = useState(params.get("end"))
    const [flight_number, setFlight_number] = useState(params.get("flight_number"))
    const [company, setCompany] = useState(params.get("company"))
    const [avl_seats, setAvl_seats] = useState(params.get("avl_seats"))
    const [time, setTime] = useState(params.get("time"))
    const [rows, setRows] = useState(params.get("rows"))
    const [cols, setCols] = useState(params.get("cols"))
    const [gap_one, setGap_one] = useState(params.get("gap_one"))
    const [gap_two, setGap_two] = useState(params.get("gap_two"))
    const [seats, setSeats] = useState(JSON.parse(params.get("seats")))
    const [cost, setCost] = useState(JSON.parse(params.get("cost")))
    const [passenger_names, setPassenger_names] = useState(JSON.parse(params.get("passenger_names")))
    const [passenger_ages, setPassenger_ages] = useState(JSON.parse(params.get("passenger_ages")))
    const [load, setLoad] = useState(0)

    const cancel_booking = async () => {
        let fr_data = { month: flight_month, day: flight_day, year: flight_year, start: start, end: end }
        let res = await fetch("http://localhost:8000/get_flight_travels_current", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(fr_data),
        })

        let rgyu = await res.json()
        console.log(rgyu)
        let flights = []
        let ards = rgyu.success
        for (let hre = 0; hre < ards.length; hre++) {
            flights.push(ards[hre])
        }
        console.log(flights)
        n({
            pathname: "/flights_info",
            search: createSearchParams({
                username: username,
                gender: gender,
                full_name: full_name,
                age: age,
                passport_no: pno,
                adhaar_number: adno,
                contact_no: contact,
                password: password,
                month: month_val,
                day: day_val,
                year: year_val,
                flight_month: flight_month,
                flight_day: flight_day,
                flight_year: flight_year,
                start: start,
                end: end,
                flights: JSON.stringify(flights),
            }).toString()
        })
    }

    const send_mail = async () => {
        let fr_data = {
            email: username,
            flight_number: flight_number,
            flight_month: flight_month,
            flight_day: flight_day,
            flight_year: flight_year,
            time: time,
            passengers: passenger_names.length,
            passenger_names: passenger_names,
            passenger_ages: passenger_ages,
        }
        setLoad(1)
        let res = await fetch("http://localhost:8000/send_mail", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fr_data),
        })
        setLoad(0)
    }

    if (load === 1) {
        return (
            <div>
                <Text>YOUR TICKETS</Text>

                {[...passenger_names].map((index, value) => (
                    <Card key={value}>
                        <CardBody>
                            <HStack spacing='24px'>
                                <Text>PASSENGER {value + 1}</Text>
                                <Text > NAME : {index}</Text>
                                <Text>AGE : {passenger_ages[value]}</Text>
                            </HStack>
                        </CardBody>
                    </Card>
                ))}

                <Card>
                    <CardBody>
                        <HStack spacing='24px'>
                            <Text>SEATS ARE :</Text>
                            {[...seats].map((index, value) => (
                                <Text key={value}>{index}</Text>
                            ))}
                        </HStack>
                    </CardBody>
                </Card>

                <Divider orientation='horizontal' />

                <Text> RS . {cost}</Text>
                <Spinner color='red.500' />
                <Button onClick={cancel_booking}>GO HOME</Button>

            </div>
        )
    }
    return (
        <div>
            <Text>YOUR TICKETS</Text>

            {[...passenger_names].map((index, value) => (
                <Card key={value}>
                    <CardBody>
                        <HStack spacing='24px'>
                            <Text>PASSENGER {value + 1}</Text>
                            <Text > NAME : {index}</Text>
                            <Text>AGE : {passenger_ages[value]}</Text>
                        </HStack>
                    </CardBody>
                </Card>
            ))}

            <Card>
                <CardBody>
                    <HStack spacing='24px'>
                        <Text>SEATS ARE :</Text>
                        {[...seats].map((index, value) => (
                            <Text key={value}>{index}</Text>
                        ))}
                    </HStack>
                </CardBody>
            </Card>

            <Divider orientation='horizontal' />

            <Text> RS . {cost}</Text>
            <Button onClick={send_mail}>SEND EMAIL</Button>
            <Button onClick={cancel_booking}>GO HOME</Button>

        </div>
    )
}

export default T;