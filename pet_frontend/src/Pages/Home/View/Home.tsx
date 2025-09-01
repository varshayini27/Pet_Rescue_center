import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/NavBar';
import { BannerButton } from '../Components/BannerButton';
import PetProfiles from '../Components/PetProfile';
import type { ReduxState } from '../../../Components/types/redux';
import { useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { Divider } from '@mui/material';

export default function Home() {
    const token = useSelector((state: ReduxState) => state?.auth?.token);
    const role = useSelector((state: ReduxState) => state?.auth?.role);
    const rescueCenter = useSelector((state: ReduxState) => state?.auth?.rescueCenter);

  const navigate = useNavigate();
  console.log({token})
  console.log({role})
  console.log({rescueCenter})
  const handleReportClick = () => {
    navigate("/report"); 
  };

   return (
    <>
      <Navbar />
     
      <div style={{ backgroundColor: '#d8f1d3', minHeight: '200px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '60px 10%',
          }}
        >
          <img src="/assets/Hero.png" alt="Stray" style={{ width: '500px' }} />
          <div>
            <h4>Report a Stray. Save a Life.</h4>
            <h1 style={{ fontSize: '60px' }}>Do You See<br />Them Too?</h1>
            <p style={{ maxWidth: '450px' }}>
              Every day, countless innocent lives wander our streets lost, abandoned, hungry. Some wait by dusty
              roadsides, hoping for the kind touch of a stranger. Some hide in shadows, afraid of what the world has
              shown them so far. Each one has a story.
            </p>
            
             < BannerButton onClick={handleReportClick}>
              REPORT
              </BannerButton>
          </div>
        </div>
        
      </div>
      <h2 style={{ textAlign: 'center', color: 'green' }}>pet profiles</h2>
        <PetProfiles />
        <Divider/>
      <Footer />

    </>
  );
};

