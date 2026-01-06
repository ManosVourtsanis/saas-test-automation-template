import { test, expect } from '@playwright/test';
import { AccountAPI } from './pages/AccountAPI';
import { BookStoreAPI } from './pages/BookStoreAPI';

test.describe('Remove Books from User API Tests', () => {
  let accountAPI: AccountAPI;
  let bookStoreAPI: BookStoreAPI;

  test.beforeEach(async ({ request }) => {
    accountAPI = new AccountAPI(request);
    bookStoreAPI = new BookStoreAPI(request);
  });

  test('TC09-01: Remove book from user - Happy Flow', async () => {
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

    const tokenResponse = await accountAPI.generateToken(userData);
    expect(tokenResponse.status).toBe(200);
    expect(tokenResponse.body.status).toBe('Success');
    const token = tokenResponse.body.token;

    const booksResponse = await bookStoreAPI.getBooks();
    expect(booksResponse.status).toBe(200);
    const bookToAdd = booksResponse.body.books[0].isbn;

    const addBookResponse = await bookStoreAPI.addBooksToUser(userId, [bookToAdd], token);
    expect(addBookResponse.status).toBe(201);

    const userBooksBefore = await bookStoreAPI.getUserBooks(userId, token);
    expect(userBooksBefore.status).toBe(200);
    expect(userBooksBefore.body.books).toHaveLength(1);

    const removeBookResponse = await bookStoreAPI.removeBookFromUser(userId, bookToAdd, token);

    expect(removeBookResponse.status).toBe(204);

    const userBooksAfter = await bookStoreAPI.getUserBooks(userId, token);
    expect(userBooksAfter.status).toBe(200);
    expect(userBooksAfter.body.books).toHaveLength(0);
  });

  test('TC09-02: Remove book from user - Unhappy Flow (Invalid Token)', async () => {
    const userData = {
      userName: `testuser_${Date.now()}`,
      password: 'TestPassword123!'
    };

    const userResponse = await accountAPI.createUser(userData);
    expect(userResponse.status).toBe(201);
    const userId = userResponse.body.userID;

    const booksResponse = await bookStoreAPI.getBooks();
    expect(booksResponse.status).toBe(200);
    const bookToRemove = booksResponse.body.books[0].isbn;

    const invalidToken = 'invalid_token_123';

    const removeBookResponse = await bookStoreAPI.removeBookFromUser(userId, bookToRemove, invalidToken);

    expect(removeBookResponse.status).toBe(401);
    expect(removeBookResponse.body).toHaveProperty('code', '1200');
    expect(removeBookResponse.body).toHaveProperty('message', 'User not authorized!');
  });
});
