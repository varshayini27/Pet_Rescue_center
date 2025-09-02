import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent } from '@mui/material';
import dummy from "../../../../assets/dummy-profile.jpg";
import { rescueCenters } from '../../../AboutUs/View/aboutUs';
import Navbar from '../../../../Components/NavBar';



interface Center {
  id: string;
  name: string;
  location: string;
  image: string;
}

export default function DonationPage() {
  const [centers, setCenters] = useState<Center[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(rescueCenters){
        setCenters(rescueCenters);

    }
  }, []);

  return (
    <>
      <Navbar />
    <div style={{ padding: '30px', backgroundColor: '#F2F4F7' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#084C11' }}>
        Donate to Rescue Centers 💚
      </Typography>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {centers.map(center => (
          <div
            key={center.id}
            onClick={() => navigate(`/donation/${center.id}`)}
            style={{
              width: '300px',
              border: '2px solid #084C11',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: 'white'
            }}
          >
            <img
              src={center?.image || dummy}
              alt={center.name}
              style={{ width: '300px', height: '250px', objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6">{center.name}</Typography>
              <Typography variant="body2">{center.location}</Typography>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
    </>

  );
}
