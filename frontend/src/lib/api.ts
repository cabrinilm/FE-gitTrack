import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL + "/rest/v1",
  headers: {
    "Content-Type": "application/json",
    "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
});

export function setApiToken(token: string | null) {
  api.defaults.headers.Authorization = token ? `Bearer ${token}` : "";
}