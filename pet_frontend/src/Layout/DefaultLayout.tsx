import React from 'react';
import MiniDrawer from '../Components/Layout/MiniDrawer';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MiniDrawer>
      {children}
    </MiniDrawer>
  );
};

export default DefaultLayout;
