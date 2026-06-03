import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN as string;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
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

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await axiosInstance.post<Note>("/notes", data);
  return response.data;
}
export async function deleteNote(id: string) {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
}
