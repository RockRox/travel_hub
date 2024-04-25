import React from 'react';
import { Card, CardBody, Text,VStack ,HStack, Box } from '@chakra-ui/react';

function A() {
    return (
        <div className='content' >
            <p>ABOUT PAGE</p>
            <VStack spacing='50px'>
                <Card className="card">
                    <CardBody>
                        <Text>
                            Travel Hub is your go-to destination for seamless flight bookings and unparalleled travel experiences. With a vast network of airlines and destinations, our user-friendly platform simplifies the booking process, allowing you to explore the world with ease. From flexible payment options to round-the-clock customer support, we're dedicated to ensuring your journey is smooth from start to finish. Join the Travel Hub community today and let us help you turn your travel dreams into reality.Travel Hub isn't just a booking platform; it's your trusted travel companion, providing you with insider tips, destination guides, and personalized recommendations to enhance every aspect of your trip. Whether you're planning a spontaneous weekend getaway or a once-in-a-lifetime adventure, Travel Hub's innovative features and curated content ensure that every journey is unforgettable. Join us and embark on a world of possibilities, where every destination is within reach and every moment is filled with excitement.
                        </Text>
                    </CardBody>
                </Card>
                <HStack spacing='24px' className="card-container">
                    <Box position="relative">
                        <Card className="card">
                            <CardBody>
                                <Text>
                                    "Travel Hub made booking my flights a breeze! The platform is so easy to use, and I love the variety of destinations available."
                                </Text>
                                <Text>- Sarah Johnson</Text>
                            </CardBody>
                        </Card>
                    </Box>
                    <Box position="relative">
                        <Card className="card">
                            <CardBody>
                                <Text>
                                    "I've been using Travel Hub for all my travel needs, and I couldn't be happier. The customer support is fantastic, and I always find great deals on flights."
                                </Text>
                                <Text>- John Smith</Text>
                            </CardBody>
                        </Card>
                    </Box>
                    <Box position="relative">
                        <Card className="card">
                            <CardBody>
                                <Text>
                                    "Thanks to Travel Hub, I was able to plan my dream vacation without any hassle. The platform offers a wide range of options, and the booking process is seamless."
                                </Text>
                                <Text>- Emily Brown</Text>
                            </CardBody>
                        </Card>
                    </Box>
                </HStack>
            </VStack>
        </div>
    );
}

export default A;