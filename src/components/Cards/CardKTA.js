import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "@fortawesome/fontawesome-free/css/all.css";
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function KTADisplay() {
    const [kader, setKader] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchKader(id);
        }
    }, [id]);

    const fetchKader = async (id) => {
        try {
            const response = await axios.get(`https://api.sidak.lampungsehat.org/kta/${id}`);
            setKader(response.data);
        } catch (error) {
            console.error('Error fetching KTA data:', error);
        }
    };

    const handlePrint = () => {
        const printContent = `
            <div class="print-container">
                <div class="card-front">
                    <h2>KARTU TANDA ANGGOTA</h2>
                    <div class="photo">
                        ${kader.fotoURL ? `<img src="https://api.sidak.lampungsehat.org${kader.fotoURL}" alt="Foto" />` : ''}
                    </div>
                    <div class="text">
                        <p class="name">${kader.nama}</p>
                        <p class="id">${kader.nomorInduk}</p>
                        <p class="jenis">${kader.jenis_kader}</p>
                    </div>
                </div>
                <div class="card-back">
                    <div className="bg-white shadow-md rounded p-4 m-4" style={{ width: '300px', height: '500px', backgroundImage: 'url(/img/Belakang.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                </div>
            </div>
            <style>
                @media print {
                    @page {
                        size: 5.3788cm 8.6cm;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        
                        font-family: Arial, sans-serif;
                    }
                    .print-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .card-front, .card-back {
                        width: 5.4cm;
                        height: 8.6cm;
                        background-size: 5.4cm 8.6cm;
                        background-position: center;
                        padding: 0;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    }
                    .card-front {
                        background-image: url('/img/KTA.png');
                    }
                    .card-back {
                        background-image: url('/img/Belakang.png');
                    }
                    .card-front h2, .card-back h2 {
                        margin: 8px;
                        font-size: 11px;
                        font-weight: bold;
                        margin-top: -5px;
                    }
                    .photo {
                        margin: 10px 0;
                        margin-top: 15px;
                    }
                    .photo img {
                        width: 2.5cm;
                        height: 2.5cm;
                        border-radius: 50%;
                    }
                    .text {
                        margin-top: 2px;
                    }
                    .text p {
                        margin: 4;
                        font-size: 12px;
                    }
                    .text .name {
                        font-size: 10.5px;
                        font-weight: bold;
                    }
                    .text .id, .text .jenis {
                        font-size: 10px;
                    }
                }
            </style>
        `;
        const newWindow = window.open('', '', 'width=540,height=860');
        newWindow.document.write('<html><head><title>Print KTA</title></head><body>');
        newWindow.document.write(printContent);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        newWindow.print();
    };

    if (!kader) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center px-6 py-4 bg-white border-b-2">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faCircleChevronLeft} style={{ fontSize: '2rem' }}
              className="cursor-pointer text-green-700 text-xl mr-2"
              onClick={() => router.back()}
            />
            <h1 className="text-2xl font-bold ">Kartu Tanda Anggota</h1>
          </div>
          <div className="w-8"></div> {/* Placeholder untuk memberikan ruang kosong seukuran ikon */}
        </div>
        <div className="rounded-t bg-blueGray-100 mb-1 px-6 py-6 border-2">
          <div className="block w-full overflow-x-auto">
            <div className="relative w-full px-3 max-w-full flex-grow flex-1">
              {/* Konten lainnya */}
              <div className="flex items-center justify-center">
                <div className="flex space-x-8">
                    {/* Bagian Depan Kartu */}
                    <div className="bg-white shadow-md rounded p-8 m-4" style={{ width: '300px', height: '500px', backgroundImage: 'url(/img/KTA.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h2 className="px-8 py-5 m-4 mt-8 text-lxl font-bold text-center">KARTU TANDA ANGGOTA</h2>
                        <div className="photo text-center my-4">
                            {kader.fotoURL && <img src={`https://api.sidak.lampungsehat.org${kader.fotoURL}`} alt="Foto" className="mx-auto" style={{ width: '150px', height: '150px', borderRadius: '100%' }} />}
                        </div>
                        <div className="text-center mt-5">
                            <p className="font-bold">{kader.nama}</p>
                            <p>{kader.nomorInduk}</p>
                            <p>{kader.jenis_kader}</p>
                        </div>
                    </div>
                    
                    {/* Bagian Belakang Kartu */}
                    <div className="bg-white shadow-md rounded p-4 m-4" style={{ width: '300px', height: '500px', backgroundImage: 'url(/img/Belakang.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        {/* Konten untuk bagian belakang kartu di sini */}
                    </div>
                </div>
            </div>
            <div className="text-center mt-10">
                <button
                    onClick={handlePrint}
                    className="bg-orange-500 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    style={{ marginRight: '15px' }}
                >
                <i className="fas fa-print mr-2"></i> Cetak
                </button>
                <button
                    onClick={() => router.back()}
                    className="bg-blueGray-400 active:bg-blueGray-600 text-white font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                <i className="fas fa-times mr-2"></i> Batal
                </button>
            </div>
        </div>
        </div>
    </div>
</div>
        </div>
    );
}
