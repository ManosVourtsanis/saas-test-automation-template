import { test, expect } from '@playwright/test';
import { AccountAPI } from './pages/AccountAPI';

test.describe('User Account Creation API Tests', () => {
  let accountAPI: AccountAPI;

  test.beforeEach(async ({ request }) => {
    accountAPI = new AccountAPI(request);
  });

  test('TC07-01: Create user account - Happy Flow', async () => {
    const userData = {
      userName: `testuser_${Date.now()}`,
      password: 'TestPassword123!'
    };

    const response = await accountAPI.createUser(userData);

    if (response.status >= 500) {
      test.skip(true, 'DemoQA API is currently unavailable (Server Error)');
      return;
    }

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userID');
    expect(response.body).toHaveProperty('username', userData.userName);
    expect(response.body).toHaveProperty('books');
    expect(response.body.books).toEqual([]);
  });

  test('TC07-02: Create user account - Unhappy Flow (Duplicate Username)', async () => {
    const userData = {
      userName: 'existinguser',
      password: 'TestPassword123!'
    };

    await accountAPI.createUser(userData);
    const duplicateResponse = await accountAPI.createUser(userData);

    expect(duplicateResponse.status).toBe(406);
    expect(duplicateResponse.body).toHaveProperty('code', '1204');
    expect(duplicateResponse.body).toHaveProperty('message', 'User exists!');
  });
});
