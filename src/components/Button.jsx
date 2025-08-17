import { useNavigate } from "react-router-dom";

function Button({ children, onClick, type = "button", to = null }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-green-400 hover:scale-105 transition-all duration-300"
    >
      {children}
    </button>
  );
}

export default Button;
