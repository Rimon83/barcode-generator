import { useNavigate } from "react-router-dom";



export default function NotFound() {
 const navigate = useNavigate()
 const handleClickButton = () => {
   navigate("/");
 };
  return (
    <div className="flex flex-col gap-8 p-8 max-w-3xl">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <div>
        <button
          className="bg-yellow-500 px-6 py-3 rounded-md text-lg hover:bg-yellow-600 transition duration-300"
          onClick={handleClickButton}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
