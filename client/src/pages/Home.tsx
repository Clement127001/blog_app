import { Button } from "@/components/ui/button";
import { UseLogin } from "@/contexts/LoginProvider";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isLoggedIn } = UseLogin();

  return (
    <div className="w-[60%] mx-auto h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-md">
        <img src="/assets/logo.svg" width={80} height={80} />
        <h1 className="text-4xl font-sans font-semibold">Explore Blogs</h1>
        <p className="tracking-wide leading-relaxed max-w-[500px]">
          Welcome to our Blog! Dive into a curated collection of articles
          covering everything from career growth and productivity to industry
          trends and personal development. Whether you're here to learn, get
          inspired, or stay updated, our blog has something for everyone.
        </p>

        <Link to={isLoggedIn ? "/blogs" : "/login"}>
          <Button className="hover:shadow-lg ">Explore blogs</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
