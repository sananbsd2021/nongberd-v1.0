"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface NewslistItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ShowNewslistPage() {
  const [newslistItems, setNewslistItems] = useState<NewslistItem[]>([]);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    async function fetchNewslist() {
      try {
        const response = await fetch("/api/newslists");
        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }
        const result = await response.json();
        if (result.success) {
          setNewslistItems(result.data);
        } else {
          setError("Failed to load newslist items");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Unknown error occurred");
        } else {
          setError("Unknown error occurred");
        }
      }
    }
    fetchNewslist();
  }, []);
  

  if (error) {
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1
        className="text-2xl text-white font-bold p-2 mb-1 
      bg-gradient-to-r from-blue-700 to-white"
      >
        ข่าวสารประชาสัมพันธ์
      </h1>

      {/* Empty State */}
      {newslistItems.length === 0 && (
        <p className="text-gray-500 text-center">ไม่มีข่าวสารประชาสัมพันธ์</p>
      )}

      {/* Gallery Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newslistItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={item.imageUrl}
              alt={item.title || "Gallery Image"}
              width={320}
              height={250}
              className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
              placeholder="blur"
              blurDataURL="/placeholder-image.jpg" // ใช้ภาพเบลอขณะรอโหลด
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>

              <p className="text-gray-600">
                {item.description.length > 100 ? (
                  <>
                    {item.description.slice(0, 100)}...
                    <a
                      href={`/newslists/${item.id}`}
                      className="text-blue-500 hover:underline ml-1"
                    >
                      อ่านเพิ่มเติม
                    </a>
                  </>
                ) : (
                  item.description
                )}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Added on: {new Date(item.createdAt).toLocaleDateString()}
              </p>

              {/* <button
                onClick={() => setEditingItem(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                aria-label={`Edit ${item.title}`}
              >
                แก้ไข
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Gallery Form */}
      {/* {editingItem && (
        <GalleryEditForm
          initialData={editingItem}
          onSubmit={handleEditGallery}
          onClose={() => setEditingItem(null)} // Close form
        />
      )} */}
    </div>
  );
}
