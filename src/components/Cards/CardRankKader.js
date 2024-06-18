import React, { useEffect, useState } from "react";

const months = [
  { value: 1, label: 'Januari' },
  { value: 2, label: 'Februari' },
  { value: 3, label: 'Maret' },
  { value: 4, label: 'April' },
  { value: 5, label: 'Mei' },
  { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' },
  { value: 8, label: 'Agustus' },
  { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' },
  { value: 11, label: 'November' },
  { value: 12, label: 'Desember' }
];

export default function CardPageVisits() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [year, setYear] = useState('');
  const [displayedDataCount, setDisplayedDataCount] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/peringkat_kader');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = () => {
    let filtered = data;

    if (startMonth && endMonth && year) {
      const startDate = new Date(year, startMonth - 1);
      const endDate = new Date(year, endMonth - 1);

      filtered = filtered.filter(item => {
        const itemDate = new Date(item.Tahun, item.Bulan - 1);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    const groupedData = {};
    filtered.forEach(item => {
      const key = `${item.Nama_Kader}-${item.Kabupaten_Kota}-${item.Kecamatan}-${item.Tahun}`;
      if (!groupedData[key]) {
        groupedData[key] = { ...item, TPT: 0, IK: 0, IK_Nonrt: 0, Ternotifikasi: 0, Total_Laporan: 0 };
      }
      groupedData[key].TPT += parseInt(item.TPT, 10) || 0;
      groupedData[key].IK += parseInt(item.IK, 10) || 0;
      groupedData[key].IK_Nonrt += parseInt(item.IK_Nonrt, 10) || 0;
      groupedData[key].Ternotifikasi += parseInt(item.Ternotifikasi, 10) || 0;
      groupedData[key].Total_Laporan += parseInt(item.Total_Laporan, 10) || 0;
    });

    const finalData = Object.values(groupedData);

    switch (filter) {
      case 'top5':
        return finalData.slice(0, 5);
      case 'top10':
        return finalData.slice(0, 10);
      case 'all':
      default:
        return finalData.slice(0, displayedDataCount);
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-4 shadow-lg rounded-lg bg-white border-1">
        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-transparent">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full px-4 flex-1">
              <h3 className="font-semibold text-base text-xl text-blueGray-700 mt-2 mb-4">
                Pemeringkatan Kader
              </h3>
              <div className="inline-flex flex-wrap justify-start">
                <select
                  className="bg-indigo-100 text-black px-3 py-1 mr-2 mb-2 sm:mb-0 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                >
                  <option value="">Mulai Bulan</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>    
                  ))}
                </select>
                <select
                  className="bg-indigo-100 text-black px-2 py-1 mr-2 mb-2 sm:mb-0 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                >
                  <option value="">Akhir Bulan</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Tahun"
                  className="bg-indigo-100 text-black px-3 py-1 mr-2 mb-2 sm:mb-0 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <button
                className={`bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${filter === 'top5' && 'bg-indigo-600'}`}
                onClick={() => setFilter('top5')}
              >
                Top 5
              </button>
              <button
                className={`bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${filter === 'top10' && 'bg-indigo-600'}`}
                onClick={() => setFilter('top10')}
              >
                Top 10
              </button>
              <button
                className={`bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${filter === 'all' && 'bg-indigo-600'}`}
                onClick={() => {
                  setFilter('all');
                  setDisplayedDataCount(data.length);
                }}
              >
                Lihat Semua
              </button>
            </div>
            </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-2 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  No
                </th>
                <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Nama
                </th>
                <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Kabupaten
                </th>
                <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Kecamatan
                </th>
                <th className="px-2 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  TPT
                </th>
                <th className="px-2 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs                 whitespace-nowrap font-semibold text-left">
                  IKRT
                </th>
                <th className="px-2 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  IK NON-RT
                </th>
                <th className="px-2 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Ternotifikasi
                </th>
                <th className="px-2 bg-blueGray-50 text-center text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Total Laporan
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData().map((item, index) => (
                <tr key={index} className={index < 3 ? 'bg-blueGray-200 font-bold' : ''}>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">
                    {item.Nama_Kader}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">
                    {item.Kabupaten_Kota}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-left">
                    {item.Kecamatan}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-center">
                    {item.TPT}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-center">
                    {item.IK}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-center">
                    {item.IK_Nonrt}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-center">
                    {item.Ternotifikasi}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-center">
                    {item.Total_Laporan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    </>
  );
}
