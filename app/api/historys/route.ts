import { supabase } from '../../../utils/supabaseClient';
import { BunRequest } from 'bun';

// Newslist item type definition
interface HistorysItem {
  id?: number;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to validate request body
function validateHistorysItem(body: Partial<HistorysItem>): { valid: boolean; message?: string } {
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
  const { data: history, error } = await supabase
    .from<HistorysItem>('history')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    return createErrorResponse('Failed to fetch data items.');
  }

  return new Response(JSON.stringify({ success: true, data: history, message: 'Data items fetched successfully.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST: Add a new newslist item

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();

    // Validate the request body
    if (!body.title || typeof body.title !== 'string') {
      return new Response(
        JSON.stringify({ success: false, message: 'Title is required and must be a string.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!body.imageUrl || typeof body.imageUrl !== 'string') {
      return new Response(
        JSON.stringify({ success: false, message: 'Image URL is required and must be a string.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insert the new item into the database
    const { data, error } = await supabase.from('history').insert([body]).select();

    if (error) {
      console.error('Supabase Error:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to create data item.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data, message: 'Data item created successfully.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Unknown Error:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
