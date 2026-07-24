import axios from "axios";
import type { Note, NewNote } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN as string;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export default async function fetchNotes(
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> {
  const { search, page = 1, perPage = 12 } = params;
  const queryParams: Record<string, string | number> = { page, perPage };
  if (search) queryParams.search = search;
  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: queryParams,
  });
  return response.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const respons = await axiosInstance.post("/notes", note);
  return respons.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
}
