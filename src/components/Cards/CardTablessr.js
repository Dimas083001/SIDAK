import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-free/css/all.css";

const axios = require("axios");

export default function TableSSR() {
  

  const router = useRouter();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.sidak.lampungsehat.org/laporan");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleButtonTambahClick = () => {
    router.push("/admin/ssr/tambah/");
  };

  const handleButtonUbahClick = async (nama_pengguna) => {
    try {
      const response = await axios.get(`https://api.sidak.lampungsehat.org/akun/${nama_pengguna}`);
      const dataToEdit = response.data;
      router.push({
        pathname: `/admin/ssr/edit/`,
        query: { nama_pengguna: nama_pengguna },
    });

    } catch (error) {
      console.error("Error fetching data for edit:", error);
    }
  };

  const handleButtonHapusClick = (nama_pengguna) => {
    const confirmation = window.confirm("Apakah anda yakin ingin menghapus akun?");
    if (confirmation) {
      axios
        .delete(`https://api.sidak.lampungsehat.org/akun/${nama_pengguna}`)
        .then((response) => {
          if (response.status === 200) {
            setData(data.filter((item) => item.nama_pengguna !== nama_pengguna));
            alert("Account deleted successfully");
          } else {
            throw new Error("Error deleting account");
          }
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Error deleting account");
        });
    } else {
      console.log("Account deletion cancelled.");
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="overflow-x-auto">
          <div className="rounded-t bg-white mb-1 px-6 py-6 border-2">
            <div className="flex justify-between items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="text-green-700 text-xl font-bold">
                  Daftar Akun
                </h6>
              </div>
              <div className="flex justify-end mr-2">
              <button
                type="button"
                onClick={handleButtonTambahClick}
                className="bg-green-600 hover:bg-green-800 text-white font-medium py-1 px-3 rounded mr-8"
              >
                <i className="fas fa-plus"></i> Tambah Akun
              </button>
              </div>
            </div>
          </div>
  
          {/* Tabel Akun SSR */}
  
          <table className="items-center w-full bg-white border-collapse">
            <thead className="bg-blueGray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Kota/Kabupaten
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Nama Pengguna
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                    {item.kota_kabupaten}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                    {item.nama_pengguna}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                    {item.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  <button
                    type="button"
                    onClick={() => handleButtonUbahClick(item.nama_pengguna)}
                    className="bg-blueGray-700 hover:bg-blueGray-900 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    <i className="fas fa-edit"></i> Ubah
                  </button>
                  <button
                    type="button"
                    onClick={() => handleButtonHapusClick(item.nama_pengguna)}
                    className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    <i className="fas fa-trash-alt"></i> Hapus
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded-l"
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
            key={index}
            className={`bg-${currentPage === index + 1 ? 'blueGray-200' : 'blue-500'} hover:bg-blue-700 text-green-500 py-2 px-4 rounded mr-2 ${currentPage === index + 1 ? 'text-blueGray-700 font-bold' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
            </button>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black py-2 px-4 rounded-r"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}