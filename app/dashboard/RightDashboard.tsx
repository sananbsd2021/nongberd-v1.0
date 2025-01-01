import React from "react";
import { AiFillForward } from "react-icons/ai";

const RightDashboardPage = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-6">

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/dashboard/newslists">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ข่าวประชาสัมพันธ์
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          เพิ่มข่าวประชาสัมพันธ์
        </p>
        <a
          href="/dashboard/newslists"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข้อข่าว
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/dashboard/gallerys">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          ภาพกิจกรรม
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          เพิ่มข้อมูลภาพกิจกรรม
        </p>
        <a
          href="/dashboard/gallerys"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข้อมูล
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/dashboard/add-employee">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            เพิ่มข้อมูลบุคลากร
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          ข้อมูลบุคลากร
        </p>
        <a
          href="/dashboard/add-employee"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข้อมูลบุคลากร
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>


      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/dashboard/add-newssell">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ข่าวประกวดราคา
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          เพิ่มข่าวประกวดราคา/จัดซื้อจัดจ้าง
        </p>
        <a
          href="/dashboard/add-newssell"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข้อข่าว
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/dashboard/add-student">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ข้อมูลนักเรียน
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          เพิ่มข้อมูลนักเรียน
        </p>
        <a
          href="/dashboard/add-student"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข้อมูล
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>


      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/dashboard/show-students">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            แก้ไขข้อมูลนักเรียน
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
           ข้อมูลนักเรียน
        </p>
        <a
          href="/dashboard/show-students"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          แก้ไขข้อมูล
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>


      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/dashboard/update-gallery">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          แก้ไขภาพกิจกรรม
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          แก้ไขภาพกิจกรรม
        </p>
        <a
          href="/dashboard/update-gallery"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          แก้ไขข้อมูล
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

    </div>
  );
};

export default RightDashboardPage;
