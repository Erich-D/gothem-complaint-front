import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComplaintsPage } from './pages/complaints-page';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { MeetingsPage } from './pages/meetings-page';

const queryClient = new QueryClient();


function App() {
  return( 
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage/>}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/complaints'} element={<ComplaintsPage/>}/>
          <Route path={'/meetings'} element={<MeetingsPage/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    );
}

export default App;
