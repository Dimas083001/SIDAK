import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faFileLines, faAngleRight, faTable, faPowerOff} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState(true); // Ubah nilai awal menjadi true
  const router = useRouter();
  console.log(router.pathname);

  const handleLogout = () => {
    // localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Redirect ke halaman login atau halaman lain setelah logout
    router.push("/auth/login");
  };

  // Gunakan useEffect untuk menyembunyikan sidebar setelah logout
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setCollapseShow(false); // Sembunyikan sidebar saat user logout
    }
  }, []);

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        {/* Toggler di luar sidebar */}
        <div className="relative z-50">
          <button
            className={`cursor-pointer text-white px-3 py-1 text-xl mb-6 leading-none bg-green-600 rounded border border-solid md:hidden`}
            type="button"
            onClick={() => setCollapseShow(!collapseShow)} // Toggle collapseShow saat tombol diklik
          >
            {collapseShow ? (
              <i className="fas fa-bars"></i> // Ikon untuk menutup sidebar
            ) : (
              <i className="fas fa-bars"></i> // Ikon untuk membuka sidebar
            )}
          </button>
        </div>
        <div
          className={`${
            collapseShow ? "md:w-64" : "md:w-5"
          } transition-all duration-300 ease-in-out md:block text-left md:pb-6 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-7 px-0`}
        >
          <img
            src="/img/brand/logo-ils.png"
            alt="Logo"
            className="h-20 w-40 inline mt-4 "
          />
        </div>

        {/* Collapse */}
        <div
          className={`${
            collapseShow ? "md:flex" : "hidden"
          } md:flex md:flex-col md:items-stretch px-6 py-6 md:opacity-100 md:relative md:mt-5 md:shadow-none shadow absolute top-0 left-1 right-1 overflow-y-auto overflow-x-hidden h-auto items-center flex-10 rounded bg-white md:transition-all md:duration-300 md:ease-in-out`}
        >
          {/* Divider */}
          <hr className="my-4 md:w-full " />

          {/* Menu */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <Link
                href="/ssr/dashboard/"
                className={
                  "ext-base uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/ssr/dashboard") !== -1
                    ? "text-green-500 hover:text-green-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
              >
                <i>
                  <FontAwesomeIcon
                  icon={faHouse} style={{ fontSize: '1.5rem' }}
                  className={
                    "mr-3 text-sm " +
                    (router.pathname.indexOf("/ssr/dashboard") !== -1
                      ? "opacity-75"
                      : "text-blueGray-700")
                  }
                  />
                </i>{" "}
                BERANDA
              </Link>
            </li>

            <li className="items-center">
              <Link
                href="/ssr/kader/"
                className={
                  "text-base uppercase py-3 font-bold block " +
                  (router.pathname.indexOf("/ssr/kader") !== -1
                    ? "text-green-500 hover:text-green-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }>

<i>
                  <FontAwesomeIcon
                  icon={faTable} style={{ fontSize: '1.5rem' }}
                  className={
                    "mr-4 text-base " +
                    (router.pathname.indexOf("/ssr/kader") !== -1
                      ? "opacity-75"
                      : "text-blueGray-700")
                  }
                  />
                </i>{" "} Data Kader
              </Link>
            </li>  

            {/* Divider */}
          <hr className="my-4 md:w-full " />

            <li className="items-center">
              <button
                onClick={handleLogout} 
                  className={
                    "text-base uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/auth/login") !== -1
                      ? "text-green-500 hover:text-green-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
              >
                <i>
                  <FontAwesomeIcon
                  icon={faPowerOff} style={{ fontSize: '1.5rem' }}
                  className={
                    "mr-4 text-base " +
                    (router.pathname.indexOf("/auth/login") !== -1
                      ? "opacity-75"
                      : "text-blueGray-700")
                  }
                  />
                </i>{" "}
                Keluar
              </button>
            </li>
          </ul>
        </div>
    </nav>
    </>
  );
}
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";

// const SidebarAdmin = () => {
//   const router = useRouter();

//   // State untuk menyimpan rute yang aktif
//   const [activeRoute, setActiveRoute] = useState("");

//   // Daftar menu dengan rute dan ikon yang sesuai
//   const menuItems = [
//     { route: "/admin/dashboard", label: "Beranda", icon: "fas fa-tv" },
//     { route: "/admin/ssr/", label: "Akun SSR", icon: "fas fa-tools" },
//     { route: "/admin/kader/", label: "Data Kader", icon: "fas fa-table" },
//     { route: "/admin/laporan/", label: "Laporan", icon: "fas fa-map-marked" },
//     { route: "/logout", label: "Keluar", icon: "fas fa-sign-out-alt" }
//   ];

//   // Fungsi untuk menandai menu yang aktif
//   const handleSetActiveRoute = (route) => {
//     setActiveRoute(route);
//   };

//   return (
//     <ul className="md:flex-col md:min-w-full flex flex-col list-none">
//       {menuItems.map((item, index) => (
//         <li className="items-center" key={index}>
//           <Link
//             href={item.route}
//             className={
//               "text-xs uppercase py-3 font-bold block " +
//               (router.pathname === item.route
//                 ? "text-green-600 hover:text-green-700"
//                 : "text-blueGray-700 hover:text-blueGray-500")
//             }
//             onClick={() => handleSetActiveRoute(item.route)} // Setelah klik, set rute yang aktif
//           >
//             <i
//               className={
//                 `${item.icon} mr-2 text-sm ` +
//                 (router.pathname === item.route
//                   ? "opacity-75"
//                   : "text-blueGray-300")
//               }
//             ></i>{" "}
//             {item.label}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default SidebarAdmin;
