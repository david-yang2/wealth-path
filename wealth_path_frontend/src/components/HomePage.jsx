import homepageImage from "../assets/homepage.png"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    return (
    <div className="flex flex-row">
        <div id="homepageText"className="border-2 border-red-600 w-1/2 flex flex-col justify-evenly items-center px-8">
            <div className="text-5xl text-center font-bold">Welcome to Wealth Path</div>
            <div className="text-2xl text-center">Manage your finances and plan for the future</div>
            <button className="bg-blue-500 py-2 px-3 text-white rounded-md" onClick={() => navigate("/login")}> Get Started </button>
        </div>
        <img src={homepageImage} alt="homepage"
            className=" w-1/2 h-full border-2 border-red-600" />
        
    </div>
    )
}

export default HomePage