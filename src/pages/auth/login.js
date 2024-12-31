import React, { useState } from "react";
const axios = require("axios");

import Auth from "../../layouts/Auth.js";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah perilaku default dari form

    try {
      const response = await axios.post('https://api.sidak.lampungsehat.org/login', {
        nama_pengguna: username,
        kata_sandi: password,
      });

      // Simpan token atau informasi pengguna yang diterima dari API
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Arahkan pengguna ke halaman yang sesuai berdasarkan peran
      const role = response.data.user.role;
      if (role === 'Admin') {
        window.location.href = '/admin/dashboard';
      } else if (role === 'SSR') {
        window.location.href = '/ssr/dashboard';
      } else {
        setError('Peran pengguna tidak dikenali.');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0 mt-20">
              <div className="rounded-t mb-0 px-6 py-3">
                <div className="text-center mb-3">
                  <img src="/img/brand/logo-ils.png" alt="Logo" className="w-20 h-10 mx-auto mb-3" />
                  <p className="text-4xl font-bold text-blueGray-700">SIDAK</p>
                  <p className="text-xl font-bold text-blueGray-600 mt-2">SISTEM DATA KADER</p>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleLogin}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="username"
                    >
                      Nama Pengguna
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nama Pengguna"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Kata Sandi"
                    />
                  </div>
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Ingatkan Saya
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-green-700 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Masuk
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                </a>
              </div>
              <div className="w-1/2 text-right">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
