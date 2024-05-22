import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

export default function TableKecamatan() {
    const router = useRouter();
    const { id_kota } = router.query; // Get the city ID from the URL query parameter
    const { id_kota: prevIdKota } = router.query;
    
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        if (id_kota) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/kota/${id_kota}`);
                    setData(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [id_kota]);


    const handleButtonTambahClick = () => {
        router.push(`/admin/kota/kecamatan/tambah?id_kota=${prevIdKota}`);
      };
      


    const handleButtonUbahClick = async (id_kecamatan) => {
        try {
          const response = await axios.get(`http://localhost:8000/kecamatan/${id_kecamatan}`);
          const dataToEdit = response.data;
          router.push({
            pathname: `/admin/kota/kecamatan/edit`,
            query: { id_kecamatan: id_kecamatan },
        });
        } catch (error) {
          console.error('Error fetching kecamatan data:', error);
        }
      };

    const handleButtonHapusClick = (id_kecamatan) => {
        const confirmDelete = confirm('Apakah kamu yakin ingin menghapus Kecamatan ini?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8000/kecamatan/${id_kecamatan}`)
                .then(() => {
                    setData(data.filter(item => item.id_kecamatan !== id_kecamatan));
                })
                .catch(error => {
                    console.error('There was an error deleting the item!', error);
                });
        }
    };

    const handleButtonKembaliClick = () => {
        router.push('/admin/kota/');
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
                                    Daftar Kecamatan
                                </h6>
                            </div>
                            <div className="flex justify-end mr-2">
                                <button type="button" onClick={handleButtonTambahClick} className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-3">
                                    Tambah Kecamatan
                                </button>
                            </div>
                        </div>
                    </div>

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
                                    Kode Kecamatan
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                                >
                                    Kecamatan
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                                >
                                    Kota
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
                                        {item.kode_kecamatan}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                                        {item.nama_kecamatan}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                                        {item.kota}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                                        <button
                                            type="button"
                                            onClick={() => handleButtonUbahClick(item.id_kecamatan)}
                                            className="bg-blueGray-700 text-white font-bold py-1 px-3 rounded mr-2"
                                        >
                                            Ubah
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleButtonHapusClick(item.id_kecamatan)}
                                            className="bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
                                        >
                                            Hapus
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
            <div className="text-center flex justify-end mr-3 mt-3">
                <button
                className="bg-blueGray-400 mr-12 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleButtonKembaliClick}
                >
                Kembali
                </button>
            </div>

        </>
    );
}
