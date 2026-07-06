import axios from 'axios';

const API_BASE_URL = 'https://demohotelsapi.pythonanywhere.com/hotels/';

export async function getHotels() {
  const response = await axios.get(API_BASE_URL);
  return response.data.data ?? [];
}

export async function getHotelById(id) {
  const response = await axios.get(`${API_BASE_URL}${id}/`);
  return response.data.data ?? null;
}
