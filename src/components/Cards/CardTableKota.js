import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "@fortawesome/fontawesome-free/css/all.css";

export default function TableKota() {
    const router = useRouter();
    
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.sidak.lampungsehat.org/wilayah");
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleButtonTambahClick = () => {
        router.push('/admin/kota/tambah/');
    };

    const handleButtonLihatClick = (id_kota) => {
        router.push({
            pathname: '/admin/kota/kecamatan',
            query: { id_kota: id_kota },
        });
    };
    
    const handleButtonUbahClick = async (id_kota) => {
        try {
          const response = await axios.get(`https://api.sidak.lampungsehat.org/kota/${id_kota}`);
          const dataToEdit = response.data;
          router.push({
            pathname: `/admin/kota/edit/`,
            query: { id_kota: id_kota },
        });
    
        } catch (error) {
          console.error("Error fetching data for edit:", error);
        }
      };
    
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleButtonHapusClick = async (id_kota) => {
        try {
            // Check if there are any related data in the database
            const response = await axios.get(`https://api.sidak.lampungsehat.org/kota/${id_kota}`);
            const kotaData = response.data;
            const relatedData = data.filter(item => item.provinsi === kotaData.provinsi && item.kota === kotaData.kota);
            
            // If no related data found, delete the city and potentially the province
            if (relatedData.length === 0) {
                const confirmDelete = confirm('Apakah kamu yakin ingin menghapus Kota/Kabupaten ini?');
                if (confirmDelete) {
                    axios.delete(`https://api.sidak.lampungsehat.org/kota/${id_kota}`)
                        .then(() => {
                            // Hapus item dari state data setelah sukses menghapus dari server
                            setData(data.filter(item => item.id_kota !== id_kota));
                            alert('Kota/Kabupaten berhasil dihapus');
                        })
                        .catch(error => {
                            console.error('There was an error deleting the city!', error);
                            alert('Gagal menghapus Kota/Kabupaten');
                        });
                }
            } else {
                alert('Tidak dapat menghapus Kota/Kabupaten karena terdapat data terkait');
            }
        } catch (error) {
            console.error('Error fetching city data:', error);
            alert('Gagal menghapus Kota/Kabupaten');
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
                                    Daftar Kota/Kabupaten
                                </h6>
                            </div>
                            <div className="flex justify-end mr-2">
                                <button
                                    type="button"
                                    onClick={handleButtonTambahClick}
                                className="bg-green-600 text-white font-medium py-1 px-3 rounded mr-3 flex items-center"
                                >
                                <i className="fas fa-plus-circle mr-2"></i> Tambah Kota
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
                                    Provinsi 
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider"
                                >
                                    Kode Kota/Kabupaten
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
                                    Kecamatan
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
                                        {item.provinsi}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                                        {item.kode_kota}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                                        {item.kota}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs text-gray-800">
                                    <button
                                            type="button"
                                            onClick={() => handleButtonLihatClick(item.id_kota)}
                                            className="bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2 flex items-center"
                                        >
                                            <FontAwesomeIcon icon={faEye} className="mr-1" /> Lihat
                                        </button> 
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-xs text-gray-800">
                                    <button
                                            type="button"
                                            onClick={() => handleButtonUbahClick(item.id_kota)}
                                            className="bg-blueGray-700 hover:bg-blueGray-900 text-white font-bold py-1 px-3 rounded mr-2"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="mr-1" /> Ubah
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleButtonHapusClick(item.id_kota)}
                                            className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-3 rounded mr-2"
                                            >
                                            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Hapus
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
                            onClick={() => goToPage(index + 1)}
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