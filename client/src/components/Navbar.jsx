import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 flex gap-4 border-b border-gray-300 w-screen text-l bg-[#F0622D] text-white overflow-hidden ">
      <div className="items-left flex justify-start">
        <button className="border border-rounded cursor:pointer flex justify-start  border-[#b91001] border-[2px] bg-[#ff4b33] ml-auto items-center rounded-md hover:text-slate-700 duration-[200ms] hover:bg-[#FFC067]">
           <Link to ="/" className="gap-1 px-4 py-1"><i className="fa-solid fa-house-chimney"></i> Home</Link>
           </button>
      </div>
      <div className="items-right flex ml-auto gap-4">
      <button className="border border-rounded border-[2px] cursor-pointer flex justify-end border-[#b91001] bg-[#ff4b33] items-center rounded-md hover:text-slate-700 duration-[200ms] hover:bg-[#FFC067]">
        <Link to="/login" className="gap-1 px-4 py-1"><i className="fa-solid fa-door-open"></i> Login</Link>
      </button>
      <button className="border border-rounded cursor-pointer border-[2px] border-[#b91001] bg-[#ff4b33] items-center rounded-md hover:text-slate-700 duration-[200ms] hover:bg-[#FFC067]">
        <Link to="/register" className="gap-1 px-4 py-1"><i className="fa-solid fa-user-plus"></i> Register</Link>
      </button>
      </div>
    </nav>
  );
};

export default Navbar;
