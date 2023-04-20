import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/Login';
import Register from './features/users/Register';
import Layout from './components/UI/Layout/Layout';
import HotelsPage from './features/hotels/HotelsPage';
import notFoundImage from './assets/images/notFound.jpg';
import HotelForm from './features/hotels/components/HotelForm';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import Profile from './containers/Profile';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path={'/'} element={<HotelsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addHotel"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'hotel')}>
                <HotelForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAllowed={user && Boolean(user)}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <img src={notFoundImage} alt="not found" style={{ marginTop: '7px', width: '100%', height: 'auto' }} />
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
