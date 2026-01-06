import { APIRequestContext } from '@playwright/test';

export class AccountAPI {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = 'https://demoqa.com';
  }
  
  async createUser(userData: {
    userName: string;
    password: string;
  }) {
    const response = await this.request.post(`${this.baseURL}/Account/v1/User`, {
      data: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  async generateToken(credentials: {
    userName: string;
    password: string;
  }) {
    const response = await this.request.post(`${this.baseURL}/Account/v1/GenerateToken`, {
      data: credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return {
      status: response.status(),
      body: await response.json()
    };
  }
  
  async authorizeUser(credentials: {
    userName: string;
    password: string;
  }) {
    const response = await this.request.post(`${this.baseURL}/Account/v1/Authorized`, {
      data: credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return {
      status: response.status(),
      body: await response.json()
    };
  }
}
