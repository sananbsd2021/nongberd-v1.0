'use client';
import { useEffect, useState } from 'react';
import NewsForm from './NewsForm';
import NewsEditForm from './NewsEditForm';
// import { HistoryItem } from '../../types/history';
import Image from 'next/image';

export interface NewsItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  }
  
export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch('/api/news'); // ตรวจสอบให้แน่ใจว่า endpoint ถูกต้อง
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        if (result.success) {
          setNewsItems(result.data);
        } else {
          setError('Failed to load data items');
        }
      } catch (err) {
        setError(err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const handleEditHistory = async (data: { id: number; title: string; description: string; imageUrl: string }) => {
    const response = await fetch(`/api/news/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedHistory = await response.json();
      setNewsItems((prev) =>
        prev.map((item) => (item.id === updatedHistory.data.id ? updatedHistory.data : item))
      );
      setEditingItem(null); // ปิดฟอร์มแก้ไข
    }
  };

  const handleAddNews = async (data: { title: string; description: string; imageUrl: string }) => {
    const response = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newNews = await response.json();
      setNewsItems((prev) => [newNews.data, ...prev]);
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
      <h1 className="text-2xl font-bold mb-4">ข่าวสาร</h1>

      {/* ปุ่มแสดงฟอร์ม */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        เพิ่มรูปภาพ
      </button>

      {/* ฟอร์มสำหรับเพิ่มข้อมูล */}
      {showForm && (
        <NewsForm
          onSubmit={handleAddNews}
          onClose={() => setShowForm(false)} // ฟังก์ชันปิดฟอร์ม
        />
      )}

      {/* แสดงข้อมูลในรูปแบบการ์ด */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsItems.map((item) => (
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
                href={`/historys/${item.id}`}
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

              <button
                onClick={() => setEditingItem(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
              >
                แก้ไข
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ฟอร์มแก้ไข */}
      {/* {editingItem && (
        <NewsEditForm
          initialData={editingItem}
          onSubmit={handleEditHistory}
          onClose={() => setEditingItem(null)} // ปิดฟอร์ม
        />
      )} */}

    </div>
  );
}
