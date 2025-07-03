import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
      <img src={assets.logo1} alt="logo" width={160} height={38} />
      <p className="flex-1 border-l border-gray-400 text-sm pl-4 text-gray-500 max-sm:hidden">
        CopyRight @Mariem Mansour 2025 JOBGATE | All Right Reserved
      </p>
      <div className="flex gap-3">
        <img width={38} src={assets.facebook_icon} alt="social media account" />
        <img width={38} src={assets.twitter_icon} alt="social media account" />
        <img
          width={38}
          src={assets.instagram_icon}
          alt="social media account"
        />
      </div>
    </div>
  );
};

export default Footer;
