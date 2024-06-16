import React, { useState } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "@fortawesome/fontawesome-free/css/all.css";
import { faCircleChevronLeft, faFileUpload, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function TambahLaporan() {
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false); // State untuk menampilkan loading
  const router = useRouter();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleImportClick = async (endpoint) => {
    try {
      setLoading(true); // Set loading menjadi true saat proses upload dimulai
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch(`https://sidak-ils-three.vercel.app/${endpoint}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        setNotification("File berhasil diimpor");
        setTimeout(() => {
          setNotification('');
          router.push('/admin/laporan/');
        }, 3000); // Notification disappears after 3 seconds
      } else {
        // Handle non-OK response
        const errorMessage = await response.text(); // Get the error message from the response
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Handle fetch or other errors
      setNotification(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Set loading kembali menjadi false setelah proses selesai (baik sukses atau gagal)
    }
  };  

  const handleButtonKembaliClick = () => {
    router.push('/admin/laporan/');
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
          <div className="flex items-center justify-left">
              <FontAwesomeIcon icon={faCircleChevronLeft} className="cursor-pointer text-green-700 mr-2" onClick={handleButtonKembaliClick} style={{ fontSize: '2rem' }} />
            <h6 className="text-green-700 text-xl font-bold">
              Import Data Excel
            </h6>
            {loading && (
              <FontAwesomeIcon icon={faSpinner} spin className="text-black text-3xl ml-3 text-left" />
              )}
          </div>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div className="flex flex-wrap mt-3">
              <div className="w-full lg:w-6/8 px-4">
              <div className="relative w-full mb-3 flex justify-between items-center">
                <input
                  type="file" id="fileInput" name="fileInput"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={handleFileChange}
                />
                <button
                  className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleImportClick('laporantpt')}
                >
                  <FontAwesomeIcon icon={faFileUpload} className="mr-1" /> Import Laporan TPT ANAK
                </button>
              </div>
              <div className="relative w-full mb-3 flex justify-between items-center">
                <input
                  type="file" id="fileInputIKRT" name="fileInputIKRT"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={handleFileChange}
                />
                <button
                  className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleImportClick('laporanikrt')}
                >
                  <FontAwesomeIcon icon={faFileUpload} className="mr-1" /> Import Laporan IK RT
                </button>
              </div>
              <div className="relative w-full mb-3 flex justify-between items-center">
                <input
                  type="file" id="fileInputNonRT" name="fileInputNonRT"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={handleFileChange}
                />
                <button
                  className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleImportClick('laporaniknonrt')}
                >
                  <FontAwesomeIcon icon={faFileUpload} className="mr-1" /> Import Laporan IK NON-RT
                </button>
              </div>
              <div className="relative w-full mb-3 flex justify-between items-center">
                <input
                  type="file" id="fileInputTernotifikasi" name="fileInputTernotifikasi"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={handleFileChange}
                />
                <button
                  className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleImportClick('laporanterduga')}
                >
                  <FontAwesomeIcon icon={faFileUpload} className="mr-1" /> Import Laporan TERNOTIFIKASI
                </button>
              </div>
              <div className="relative w-full mb-3 flex justify-between items-center">
                <input
                  type="file" id="fileInputDataIndeksSITB" name="fileInputIndeksSITB"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={handleFileChange}
                />
                <button
                  className="w-1/3 h-12 bg-green-700 active:bg-blueGray-600 text-white font-bold text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleImportClick('laporansitb')}
                >
                  <FontAwesomeIcon icon={faFileUpload} className="mr-1" /> Import Lapoaran SITB
                </button>
              </div>
              </div>
            </div>
            {notification && (
              <div className="text-center mt-4 text-green-700 font-bold">
                {notification}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
