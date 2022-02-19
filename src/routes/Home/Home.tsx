import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Center, Title, Input, TextInput, Button } from '@mantine/core';
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
            name: (value) => /^\S*$/.test(value),
            roomID: (value) => /^\S{5}$/.test(value),
        },
    });

    useEffect(() => {
        setButtonString(form.values.roomID ? 'Join Room' : 'Create Room');
    }, [form]);

    return (
        <Container style={{ height: '100vh' }}>
            <Center style={{ height: '100%', flexDirection: 'column' }}>
                <Title>Control</Title>
                <FadeIn>
                    <div>A hangman-esque multiplayer game</div>
                    <Center>
                        <form
                            onSubmit={form.onSubmit((values) => {
                                navigate('room', { state: values });
                            })}
                        >
                            <TextInput
                                variant='unstyled'
                                size='xl'
                                placeholder='Name'
                                {...form.getInputProps('name')}
                            />

                            <TextInput
                                variant='unstyled'
                                size='xl'
                                placeholder='Room ID'
                                {...form.getInputProps('roomID')}
                            />

                            <Button type='submit'>{buttonString}</Button>
                        </form>
                    </Center>
                </FadeIn>
            </Center>
        </Container>
    );
}
