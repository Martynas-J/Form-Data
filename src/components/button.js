const ButtonElement = ({ text, onclick }) => {
  return (
    <button
      onClick={onclick}
      className="bg-gradient-to-r from-gray-500 to-blue-500 hover:from-blue-500 hover:to-gray-500 text-white font-bold py-2 px-4 rounded hover:text-red-300 "
    >
      {text}
    </button>
  );
};
export default ButtonElement;
