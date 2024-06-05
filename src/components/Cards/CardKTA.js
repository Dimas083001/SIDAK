import React, { useState } from "react";
import { useRouter } from 'next/router';
import jsPDF from 'jspdf';

export default function KartuTandaPengenal() {
    const router = useRouter();
    const [namaKader, setNamaKader] = useState('');
    const [nomorAnggota, setNomorAnggota] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleButtonKembaliClick = () => {
        router.push('/ssr/kader');
    };

    const printToPDF = () => {
        const pdf = new jsPDF();
        
        if (uploadedImage) {
            const img = new Image();
            img.src = "/img/bawah.png";
            img.onload = function() {
                const imgWidth = 100;
                const imgHeight = img.height * imgWidth / img.width;
                pdf.addImage(this, 10, 10, imgWidth, imgHeight);

                // Tambahkan data nama dan nomor anggota ke kartu tanda pengenal
                pdf.text(`Nama: ${namaKader}`, 10, imgHeight + 20);
                pdf.text(`Nomor Anggota: ${nomorAnggota}`, 10, imgHeight + 30);

                pdf.save("Kartu_Tanda_Pengenal.pdf");
            };
        } else {
            pdf.save("Kartu_Tanda_Pengenal.pdf");
        }
    };

    return (
        <div className="container mx-auto mt-8 flex justify-center">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold text-center mb-4">Kartu Tanda Pengenal</h1>
                    <div className="flex justify-center mb-4">
                        <div className="w-48 h-32 bg-gray-200 flex items-center justify-center">
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="foto" className="w-48 h-auto" />
                            ) : (
                                <div>
                                    <img src="/img/Depan.png" alt="Depan" className="w-48 h-auto" />
                                    <div className="text-center">
                                        <h2 className="text-lg font-bold">{namaKader}</h2>
                                        <p className="text-sm">{nomorAnggota}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                            onClick={handleButtonKembaliClick}
                        >
                            Kembali
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            onClick={printToPDF}
                        >
                            Cetak PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
