import React from 'react';
import { styled, useTheme, type Theme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { type AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link as RouterLink } from 'react-router-dom';
import type { CSSObject } from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChecklistIcon from '@mui/icons-material/Checklist';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmailIcon from '@mui/icons-material/Email';
import HelpIcon from '@mui/icons-material/Help';
import ListSubheader from '@mui/material/ListSubheader';
import Navbar from '../NavBar';
import { useSelector } from 'react-redux';
import type { ReduxState } from '../types/redux';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `60px`,
  [theme.breakpoints.up('sm')]: {
    width: `60px`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps & { open?: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export default function MiniDrawer({ children }: { children: React.ReactNode }) {
  const role = useSelector((state: ReduxState) => state?.auth?.role);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        {/* <Toolbar> */}
        {/* <IconButton
           // color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Pet Rescue Center
          </Typography>  */}
        <Navbar
          handleDrawerOpen={handleDrawerOpen}
        />
        {/* </Toolbar> */}
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Adopter Group */}

          {role === 'Adopter' && (
            <>
              <ListSubheader>Adopter</ListSubheader>
              <ListItem button key="Home" component={RouterLink as React.ElementType} to="/home ">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key="BrowsePets" component={RouterLink as React.ElementType} to="/available-pets">
                <ListItemIcon><PetsIcon /></ListItemIcon>
                <ListItemText primary="Browse Pets" />
              </ListItem>
              <ListItem button key="MyAdoptions" component={RouterLink as React.ElementType} to="/my-adoptions">
                <ListItemIcon><FavoriteIcon /></ListItemIcon>
                <ListItemText primary="My Adoptions" />
              </ListItem>
              <ListItem button key="PetCare" component={RouterLink as React.ElementType} to="/pet-care">
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="Pet Care Tips" />
              </ListItem>
              <ListItem button key="Messages" component={RouterLink as React.ElementType} to="/messages">
                <ListItemIcon><MessageIcon /></ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
              <ListItem button key="Profile" component={RouterLink as React.ElementType} to="/profile">
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <Divider />
            </>
          )}

          {/* Rescue Center Group */}
          {role === 'RescueCenter' && (
            <>
              <ListSubheader>Rescue Center</ListSubheader>
              <ListItem button key="Dashboard" component={RouterLink as React.ElementType} to="/center/dashboard">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button key="MyPets" component={RouterLink as React.ElementType} to="/center/managepet">
                <ListItemIcon><PetsIcon /></ListItemIcon>
                <ListItemText primary="Manage Pets" />
              </ListItem>
              <ListItem button key="AdoptionRequests" component={RouterLink as React.ElementType} to="/center/requests">
                <ListItemIcon><ChecklistIcon /></ListItemIcon>
                <ListItemText primary="Adoption Requests" />
              </ListItem>
              <ListItem button key="Donation Records" component={RouterLink as React.ElementType} to="/center/donation_record">
                <ListItemIcon><VaccinesIcon /></ListItemIcon>
                <ListItemText primary="Donation Records" />
              </ListItem>
              <ListItem button key="MessagesCenter" component={RouterLink as React.ElementType} to="/center/messages">
                <ListItemIcon><MessageIcon /></ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
              <ListItem button key="MyProfileCenter" component={RouterLink as React.ElementType} to="/center/profile">
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
              <Divider />
            </>
          )}

          {/* Admin Group */}
          {/* {userRole === 'admin' && ( */}
          {/* <>
   <ListSubheader>Admin</ListSubheader>
  <ListItem button key="AdminDashboard" component={RouterLink as React.ElementType} to="/admin/dashboard">
    <ListItemIcon><SettingsIcon /></ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItem>
  <ListItem button key="Users" component={RouterLink as React.ElementType} to="/admin/users">
    <ListItemIcon><GroupIcon /></ListItemIcon>
    <ListItemText primary="Users" />
  </ListItem>
  <ListItem button key="PetApprovals" component={RouterLink as React.ElementType} to="/admin/pet-approvals">
    <ListItemIcon><CheckBoxIcon /></ListItemIcon>
    <ListItemText primary="Pet Approvals" />
  </ListItem>
  <ListItem button key="Reports" component={RouterLink as React.ElementType} to="/admin/reports">
    <ListItemIcon><BarChartIcon /></ListItemIcon>
    <ListItemText primary="Reports" />
  </ListItem>
  <ListItem button key="AdminMessages" component={RouterLink as React.ElementType} to="/admin/messages">
    <ListItemIcon><MessageIcon /></ListItemIcon>
    <ListItemText primary="Messages" />
  </ListItem>
</> */}
          {/* )} */}
          {/* <Divider /> */}

          {/* General Group */}
          {/* <ListSubheader>General</ListSubheader>
          <ListItem button key="AboutUs" component={RouterLink as React.ElementType} to="/about-us">
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button key="Contact" component={RouterLink as React.ElementType} to="/contact_us">
            <ListItemIcon><EmailIcon /></ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
          <ListItem button key="FAQ" component={RouterLink as React.ElementType} to="/faq">
            <ListItemIcon><HelpIcon /></ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItem> */}
        </List>  

      </Drawer>
      <main style={{ flexGrow: 1, padding: '24px' }}>
        <DrawerHeader />
        {/* Inject page content here */}
        {children}
      </main>
    </div>
  );
}

