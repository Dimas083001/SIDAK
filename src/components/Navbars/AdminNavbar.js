import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const [namaPengguna, setNamaPengguna] = useState('');
  const [role, setRole] = useState('');
  const [fotoURL, setFotoURL] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { nama_pengguna, role } = JSON.parse(storedUser);
      setNamaPengguna(nama_pengguna);
      setRole(role);
      fetchUserData(nama_pengguna);
    }
  }, []);

  const fetchUserData = async (namaPengguna) => {
    try {
      const response = await axios.get(`https://api.sidak.lampungsehat.org/akun/${namaPengguna}`);
      setFotoURL(`https://api.sidak.lampungsehat.org${response.data.foto_url}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleButtonClick = () => {
    if (role === 'Admin') {
      router.push(`/admin/profil?namaPengguna=${namaPengguna}`);
    } else if (role === 'SSR') {
      router.push(`/ssr/profil?namaPengguna=${namaPengguna}`);
    } else {
      // Handle other roles or show an error message
      console.error('Role not recognized');
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
      <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4 mt-4">
        <a
          className="text-4xl uppercase hidden lg:inline-block font-semibold text-white animate-gradient"
          onClick={(e) => e.preventDefault()}
        >
          {/* Tambahkan span untuk teks yang ingin diberi efek gerakan */}
          <span className="moving-text text-3xl font-bold">SIDAK (Sistem Data Kader)</span>
        </a>
        <div className="flex-col md:flex-row list-none items-center hidden md:flex">
          <div
            className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full cursor-pointer hover:bg-blueGray-300"
            onClick={handleButtonClick}
          >
            <img
              alt="Profile"
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={fotoURL || '/img/team-2-800x800.jpg'}
            />
          </div>
          <h6 className="text-white text-base font-semibold ml-3 cursor-pointer" onClick={handleButtonClick}>
            {namaPengguna}
          </h6>
        </div>
      </div>
      <style jsx>{`
        .animate-gradient {
          font-family: 'Poppins', sans-serif;
          font-size: 24px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          background: linear-gradient(90deg, rgba(34, 197, 94, 1) 0%, rgba(167, 243, 208, 1) 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding: 10px 20px;
          border-radius: 10px;
          transition: text-shadow 0.3s ease, transform 0.3s ease;
        }
        .animate-gradient:hover {
          text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
          transform: scale(1.05);
        }
        
        /* Animasi gerakan */
        @keyframes moveText {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .moving-text {
          animation: moveText 2s ease infinite; /* Ubah durasi, timing function, dan iterasi sesuai keinginan */
        }
      `}</style>
    </nav>
  );
}
