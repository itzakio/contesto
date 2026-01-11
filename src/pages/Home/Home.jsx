import React, { useState } from "react";
import Banner from "../Shared/Banner";
import TextPressure from "../../Components/TextPressure";
import logo from "/logo.png";
import PopularContests from "../Shared/PopularContests";
import WinnerAdvertisement from "../Shared/WinnerAdvertisement";
import FullSearchModal from "../../Components/FullSearchModal";
import WhyJoinUs from "../Shared/WhyJoinUs";
import FAQ from "../Shared/FAQ";
import JudgingCriteria from "../Shared/JudgingCriteria";
import Testimonials from "../Shared/Testimonials";

const Home = () => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="relative ">
      <Banner />

      <div className="absolute hidden xl:block w-[1200px] h-[500px] top-0 xl:top-10 left-1/2 -translate-x-1/2 ">
        <div
          className=""
          style={{
            position: "relative",
            height: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextPressure
            text="CONTESTO!"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={10}
          />
        </div>
      </div>
      <div className="flex flex-col items-center absolute top-0 xl:top-90 left-1/2 -translate-x-1/2  w-full">
        <img
          className="w-1/2 md:w-1/5 lg:w-1/4 xl:hidden"
          src={logo}
          alt="logo"
        />
        <p className="text-base lg:text-2xl xl:text-3xl font-semibold text-white">
          Challenge <span>the</span> <span>Limits</span> <span>of</span>{" "}
          <span>Creativity.</span>
        </p>
        <div
          className="mt-8 cursor-pointer"
          onClick={() => setOpenSearch(true)}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-60 lg:w-80 xl:w-96 h-10 flex items-center bg-amber-300 rounded-full overflow-hidden relative"
          >
            <input
              className="input w-full pl-4 pr-22 rounded-full xl:text-lg"
              type="text"
              placeholder="Search in Contesto"
              readOnly
            />
            <input
              className="btn btn-primary rounded-full absolute right-0 z-10"
              type="submit"
              value="Search"
            />
          </form>
        </div>
      </div>
      <WhyJoinUs />
      <PopularContests />
      <WinnerAdvertisement />
      <JudgingCriteria />
      <Testimonials />
      <FAQ />
      <FullSearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </div>
  );
};

export default Home;
