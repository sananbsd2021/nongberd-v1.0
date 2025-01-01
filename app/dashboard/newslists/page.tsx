'use client';
import { useEffect, useState } from 'react';
import NewslistForm from './NewslistForm';
// import NewslistEditForm from './NewslistEditForm';
// import { HistoryItem } from '../../types/history';
import Image from 'next/image';

export interface NewslistsItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  }
  
export default function NewslistPage() {
  const [newslistItems, setNewslistItems] = useState<NewslistsItem[]>([]);
  // const [editingItem, setEditingItem] = useState<NewslistsItem | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewslist() {
      try {
        const response = await fetch('/api/newslists'); // ตรวจสอบให้แน่ใจว่า endpoint ถูกต้อง
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        if (result.success) {
          setNewslistItems(result.data);
        } else {
          setError('Failed to load data items');
        }
      } catch (err) {
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchNewslist();
  }, []);

  const handleEditHistory = async (data: { id: number; title: string; description: string; imageUrl: string }) => {
    const response = await fetch(`/api/newslists/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedNewslist = await response.json();
      setNewslistItems((prev) =>
        prev.map((item) => (item.id === updatedNewslist.data.id ? updatedNewslist.data : item))
      );
      setEditingItem(null); // ปิดฟอร์มแก้ไข
    }
  };

  const handleAddNewslist = async (data: { title: string; description: string; imageUrl: string }) => {
    const response = await fetch('/api/newslists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newNewslist = await response.json();
      setNewslistItems((prev) => [newNewslist.data, ...prev]);
      setShowForm(false); // ปิดฟอร์มหลังจากเพิ่มสำเร็จ
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ข่าวประชาสัมพันธ์</h1>

      {/* ปุ่มแสดงฟอร์ม */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        เพิ่มรูปภาพ
      </button>

      {/* ฟอร์มสำหรับเพิ่มข้อมูล */}
      {showForm && (
        <NewslistForm
          onSubmit={handleAddNewslist}
          onClose={() => setShowForm(false)} // ฟังก์ชันปิดฟอร์ม
        />
      )}

      {/* แสดงข้อมูลในรูปแบบการ์ด */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newslistItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={800}
              height={600}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              {/* <p className="text-gray-600">{item.description}</p> */}

              <p className="text-gray-600">
          {item.description.length > 300 ? (
            <>
              {item.description.slice(0, 300)}...
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
              >
                แก้ไข
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* ฟอร์มแก้ไข */}
      {/* {editingItem && (
        <HistoryEditForm
          initialData={editingItem}
          onSubmit={handleEditHistory}
          onClose={() => setEditingItem(null)} // ปิดฟอร์ม
        />
      )} */}
    </div>
  );
}
