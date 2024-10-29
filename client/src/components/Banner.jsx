import React from "react";
import video from "../assets/watch-video.mp4";
import logo from "../assets/Logo/logo.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/shop");
    }
  return (
    <div className="relative">
      <div className="w-full h-full lg:h-90 -z-10">
        <video
          src={video}
          autoPlay
          loop
          muted
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gray-950 opacity-70 z-99"></div>
      <div className="absolute top-0 left-0 w-full h-full z-999">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 h-90 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              {/* image */}
              <img className="block h-90" src={logo} alt="Best Selar Watch" />
            </div>
            <div className="flex flex-col items-center justify-center text-teal-50">
              {/* text */}
              <div className="text-left">
                <h2 className="text-5xl font-bold">The Future of Watch</h2>
                <p className="py-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Expedita asperiores tempore iusto facere excepturi quas illo,
                  nulla velit explicabo, corrupti cumque laboriosam recusandae
                  officiis, numquam est suscipit necessitatibus facilis magnam!
                </p>
                <Button btnStyle={"mt-4 cursor-pointer"} onClick={handleNavigate}>Shop Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
