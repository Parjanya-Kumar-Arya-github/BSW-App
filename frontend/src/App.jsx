import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home';
import FAQs from './Pages/FAQs';
import LanguageMentorship from './Pages/LanguageMentorship';

import AlumniMentorship from './Pages/AlumniMentorship';
import Events from './Pages/Events';
import Scoops from './Pages/Scoops';
import CareerCounselling from './Pages/CareerCounselling';
import QuestionPapers from './Pages/QuestionPapers';
import Diary from './Pages/Diary';
import Booklets from './Pages/Booklets';
import HealthInsurance from './Pages/HealthInsurance';

import QuickLinks from './Pages/QuickLinks';
import Forms from './Pages/Forms';
import EmergencyContacts from './Pages/EmergencyContacts';
import Loans from './Pages/Loans';
import DelhiDarshan from './Pages/DelhiDarshan';
import Speranza from './Pages/Speranza';
import Orientation from './Pages/Orientation';
import ScrollToTop from './common/ScrollToTop';
import NotFound from './Pages/NotFound';
import JoinGoogleGroup from './Pages/JoinNotices';
import IITDNoticeForm from './Pages/IITDNoticeForm';
import Signup from './Pages/Auth/Signup';
import VerifyEmail from './Pages/Auth/VerifyEmail';
import EmailSent from './Pages/Auth/EmailSent';
import Login from './Pages/Auth/Login';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import ScrollToHash from './Components/ScrollToHash';
import ProfilePage from './Pages/User/ProfilePage';
import PublicRoute from './Pages/User/PublicRoute';
import ProtectedRoute from './Pages/User/ProtectedRoute';
import TeamPage from './Components/TeamPage/TeamPage';
import Credits from './Pages/Credits';

function App() {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      "/": "Home | BSW IIT Delhi",
      "/login": "Login | BSW IIT Delhi",
      "/signup": "Create Account | BSW IIT Delhi",
      "/email-sent": "Email Sent | BSW IIT Delhi",
      "/verifyEmail": "Verify Email | BSW IIT Delhi",
      "/forgotPassword": "Forgot Password | BSW IIT Delhi",
      "/resetPassword": "Reset Password | BSW IIT Delhi",
      "/profile": "My Profile | BSW IIT Delhi",
      "/aboutus": "Meet the Team | BSW IIT Delhi",
      "/faqs": "Frequently Asked Questions",
      "/language-mentorship": "Language Mentorship",
      "/mentorship/alumni": "Alumni Mentorship",
      "/events": "Events & Activities",
      "/scoops": "BSW Scoops",
      "/career-counselling": "Career Counselling",
      "/question-papers": "Question Papers | Resource Stack",
      "/diary": "Student Diary",
      "/booklets": "Information Booklets",
      "/health-insurance": "Health Insurance Info",
      "/quick-links": "Important Quick Links",
      "/forms": "Forms & Downloads",
      "/emergency-contacts": "Emergency Contacts",
      "/loans": "Student Loans & Financial Aid",
      "/delhi-darshan": "Delhi Darshan",
      "/speranza": "Speranza Festival",
      "/orientation": "Orientation 2025",
      "/joinNotices": "Join Google Groups",
      "/noticesForm": "IITD Notice Form",
    };

    const currentTitle = routeTitles[location.pathname] || "BSW IIT Delhi";
    document.title = currentTitle;
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Layout />}>
          
          {/* --- GUEST ONLY ROUTES (Redirects to Home/Dashboard if logged in) --- */}
          <Route element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="email-sent" element={<EmailSent />} />
            <Route path="verifyEmail" element={<VerifyEmail />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="resetPassword" element={<ResetPassword />} />
          </Route>

          {/* --- PROTECTED ROUTES (Redirects to Login if not logged in) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* --- OPEN ROUTES (Accessible by everyone) --- */}
          <Route index element={<Home />} />
          <Route path="aboutus" element={<TeamPage />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="language-mentorship" element={<LanguageMentorship />} />
          <Route path="mentorship/alumni" element={<AlumniMentorship />} />

          {/* Operations */}
          <Route path="events" element={<Events />} />
          <Route path="scoops" element={<Scoops />} />
          <Route path="career-counselling" element={<CareerCounselling />} />

          {/* Resources */}
          <Route path="question-papers" element={<QuestionPapers />} />
          <Route path="diary" element={<Diary />} />
          <Route path="booklets" element={<Booklets />} />
          <Route path="health-insurance" element={<HealthInsurance />} />
          <Route path="quick-links" element={<QuickLinks />} />
          <Route path="forms" element={<Forms />} />
          <Route path="emergency-contacts" element={<EmergencyContacts />} />
          <Route path="loans" element={<Loans />} />

          <Route path="delhi-darshan" element={<DelhiDarshan />} />
          <Route path="speranza" element={<Speranza />} />
          <Route path="orientation" element={<Orientation />} />
          <Route path="joinNotices" element={<JoinGoogleGroup />} />
          <Route path="noticesForm" element={<IITDNoticeForm />} />
          <Route path='/dev-team' element={<Credits />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;