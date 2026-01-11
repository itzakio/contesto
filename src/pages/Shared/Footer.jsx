import React from "react";
import logo from "/logo.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div  className=" p-10 max-w-[1440px] mx-auto ">
      <div className="footer sm:footer-horizontal border-t border-accent pt-8">
        <div>
        <img className="size-28" src={logo} alt="" />
        <p className="text-4xl font-bold mb-2 text-primary">Contesto</p>
        <p className="text-accent">Challenge the Limits of Creativity.</p>
      </div>

      <div >
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

      <div>
        <h6 className="title-footer">Support</h6>
        <Link className="footer-link" to='/help-center'>Help Center</Link>
        <Link className="footer-link" to="/#faq">FAQ</Link>
        <Link className="footer-link" to='/terms&conditions'>Terms & Conditions</Link>
        <Link className="footer-link" to='/refund'>Refund Policy</Link>
        <Link className="footer-link" to='/contact'>Contact</Link>
      </div>

      <div  className="text-black/70">
        <h6 className="title-footer">Follow</h6>

        <div className="flex items-center gap-6 mt-1 text-accent">
          <a href="https://www.facebook.com/itz.akio.98/" className="tooltip hover:text-blue-500 transition-all duration-100" data-tip="Facebook" >
            <FaFacebook className="cursor-pointer "  size={28} />
          </a>
         <a href="https://www.linkedin.com/in/abu-saleh1/" className="tooltip hover:text-blue-800 transition-all duration-100" data-tip="Instagram">
             <FaLinkedin className="cursor-pointer"  size={28} />
         </a>
          <div className="tooltip hover:text-black transition-all duration-100" data-tip="X">
            <FaXTwitter className="cursor-pointer"  size={28} />
          </div>
          <a href="https://www.youtube.com/@belikenahyan" className="tooltip hover:text-red-500 transition-all duration-100" data-tip="Youtube">
            <TbBrandYoutubeFilled className="cursor-pointer"  size={28} />
          </a>
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
