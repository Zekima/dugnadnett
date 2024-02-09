import { FaHandsHelping } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="flex p-5 2xl:px-0 justify-between m-auto max-w-[1300px]">
      <div className="flex items-center gap-1">
        <FaHandsHelping size="20" />
        <h1>DugnadNett</h1>
      </div>
      <p>Login/Register</p>
    </div>
  );
};

export default NavBar;
