import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import Room from './routes/Room/Room';
import NoMatch from './routes/NoMatch/NoMatch';

export default function App() {
    return (
        <MantineProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/room'>
                        <Route
                            path=':id'
                            element={
                                <Room />
                            }
                        />
                    </Route>
                    <Route path='*' element={<NoMatch />} />
                </Routes>
            </Router>
        </MantineProvider>
    );
}
