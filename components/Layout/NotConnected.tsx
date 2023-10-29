import React from 'react';

import {Button, Card, Text, VStack} from "@chakra-ui/react";

import Welcome from "@/components/Welcome";

import SignInWithGoogleButton from "@/components/Navbar/SignInWithGoogleButton";

import useAuth from "@/hooks/auth/useAuth";

const NotConnected = () => {

    const { useDefaultUser } = useAuth();

    return (
        <VStack
            flex={1}
            justifyContent={'center'}
        >
            <Card
                p={16}
            >
                <VStack>
                    <Welcome />
                    <VStack>
                        <Text
                            textAlign={'center'}
                            fontSize={{
                                base: 'xs',
                                md: 'md'
                            }}
                        >
                            Get started by logging in with your vanderbilt.edu email
                        </Text>
                        <SignInWithGoogleButton />
                        <Text
                            textAlign={'center'}
                            fontSize={{
                                base: 'xs',
                                md: 'md'
                            }}
                        >
                            If you want to try the app without logging in
                        </Text>
                        <Button
                            onClick={useDefaultUser}
                        >
                            Test as Guest
                        </Button>
                    </VStack>
                </VStack>
            </Card>
        </VStack>
    );
};

export default NotConnected;
