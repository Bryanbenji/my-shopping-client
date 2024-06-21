import axios from 'axios';

const inventoryApi = axios.create({
  baseURL: 'http://localhost:3002/api', // URL del servidor de inventario
});

export default inventoryApi;
