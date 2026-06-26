import HeaderImage from "../assets/AlmaBetterPreview.png";

const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 h-13 flex flex-col align-center justify-center">
      <img src={HeaderImage} alt="Logo" className="w-40 h-10" />
    </div>
  );
};

export default Header;
