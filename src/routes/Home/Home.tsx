import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Center, Text, Title, Input, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import FadeIn from 'react-fade-in';

export default function Home() {
    const navigate = useNavigate();
    const [buttonString, setButtonString] = useState('Join Room');

    const form = useForm({
        initialValues: {
            name: '',
            roomID: '',
        },

        validationRules: {
            name: (value) => /^.+$/.test(value),
            roomID: (value) => /^\S{5}|.{0}$/.test(value),
        },
    });

    useEffect(() => {
        setButtonString(form.values.roomID ? 'Join Room' : 'Create Room');
    }, [form]);

    function createRoomID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    return (
        <Container style={{ height: '100vh' }}>
            <Center style={{ height: '100%', flexDirection: 'column' }}>
                <Text
                    component='span'
                    align='center'
                    variant='gradient'
                    gradient={{ from: 'red', to: 'indigo', deg: 60 }}
                    weight={700}
                    style={{ fontSize: 90 }}
                >
                    Flipgrid
                </Text>
                <FadeIn>
                    <Title>A fast-paced multiplayer game</Title>
                    <Center>
                        <form
                            onSubmit={form.onSubmit((values) => {
                                if (!values.roomID) {
                                    values.roomID = createRoomID();
                                }
                                values.roomID = values.roomID.toUpperCase();
                                navigate('room', { state: values });
                            })}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: 10,
                                marginTop: 10,
                            }}
                        >
                            <TextInput
                                // variant='unstyled'
                                size='xl'
                                radius='lg'
                                placeholder='Name'
                                {...form.getInputProps('name')}
                            />

                            <TextInput
                                // variant='unstyled'
                                size='xl'
                                radius='lg'
                                placeholder='Room ID'
                                {...form.getInputProps('roomID')}
                            />

                            <Button
                                type='submit'
                                radius='lg'
                                style={{
                                    width: 300,
                                    height: 50,
                                    fontSize: 24,
                                }}
                            >
                                {buttonString}
                            </Button>
                        </form>
                    </Center>
                </FadeIn>
            </Center>
        </Container>
    );
}
