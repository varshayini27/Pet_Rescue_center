import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../Layout/DefaultLayout';
import RegisterChoicePage from '../Pages/AuthPage/Signin';
import AdoptionRequestPage from '../Pages/RescueCeter/Adoption_Request/RequestPage';
import RescueCenterRegister from '../Pages/AuthPage/RescueRegistration';
import ContactUsForm from '../Pages/General/ContactUs/View/Contact_us';
import UserRegister from '../Pages/AuthPage/UserRegistrationForm';
import Home from '../Pages/Home/View/Home';
import PetProfiles from '../Pages/Home/Components/PetProfile';
import DonationPage from '../Pages/General/Donation/View/Donationpageview';
import Login from '../Pages/AuthPage/Login';
import ReportView from '../Pages/Report/View/ReportView';
import PetTable from '../Pages/RescueCeter/ManagePets/View/ManagePetsview';
import PetProfilesPage from '../Pages/Profile/View/PetProfiles';
import Dashboard from '../Pages/Dashboard/View/Dashboard';
import AboutUs from '../Pages/AboutUs/View/aboutUs';
import DonationRecord from '../Pages/RescueCeter/DonationRecord/View/DonationRecord';
import ContactUs from '../Pages/ContactUs/View/ContactUs';
import RescueCenterDetailPage from '../Pages/General/Donation/Component/DonationForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/profiles" element={<PetProfilesPage />} />
      <Route path="/PetProfile" element={<PetProfiles />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/center/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
      <Route path="/center/managepet" element={<DefaultLayout><PetTable /></DefaultLayout>} />
      <Route path="/center/requests" element={<DefaultLayout>< AdoptionRequestPage /></DefaultLayout>} />
      <Route path="/center/donation_record" element={<DefaultLayout><DonationRecord /></DefaultLayout>} />
      <Route path="/signin" element={< RegisterChoicePage />} />
      <Route path="/signin/register_rescue" element={< RescueCenterRegister />} />
      <Route path="/signin/register_user" element={< UserRegister />} />
      <Route path="/report" element={<ReportView />} />
      <Route path="/contact_us" element={<ContactUs />} />
      <Route path="/donation" element={<DonationPage />} />
      <Route path="/donation/:centerId" element={<RescueCenterDetailPage />} />

      {/* <Route path="/rescue-centers" element={<DefaultLayout><RescueCenters /></DefaultLayout>} />
      <Route path="/adoptions" element={<DefaultLayout><Adoptions /></DefaultLayout>} />
      <Route path="/about" element={<DefaultLayout><About /></DefaultLayout>} />  */}
    </Routes>
  );
};

export default AppRoutes;
