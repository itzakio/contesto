import React from "react";
import { GridScan } from "../../Components/GridScan";

const Banner = () => {
  return (
    <div className="w-full bg-[#1a1b1f] ">
      <div
      className="w-full h-96  md:h-68 lg:h-[400px] xl:h-[600px] relative"
      //  style={{ width: "100%", height: "600px", position: "relative" }}
       >
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#67CCD1"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>
    </div>
  );
};

export default Banner;
