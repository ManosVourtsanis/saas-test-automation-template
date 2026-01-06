import { test, expect } from '@playwright/test';
import { AccountAPI } from './pages/AccountAPI';
import { BookStoreAPI } from './pages/BookStoreAPI';

test.describe('Add Books to User API Tests', () => {
  let accountAPI: AccountAPI;
  let bookStoreAPI: BookStoreAPI;

  test.beforeEach(async ({ request }) => {
    accountAPI = new AccountAPI(request);
    bookStoreAPI = new BookStoreAPI(request);
  });

  test('TC08-01: Add books to user - Happy Flow', async () => {
    const userData = {
      userName: `testuser_${Date.now()}`,
      password: 'TestPassword123!'
    };

    const userResponse = await accountAPI.createUser(userData);
    
    if (userResponse.status >= 500) {
      test.skip(true, 'DemoQA API is currently unavailable (Server Error)');
      return;
    }
    
    expect(userResponse.status).toBe(201);
    const userId = userResponse.body.userID;

    await new Promise(resolve => setTimeout(resolve, 1000));

    const tokenResponse = await accountAPI.generateToken(userData);
    
    if (tokenResponse.status >= 500) {
      test.skip(true, 'DemoQA API is currently unavailable (Server Error)');
      return;
    }
    
    expect(tokenResponse.status).toBe(200);
    expect(tokenResponse.body.status).toBe('Success');
    const token = tokenResponse.body.token;

    const booksResponse = await bookStoreAPI.getBooks();
    expect(booksResponse.status).toBe(200);
    expect(booksResponse.body.books).toBeDefined();
    expect(booksResponse.body.books.length).toBeGreaterThan(0);

    const booksToAdd = booksResponse.body.books.slice(0, 2).map((book: any) => book.isbn);

    const addBooksResponse = await bookStoreAPI.addBooksToUser(userId, booksToAdd, token);

    expect(addBooksResponse.status).toBe(201);
    expect(addBooksResponse.body).toHaveProperty('books');
    expect(addBooksResponse.body.books).toHaveLength(2);

    const userBooksResponse = await bookStoreAPI.getUserBooks(userId, token);
    expect(userBooksResponse.status).toBe(200);
    expect(userBooksResponse.body.books).toHaveLength(2);
  });

  test('TC08-02: Add books to user - Unhappy Flow (Invalid Token)', async () => {
    const userData = {
      userName: `testuser_${Date.now()}`,
      password: 'TestPassword123!'
    };

    const userResponse = await accountAPI.createUser(userData);
    expect(userResponse.status).toBe(201);
    const userId = userResponse.body.userID;

    const invalidToken = 'invalid_token';

    const booksResponse = await bookStoreAPI.getBooks();
    expect(booksResponse.status).toBe(200);
    const booksToAdd = [booksResponse.body.books[0].isbn];

    const addBooksResponse = await bookStoreAPI.addBooksToUser(userId, booksToAdd, invalidToken);

    expect(addBooksResponse.status).toBe(401);
    expect(addBooksResponse.body).toHaveProperty('code', '1200');
    expect(addBooksResponse.body).toHaveProperty('message', 'User not authorized!');
  });
});
