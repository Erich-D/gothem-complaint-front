import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComplaintPage } from './pages/complaint-page';
import { ComplaintsPage } from './pages/complaints-page';
import { CreateMeetingPage } from './pages/create-meeting-page';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { MeetingPage } from './pages/meeting-page';
import { MeetingsPage } from './pages/meetings-page';

const queryClient = new QueryClient();


function App() {
  return( 
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomePage/>}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/complaint'} element={<ComplaintPage/>}/>
          <Route path={'/complaints'} element={<ComplaintsPage/>}/>
          <Route path={'/meetings'} element={<MeetingsPage/>}/>
          <Route path={'/meetings/:meetingid'} element={<MeetingPage/>}/>
          <Route path={'/meetings/meeting'} element={<CreateMeetingPage/>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    );
}

export default App;
