import { useNavigate } from "react-router";

const NavBar = ({ nameOfUser }: any) => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="navbar">
      <p className="welcome-text">Welcome {nameOfUser}</p>
      <button className="logout-button" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
};

export default NavBar;
