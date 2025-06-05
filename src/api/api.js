
import axios from 'axios';
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
export const submitOnboardingData = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to submit data:', error);
    throw error;
  }
};
export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return {
      teamMembers: 12,
      activeProjects: 4,
      notifications: 3,
      chartData: [
        { name: 'Mon', progress: 30 },
        { name: 'Tue', progress: 50 },
        { name: 'Wed', progress: 45 },
        { name: 'Thu', progress: 60 },
        { name: 'Fri', progress: 80 },
        { name: 'Sat', progress: 65 },
        { name: 'Sun', progress: 90 },
      ],
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};
