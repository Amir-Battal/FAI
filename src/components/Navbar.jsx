import "../index.css"
import FaiLogo from "./FaiLogo";

const Navbar = () => {

  return (
    <div className="w-full px-15 pt-5">
      <nav className="relative w-full flex flex-row justify-between z-2">
        <FaiLogo />
        <ul className="w-1/2 flex flex-row justify-between items-center text-xl text-[#fff] font-[Naskh]">
          <li><h4>تسوق</h4></li>
          <li><h4>قصة النجاح</h4></li>
          <li><h4>تواصل معنا</h4></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
