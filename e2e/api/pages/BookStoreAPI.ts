import { APIRequestContext } from '@playwright/test';

export class BookStoreAPI {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = 'https://demoqa.com';
  }
  
  async getBooks() {
    const response = await this.request.get(`${this.baseURL}/BookStore/v1/Books`);
    
    return {
      status: response.status(),
      body: await response.json()
    };
  }
  
  async getBook(isbn: string) {
    const response = await this.request.get(`${this.baseURL}/BookStore/v1/Book?ISBN=${isbn}`);
    
    return {
      status: response.status(),
      body: await response.json()
    };
  }
  
  async addBooksToUser(userId: string, isbns: string[], token: string) {
    const response = await this.request.post(`${this.baseURL}/BookStore/v1/Books`, {
      data: {
        userId: userId,
        collectionOfIsbns: isbns.map(isbn => ({ isbn }))
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    return {
      status: response.status(),
      body: await response.json()
    };
  }
  
  async removeBookFromUser(userId: string, isbn: string, token: string) {
    const response = await this.request.delete(`${this.baseURL}/BookStore/v1/Book`, {
      data: {
        isbn: isbn,
        userId: userId
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    let body;
    try {
      const text = await response.text();
      body = text ? JSON.parse(text) : null;
    } catch (error) {
      body = null;
    }
    
    return {
      status: response.status(),
      body: body
    };
  }
  
  async getUserBooks(userId: string, token: string) {
    const response = await this.request.get(`${this.baseURL}/Account/v1/User/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return {
      status: response.status(),
      body: await response.json()
    };
  }
}
