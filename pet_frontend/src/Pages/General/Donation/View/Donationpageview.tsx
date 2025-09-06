import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent } from '@mui/material';
import dummy from "../../../../assets/dummy-profile.jpg";
import Navbar from '../../../../Components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import type { ReduxState } from '../../../../Components/types/redux';
import { fetchRescueCenters } from '../../../../Services/fetch';

export default function DonationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rescueCenters } = useSelector((state: ReduxState) => state.rescueCenter);
  useEffect(() => {
    fetchRescueCenters(dispatch)
  }, [dispatch])

  return (
    <>
      <Navbar />
      <div style={{ padding: '30px', backgroundColor: '#F2F4F7' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#084C11' }}>
          Donate to Rescue Centers 💚
        </Typography>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {rescueCenters?.map(center => (
            <div
              key={center.center_id}
              onClick={() => navigate(`/donation/${center.center_id}`)}
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
                src={center?.image_url || dummy}
                alt={center.name}
                style={{ width: '300px', height: '250px', objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6">{center.name}</Typography>
                <Typography variant="body2">{center.province}</Typography>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </>

  );
}
