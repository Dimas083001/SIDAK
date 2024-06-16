import React from "react";
import PropTypes from "prop-types";

export default function CardStats({
  statSubtitle = "Traffic",
  statTitle = 350897, // Mengonversi ke string jika memang ingin mengirimkan angka
  statIconColor = "bg-red-500",
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {String(statTitle)} {/* Mengonversi ke string di sini */}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 inline-flex  justify-center h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Mengizinkan tipe data string atau number
  statIconColor: PropTypes.string,
};
