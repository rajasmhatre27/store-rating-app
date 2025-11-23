import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black">
      <h1 className="text-5xl font-bold mb-4">Store Rating App</h1>
      <p className="text-xl mb-8">Rate your favorite stores instantly.</p>

      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="bg-transparent border-2  border-e-black px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-white hover:text-blue-600">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
