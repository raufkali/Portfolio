import Link from "next/link";
import React from "react";
const BackToTop = () => {
  return (
    <div id="back-to-top" className=" p-2 bg-dark text-center mt-5">
      <Link href="#about" className="btn-top btn border-0">
        <h5 className="text-white oswald">BACK TO TOP</h5>
      </Link>
    </div>
  );
};

export default BackToTop;
