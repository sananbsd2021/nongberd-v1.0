import { supabase } from '../../../../utils/supabaseClient'; // Ensure you have your Supabase client configured
import Image from 'next/image';

export default async function GalleryDetailPage({ params }: { params: { id: string } }) {
  // Extract the ID from params
  const { id } = params;

  // Fetch the gallery item from Supabase
  const { data: galleryItem, error } = await supabase
    .from('history')
    .select('*')
    .eq('id', id)
    .single(); // Use `.single()` to retrieve a single record

  // Handle errors or no data
  if (error || !galleryItem) {
    return <div className="p-4">ไม่พบข้อมูล</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{galleryItem.title}</h1>
      <Image
        src={galleryItem.imageUrl}
        alt={galleryItem.title}
        className="w-full h-64 object-cover rounded mb-4"
        width={800}
        height={600}
      />
      <p>{galleryItem.description}</p>
      <p className="text-sm text-gray-400 mt-4">
        Added on: {new Date(galleryItem.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
