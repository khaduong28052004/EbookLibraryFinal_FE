import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartThree = ({ list = [], title }) => {
  // Chuyển đổi dữ liệu từ API thành cấu trúc phù hợp
  const data = {
    series: list.map((item) => item.series), // Lấy giá trị `series`
    labels: list.map((item) => item.labels), // Lấy giá trị `labels`
  };

  // Tính tổng series để sử dụng trong tính phần trăm
  const totalSeries = data.series.reduce((acc, value) => acc + value, 1);

  // Cấu hình chart
  const chartConfig = {
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
    labels: data.labels,
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 500,
          },
        },
      },
    ],
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            series={data.series}
            type="donut"
            options={chartConfig}
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {data.labels.map((label, index) => {
          // Tính phần trăm cho từng series
          const percentage = ((data.series[index] / totalSeries) * 100).toFixed(2);

          return (
            <div key={index} className="sm:w-1/3 w-full px-8">
              <div className="flex w-full items-center">
                <span
                  className="mr-2 block h-3 w-full max-w-3 rounded-full"
                  style={{ backgroundColor: chartConfig.colors[index % chartConfig.colors.length] }}
                ></span>
                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                  <span>{label}:</span>
                  <span>{`${title === "Doanh thu sàn" ? data.series[index].toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : data.series[index]} (${percentage}%)`}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartThree;
