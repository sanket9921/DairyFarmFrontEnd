import axios, { AxiosResponse } from 'axios';
import { User } from '../types/User';
import API_URL_MAIN from '../config/config';

// Define the base URL for user-related API calls
const API_URL = API_URL_MAIN+'/users';


// Define login response type
export interface LoginResponse {
  message: string;
  role: string;
}

// 1. Create a new user (Signup)
const createUser = (userData: User): Promise<AxiosResponse<string>> => {
  return axios.post(`${API_URL}/signup`, userData);
};

// 2. Login a user
const loginUser = (loginData: User): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post(`${API_URL}/login`, loginData);
};

// 3. Get all users (for admin)
const getAllUsers = (): Promise<AxiosResponse<User[]>> => {
  return axios.get(`${API_URL}`);
};

// 4. Get a user by ID
const getUserById = (userId: number): Promise<AxiosResponse<User>> => {
  return axios.get(`${API_URL}/${userId}`);
};

// 5. Update user details (for admin)
const updateUser = (userId: number, updatedData: User): Promise<AxiosResponse<string>> => {
  return axios.put(`${API_URL}/${userId}`, updatedData);
};

// 6. Delete a user (for admin)
const deleteUser = (userId: number): Promise<AxiosResponse<string>> => {
  return axios.delete(`${API_URL}/${userId}`);
};

// Check if username or email exists
const checkUsernameOrEmailExists = (username: string, email: string): Promise<AxiosResponse<boolean>> => {
  return axios.get(`${API_URL}/check-username-email`, {
    params: { username, email }
  });
};

 const authenticate = async (username: string, password: string): Promise<any> => {
  try {
      const response = await axios.post(`${API_URL}/login`, {
          username,
          password,
      });
      return response.data; // Assuming your API returns user data including role
  } catch (error) {
      throw new Error('Authentication failed'); // Handle error appropriately
  }
};

// Export all the services as a single object
const UserService = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  checkUsernameOrEmailExists,
  authenticate,
};

export default UserService;
