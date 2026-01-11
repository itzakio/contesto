import { useEffect, useRef, useState } from "react";
import { GridScan } from "../../Components/GridScan";

const Banner = () => {
  const bannerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // pause when NOT visible
        setPaused(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.15, // 15% visible = active
      }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  const onVisibilityChange = () => {
    setPaused(document.hidden);
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  return () =>
    document.removeEventListener("visibilitychange", onVisibilityChange);
}, []);


  return (
    <div ref={bannerRef} className="w-full bg-[#1a1b1f]">
      <div className="w-full h-96 lg:h-[400px] xl:h-[600px] relative">
        <GridScan
          paused={paused}
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
