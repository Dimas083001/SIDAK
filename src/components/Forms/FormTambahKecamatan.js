// Frontend - FormTambahKecamatan.js
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export default function FormTambahKecamatan() {
  const router = useRouter();
  const { id_kota } = router.query; // Ambil id_kota dari query parameter

  const [kecamatan, setKecamatan] = useState({
    kode_kecamatan: "",
    nama_kecamatan: "",
    id_kota: id_kota || "" // Set id_kota dengan nilai dari query parameter
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKecamatan((prev) => ({ ...prev, [name]: value }));
  };

  const handleTambahKecamatan = async (e) => {
    e.preventDefault();
    try {
      if (!kecamatan.kode_kecamatan || !kecamatan.nama_kecamatan || !kecamatan.id_kota) {
        alert("Please fill all the fields");
        return;
      }
      await axios.post(`http://localhost:8000/kota/kecamatan`, kecamatan);
      alert("Kecamatan added successfully");
      router.push(`/admin/kota/kecamatan?id_kota=${id_kota}`); // Redirect ke halaman daftar kecamatan
    } catch (error) {
      console.error("Error adding kecamatan:", error);
      alert("Error adding kecamatan");
    }
  };

  const handleButtonKembaliClick = () => {
    router.push(`/admin/kota/kecamatan?id_kota=${id_kota}`);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-green-700 text-xl font-bold">
              Tambah Kecamatan
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form className="flex flex-wrap mt-3" onSubmit={handleTambahKecamatan}>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Kode Kecamatan
                </label>
                <input
                  type="text" id="kode_kecamatan" name="kode_kecamatan"
                  value={kecamatan.kode_kecamatan}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-green-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Kecamatan
                </label>
                <input
                  type="text" id="nama_kecamatan" name="nama_kecamatan"
                  value={kecamatan.nama_kecamatan}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="text-center flex justify-end mr-3 mt-3 w-full">
            <button
              className="bg-green-700 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ml-auto flex items-center"
              type="submit"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" /> Simpan
            </button>

            {/* Tombol Batal dengan ikon */}
            <button
              className="bg-blueGray-400 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex items-center"
              type="button"
              onClick={handleButtonKembaliClick}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" /> Batal
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
