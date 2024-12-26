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
               backgroundImage: "url('https://img.freepik.com/free-vector/comic-style-background_23-2148809728.jpg?t=st=1735230789~exp=1735234389~hmac=a438356eb2a35d4436d1d6e226057e531d51e2a40224e99aec6b11a8e0e8f53b&w=1380')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
