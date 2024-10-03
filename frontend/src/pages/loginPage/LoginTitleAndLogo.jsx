// img
import CasinoPlus from "../../assets/img/casino-plus.png";

import React from "react";

function LoginTitleAndLogo({ handleNextClick }) {
  return (
    <div className="logo-container flex items-center transition-all">
      <div className="text-white text-center leading-[50px]">
        <p className="text-[58px] font-bold">Casino Card </p>
        <p className="text-[24px]">Management System</p>
      </div>
      <div className="h-[170px] w-[1px] bg-white mx-[60px]"></div>
      <div>
        <img src={CasinoPlus} alt="logo" className="Logo relative top-[50px]" />
      </div>
    </div>
  );
}

export default LoginTitleAndLogo;
