import React from "react";
import logo from "/logo.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <div data-aos="fade-up" data-aos-delay="0" className=" p-10 max-w-[1440px] mx-auto margin-top">
      <div className="footer sm:footer-horizontal border-t border-accent pt-8">
        <div data-aos="fade-up" data-aos-delay="100">
        <img className="size-28" src={logo} alt="" />
        <p className="text-4xl font-bold mb-2 text-primary">Contesto</p>
        <p className="text-accent">Challenge the Limits of Creativity.</p>
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <h6 className="title-footer">Category</h6>
        <a className="footer-link">Quiz</a>
        <a className="footer-link">Coding</a>
        <a className="footer-link">Creative Design</a>
        <a className="footer-link">Writing</a>
        <a className="footer-link">Photography</a>
        <a className="footer-link">Idea Pitch</a>
        <a className="footer-link">Photography</a>
        <a className="footer-link">Logic & Puzzle</a>
        <a className="footer-link">Gaming (Score-based)</a>
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
        <h6 className="title-footer">Community</h6>
        <a className="footer-link">Articles</a>
        <a className="footer-link">Author Interviews</a>
        <a className="footer-link">Newsletter</a>
      </div>

      <div data-aos="fade-up" data-aos-delay="400" className="text-black/70">
        <h6 className="title-footer">Follow</h6>

        <div className="flex items-center gap-6 mt-1 text-accent">
          <div className="tooltip" data-tip="Facebook" >
            <FaFacebook className="cursor-pointer "  size={28} />
          </div>
         <div className="tooltip" data-tip="Instagram">
             <FaLinkedin className="cursor-pointer"  size={28} />
         </div>
          <div className="tooltip" data-tip="X">
            <FaXTwitter className="cursor-pointer"  size={28} />
          </div>
          <div className="tooltip" data-tip="Youtube">
            <TbBrandYoutubeFilled className="cursor-pointer"  size={28} />
          </div>
        </div>
      </div>
      </div>
      <div  className="text-accent text-center mt-8 border-t border-accent pt-8 text-xs lg:text-base">
        <p>© 2025 Contesto. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
