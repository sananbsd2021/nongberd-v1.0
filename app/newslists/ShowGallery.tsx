"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ShowNewslistOutPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch("/api/newslists");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        if (result.success) {
          setGalleryItems(result.data);
        } else {
          setError("Failed to load gallery items");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Unknown error occurred");
        } else {
          setError("Unknown error occurred");
        }
      }
    }
    fetchGallery();
  }, []);
  

  if (error) {
    return <div className="p-4 text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {/* <h1
        className="text-2xl text-white font-bold p-2 mb-1 
      bg-gradient-to-r from-blue-700 to-white"
      >
        ภาพกิจกรรม
      </h1> */}

      {/* Empty State */}
      {galleryItems.length === 0 && (
        <p className="text-gray-500 text-center">ไม่มีภาพกิจกรรมในขณะนี้</p>
      )}

      {/* Table Layout for Gallery Items */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          {/* <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Title</th>
              <th className="px-4 py-2 text-left border-b">Description</th>
              <th className="px-4 py-2 text-left border-b">Image</th>
              <th className="px-4 py-2 text-left border-b">Created At</th>
            </tr>
          </thead> */}
          <tbody>
            {galleryItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.title || "Gallery Image"}
                    width={640}
                    height={480}
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder-image.jpg"
                  />
                </td>
                {/* <td className="px-4 py-2">{item.title}</td> */}
                <td className="px-4 py-2">
                  {item.description.length > 50 ? (
                    <>
                      {item.description.slice(0, 50)}...
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
                </td>

                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
