"use client";

import React, { useState } from "react";
import ShowGalleryPage from "@/app/gallerys/ShowGallery";
import ShowNewslistPage from "@/app/dashboard/newslists/ShowNewslist";
import ShowEduNewsPage from "@/app/dashboard/edunews/page";
import ShowNewsOutPage from "@/app/news/ShowGallery";
import ShowGalleryOutPage from "@/app/gallerys/ShowGallery";
import ShowEdunewsOutPage from "@/app/edunews/ShowGallery";

const TabsNewsPage = () => {
  const [activeTab, setActiveTab] = useState("gallery");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-3 px-1">
      <h1
        className="text-2xl text-white font-bold p-2 mb-1 
      bg-gradient-to-r from-blue-700 to-white"
      >
        กิจกรรม
      </h1>

      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "gallery"
                  ? "border-blue-500 text-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("gallery")}
              type="button"
            >
              ภาพกิจกรรม
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "newslist"
                  ? "border-blue-500 text-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("newslist")}
              type="button"
            >
              ข่าวสารประชาสัมพันธ์
            </button>
          </li>

          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "kroobannok"
                  ? "border-blue-500 text-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("kroobannok")}
              type="button"
            >
              ข่าวการศึกษา
            </button>
          </li>

          <li role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "news"
                  ? "border-blue-500 text-blue-500"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleTabChange("news")}
              type="button"
            >
              ข่าวสาร
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div
          className={`p-4 rounded-lg w-full bg-gray-50 dark:bg-gray-800 ${
            activeTab === "gallery" ? "" : "hidden"
          }`}
        >
          {/* <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content for the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one.
          </p> */}
          <ShowGalleryOutPage />
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "newslist" ? "" : "hidden"
          }`}
        >
          {/* <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content for the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </strong>
            .
          </p> */}

<ShowNewsOutPage />
          
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "kroobannok" ? "" : "hidden"
          }`}
        >
          {/* <p>ข่าวการศึกษา</p> */}
          <ShowEdunewsOutPage />
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "news" ? "" : "hidden"
          }`}
        >
          <p>ข่าวสาร</p>
        </div>
      </div>
    </div>
  );
};

export default TabsNewsPage;
