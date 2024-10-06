import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class JoblyApi {
  // Token for interacting with the API
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);
    
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      // Error handling: Log the error and throw a user-friendly message
      console.error('API Error:', err.response);
      const message = (err.response && err.response.data && err.response.data.error && err.response.data.error.message) || 'An unexpected error occurred';
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies (filtered by name if not undefined) */
  static async getCompanies(name) {
    const res = await this.request('companies', { name });
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get jobs by title (filtered by title if not undefined) */
  static async getJobs(title) {
    const res = await this.request('jobs', { title });
    return res.jobs;
  }

  /** Get job by id */
  static async getJobByID(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Signup for site. */
  static async signup(data) {
    const res = await this.request('auth/register', data, 'post');
    return res.token;
  }

  /** Get token for login from username and password. */
  static async login(data) {
    const res = await this.request('auth/token', data, 'post');
    return res.token;
  }

  /** Save user profile edits. */
  static async saveProfile(username, data) {
    const res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }

  /** Delete user profile. */
  static async deleteProfile(username) {
    await this.request(`users/${username}`, {}, 'delete');
  }

  /** Save job to current user. */
  static async applyToJob(username, jobID) {
    await this.request(`users/${username}/jobs/${jobID}`, {}, 'post');
  }
}

// For testing purposes, setting a default token (remove in production)
JoblyApi.token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
  'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
  'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default JoblyApi;
