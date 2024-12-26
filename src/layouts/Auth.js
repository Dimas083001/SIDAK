import React from "react";

// components

import Navbar from "../components/Navbars/AuthNavbar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className="relative w-full h-full min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-green-800 bg-no-repeat bg-full "
            style={{
               backgroundImage: "url('/img/bglogin6.Jpg')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
