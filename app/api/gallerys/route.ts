import { supabase } from '../../../utils/supabaseClient';
import { BunRequest } from 'bun';

// Gallery item type definition
interface GalleryItem {
  id?: number;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to validate POST request body
function validateGalleryItem(body: Partial<GalleryItem>): { valid: boolean; message?: string } {
  if (!body.title || typeof body.title !== 'string') {
    return { valid: false, message: 'Title is required and must be a string.' };
  }
  if (!body.imageUrl || typeof body.imageUrl !== 'string') {
    return { valid: false, message: 'Image URL is required and must be a string.' };
  }
  return { valid: true };
}

// GET: Fetch all gallery items
export async function GET(request: BunRequest): Promise<Response> {
  const { data: gallery, error } = await supabase.from<GalleryItem>('gallery').select('*');

  if (error) {
    return new Response(JSON.stringify({ success: false, message: 'Failed to fetch gallery items.', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true, data: gallery, message: 'Gallery items fetched successfully.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST: Add a new gallery item
export async function POST(request: BunRequest): Promise<Response> {
  try {
    const body: Partial<GalleryItem> = await request.json();

    // Validate the request body
    const { valid, message } = validateGalleryItem(body);
    if (!valid) {
      return new Response(JSON.stringify({ success: false, message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert the new gallery item into the database
    const { data, error } = await supabase.from<GalleryItem>('gallery').insert([body]).select();

    if (error) {
      return new Response(JSON.stringify({ success: false, message: 'Failed to create gallery item.', error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data, message: 'Gallery item created successfully.' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// // Helper function to validate request body
// function validateGalleryItem(body: Partial<GalleryItem>, isUpdate = false): { valid: boolean; message?: string } {
//   if (!isUpdate && (!body.title || typeof body.title !== 'string')) {
//     return { valid: false, message: 'Title is required and must be a string.' };
//   }
//   if (!isUpdate && (!body.imageUrl || typeof body.imageUrl !== 'string')) {
//     return { valid: false, message: 'Image URL is required and must be a string.' };
//   }
//   return { valid: true };
// }

// // PUT: Update an existing gallery item
// export async function PUT(request: BunRequest): Promise<Response> {
//   try {
//     const body: Partial<GalleryItem> = await request.json();

//     // Validate input
//     if (!body.id) {
//       return new Response(JSON.stringify({ success: false, message: 'ID is required for updating.' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const { valid, message } = validateGalleryItem(body, true);
//     if (!valid) {
//       return new Response(JSON.stringify({ success: false, message }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const { data, error } = await supabase
//       .from<GalleryItem>('gallery')
//       .update(body)
//       .eq('id', body.id)
//       .select();

//     if (error) {
//       return new Response(JSON.stringify({ success: false, message: 'Failed to update gallery item.', error: error.message }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     return new Response(JSON.stringify({ success: true, data, message: 'Gallery item updated successfully.' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (err) {
//     return new Response(JSON.stringify({ success: false, message: 'Invalid request body.' }), {
//       status: 400,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// DELETE: Remove a gallery item
export async function DELETE(request: BunRequest): Promise<Response> {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ success: false, message: 'ID is required for deletion.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data, error } = await supabase.from<GalleryItem>('gallery').delete().eq('id', id);

    if (error) {
      return new Response(JSON.stringify({ success: false, message: 'Failed to delete gallery item.', error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ success: false, message: 'Gallery item not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Gallery item deleted successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
