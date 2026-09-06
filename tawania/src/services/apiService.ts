const API_BASE_URL = typeof window !== 'undefined' ? '/api/v1' : 'http://127.0.0.1:8000/api/v1';

export function getAuthToken(): string | null {
  return localStorage.getItem('tawania_auth_token');
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('tawania_auth_token', token);
  } else {
    localStorage.removeItem('tawania_auth_token');
  }
}

async function fetchJson(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const authHeaders: Record<string, string> = {};
  if (token) {
    authHeaders['Authorization'] = `Bearer ${token}`;
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...authHeaders,
    ...(options.headers || {}),
  };

  const candidateUrls: string[] = [url];
  if (url.startsWith('/api/v1')) {
    candidateUrls.push(`http://127.0.0.1:8000${url}`);
    candidateUrls.push(`http://localhost:8000${url}`);
    candidateUrls.push(url.replace('/api/v1', '/api'));
  } else if (url.includes(':8000/api/v1')) {
    candidateUrls.push(url.replace(/https?:\/\/[^/]+/, ''));
    candidateUrls.push(url.replace('localhost', '127.0.0.1'));
  }

  for (const targetUrl of candidateUrls) {
    try {
      const res = await fetch(targetUrl, {
        headers: defaultHeaders,
        ...options,
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (err) {
      // Continue trying fallback endpoints
    }
  }

  return null;
}

export const apiService = {
  // Auth Login
  async login(email: string, password: string) {
    const data = await fetchJson(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data && data.success && data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  // Auth Me
  async me() {
    return await fetchJson(`${API_BASE_URL}/auth/me`);
  },

  // Members
  async getMembers() {
    return await fetchJson(`${API_BASE_URL}/members`);
  },
  async addMember(data: any) {
    return await fetchJson(`${API_BASE_URL}/members`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateMember(id: number | string, data: any) {
    return await fetchJson(`${API_BASE_URL}/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteMember(id: number | string) {
    return await fetchJson(`${API_BASE_URL}/members/${id}`, {
      method: 'DELETE',
    });
  },

  // Dashboard Overview
  async getDashboardOverview() {
    return await fetchJson(`${API_BASE_URL}/dashboard/overview`);
  },

  // Submissions
  async getSubmissions(module = 'all') {
    return await fetchJson(`${API_BASE_URL}/submissions?module=${module}`);
  },
  async addSubmission(data: any) {
    return await fetchJson(`${API_BASE_URL}/submissions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateSubmissionStatus(id: string, status: string) {
    return await fetchJson(`${API_BASE_URL}/submissions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
  async deleteSubmission(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/submissions/${id}`, {
      method: 'DELETE',
    });
  },
  async confirmMembership(id: string) {
    return await fetchJson(`${API_BASE_URL}/submissions/${id}/confirm-membership`, {
      method: 'POST',
    });
  },

  // Board & CEO
  async getBoardMembers() {
    return await fetchJson(`${API_BASE_URL}/board-members`);
  },
  async addBoardMember(data: any) {
    return await fetchJson(`${API_BASE_URL}/board-members`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateBoardMember(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/board-members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteBoardMember(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/board-members/${id}`, {
      method: 'DELETE',
    });
  },

  // Workshops
  async getWorkshops(type?: string) {
    const q = type && type !== 'all' ? `?type=${type}` : '';
    return await fetchJson(`${API_BASE_URL}/workshops${q}`);
  },
  async addWorkshop(data: any) {
    return await fetchJson(`${API_BASE_URL}/workshops`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateWorkshop(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/workshops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteWorkshop(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/workshops/${id}`, {
      method: 'DELETE',
    });
  },

  // Regulations
  async getRegulations(sec?: string) {
    const q = sec && sec !== 'all' ? `?sec=${sec}` : '';
    return await fetchJson(`${API_BASE_URL}/regulations${q}`);
  },
  async addRegulation(data: any) {
    return await fetchJson(`${API_BASE_URL}/regulations`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateRegulation(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/regulations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteRegulation(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/regulations/${id}`, {
      method: 'DELETE',
    });
  },

  // Financials
  async getFinancials() {
    return await fetchJson(`${API_BASE_URL}/financials`);
  },
  async addFinancial(data: any) {
    return await fetchJson(`${API_BASE_URL}/financials`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateFinancial(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/financials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteFinancial(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/financials/${id}`, {
      method: 'DELETE',
    });
  },

  // Feedback Cards
  async syncFeedbackCards(cards: any[]) {
    return await fetchJson(`${API_BASE_URL}/feedback-cards/sync`, {
      method: 'POST',
      body: JSON.stringify({ cards }),
    });
  },
  async getFeedbackCards() {
    return await fetchJson(`${API_BASE_URL}/feedback-cards`);
  },
  async addFeedbackCard(data: any) {
    return await fetchJson(`${API_BASE_URL}/feedback-cards`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateFeedbackCard(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/feedback-cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteFeedbackCard(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/feedback-cards/${id}`, {
      method: 'DELETE',
    });
  },

  // Policies
  async getPolicies(category?: string) {
    const q = category && category !== 'all' ? `?category=${category}` : '';
    return await fetchJson(`${API_BASE_URL}/policies${q}`);
  },
  async addPolicy(data: any) {
    return await fetchJson(`${API_BASE_URL}/policies`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updatePolicy(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/policies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deletePolicy(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/policies/${id}`, {
      method: 'DELETE',
    });
  },

  // Ethics
  async getEthics() {
    return await fetchJson(`${API_BASE_URL}/ethics`);
  },
  async addEthics(data: any) {
    return await fetchJson(`${API_BASE_URL}/ethics`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateEthics(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/ethics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteEthics(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/ethics/${id}`, {
      method: 'DELETE',
    });
  },

  // Meetings
  async getMeetings(type = 'all') {
    return await fetchJson(`${API_BASE_URL}/meetings?type=${type}`);
  },
  async addMeeting(data: any) {
    return await fetchJson(`${API_BASE_URL}/meetings`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateMeeting(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/meetings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteMeeting(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/meetings/${id}`, {
      method: 'DELETE',
    });
  },

  // Projects
  async getProjects() {
    return await fetchJson(`${API_BASE_URL}/projects`);
  },
  async addProject(data: any) {
    return await fetchJson(`${API_BASE_URL}/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateProject(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteProject(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
  },

  
  // Executive Director
  async getExecutiveDirector() {
    return await fetchJson(`${API_BASE_URL}/executive-director`);
  },
  async updateExecutiveDirector(data: any) {
    return await fetchJson(`${API_BASE_URL}/executive-director`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Gallery
  async getGallery() {
    return await fetchJson(`${API_BASE_URL}/gallery`);
  },
  async addGalleryItem(data: any) {
    return await fetchJson(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateGalleryItem(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteGalleryItem(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
    });
  },

  
  // Home Content Management
  async getHomeContent() {
    return await fetchJson(`${API_BASE_URL}/home-content`);
  },
  async updateHomeSection(sectionKey: string, data: any) {
    return await fetchJson(`${API_BASE_URL}/home-content/${sectionKey}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Governance Documents
  async getGovernanceDocs(type?: string) {
    const query = type ? `?type=${type}` : '';
    return await fetchJson(`${API_BASE_URL}/governance${query}`);
  },
  async addGovernanceDoc(data: any) {
    return await fetchJson(`${API_BASE_URL}/governance`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateGovernanceDoc(id: string | number, data: any) {
    return await fetchJson(`${API_BASE_URL}/governance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteGovernanceDoc(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/governance/${id}`, {
      method: 'DELETE',
    });
  },

  // Dynamic Dashboard Notifications
  async getNotifications(module?: string) {
    const query = module ? `?module=${module}` : '';
    return await fetchJson(`${API_BASE_URL}/notifications${query}`);
  },
  async markNotificationAsRead(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'POST',
    });
  },
  async markAllNotificationsAsRead() {
    return await fetchJson(`${API_BASE_URL}/notifications/read-all`, {
      method: 'POST',
    });
  },
  async deleteNotification(id: string | number) {
    return await fetchJson(`${API_BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
    });
  },
};
