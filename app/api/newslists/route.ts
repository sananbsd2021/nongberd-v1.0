import { supabase } from '@/utils/supabaseClient';
import { BunRequest } from 'bun';

// Newslist item type definition
interface NewslistItem {
  id?: number;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to validate request body
function validateNewslistItem(body: Partial<NewslistItem>): { valid: boolean; message?: string } {
  if (!body.title || typeof body.title !== 'string') {
    return { valid: false, message: 'Title is required and must be a string.' };
  }
  if (!body.imageUrl || typeof body.imageUrl !== 'string') {
    return { valid: false, message: 'Image URL is required and must be a string.' };
  }
  return { valid: true };
}

// Helper function to return error responses
function createErrorResponse(message: string, status: number = 500): Response {
  return new Response(JSON.stringify({ success: false, message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET: Fetch all newslist items
export async function GET(request: BunRequest): Promise<Response> {
  const { data: newslist, error } = await supabase
    .from<NewslistItem>('newslist')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    return createErrorResponse('Failed to fetch newslist items.');
  }

  return new Response(JSON.stringify({ success: true, data: newslist, message: 'Newslist items fetched successfully.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST: Add a new newslist item
export async function POST(request: BunRequest): Promise<Response> {
  try {
    const body: Partial<NewslistItem> = await request.json();

    // Validate the request body
    const { valid, message } = validateNewslistItem(body);
    if (!valid) {
      return createErrorResponse(message || 'Invalid request body.', 400);
    }

    // Insert the new newslist item into the database
    const { data, error } = await supabase.from<NewslistItem>('newslist').insert([body]).select();

    if (error) {
      return createErrorResponse('Failed to create newslist item.');
    }

    return new Response(JSON.stringify({ success: true, data, message: 'Newslist item created successfully.' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return createErrorResponse('Invalid request body.', 400);
  }
}

// PUT: Update an existing newslist item
export async function PUT(request: BunRequest): Promise<Response> {
  try {
    const body: Partial<NewslistItem> = await request.json();

    if (!body.id) {
      return createErrorResponse('ID is required for updating an item.', 400);
    }

    // Validate the request body
    const { valid, message } = validateNewslistItem(body);
    if (!valid) {
      return createErrorResponse(message || 'Invalid request body.', 400);
    }

    // Update the existing newslist item
    const { data, error } = await supabase
      .from<NewslistItem>('newslist')
      .update(body)
      .eq('id', body.id)
      .select();

    if (error) {
      return createErrorResponse('Failed to update newslist item.');
    }

    return new Response(JSON.stringify({ success: true, data, message: 'Newslist item updated successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return createErrorResponse('Invalid request body.', 400);
  }
}

// DELETE: Remove a newslist item
export async function DELETE(request: BunRequest): Promise<Response> {
  try {
    const body: { id: number } = await request.json();

    if (!body.id) {
      return createErrorResponse('ID is required for deleting an item.', 400);
    }

    // Delete the newslist item from the database
    const { data, error } = await supabase.from<NewslistItem>('newslist').delete().eq('id', body.id).select();

    if (error) {
      return createErrorResponse('Failed to delete newslist item.');
    }

    return new Response(JSON.stringify({ success: true, data, message: 'Newslist item deleted successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return createErrorResponse('Invalid request body.', 400);
  }
}
