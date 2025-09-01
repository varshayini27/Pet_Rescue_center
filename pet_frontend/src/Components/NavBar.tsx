import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { FaPaw } from "react-icons/fa";
import { MenuIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../redux/authSlice";
import LogoutConfirmModal from "./Commen/LogoutConfirmationPopUp";
import { useState } from "react";

interface NavbarProps {
  handleDrawerOpen?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleDrawerOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, role, rescueCenter } = useSelector((state: any) => state.auth);

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/");
    setShowModal(false);
  };

  return (
    <nav
      style={{
        backgroundColor: "#084C11",
        color: "#fff",
        padding: "12px 30px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {handleDrawerOpen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <FaPaw size={24} />
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>HOME</Link>
        <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>ABOUT US</Link>
        <Link to="/profiles" style={{ color: "#fff", textDecoration: "none" }}>PROFILES</Link>
        <Link to="/contact_us" style={{ color: "#fff", textDecoration: "none" }}>CONTACT</Link>
        {token && (
        <Link to="/donation" style={{ color: "#fff", textDecoration: "none" }}>DONATION</Link>
        )}
        {token && role === "RescueCenter" && (
          <Link to="/center/dashboard" style={{ color: "#fff", textDecoration: "none" }}>RESCUECENTERS</Link>
        )}
      </div>

      <div>
        {token ? (
          <>
            <Button
              style={{ backgroundColor: "#FF0000", color: "#fff" }}
              onClick={() => setShowModal(true)}  
            >
              LOGOUT
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button style={{ backgroundColor: "#226918", color: "#fff", marginRight: "8px" }}>LOGIN</Button>
            </Link>
            <Link to="/signin">
              <Button style={{ backgroundColor: "#FFA500", color: "#fff" }}>SIGN UP</Button>
            </Link>
          </>
        )}

        <LogoutConfirmModal
          onLogout={handleLogout}
          onClose={() => setShowModal(false)}
          showModal={showModal}
        />
      </div>
    </nav>
  );
};

export default Navbar;
