# Playwright Test Automation Assignment

This project contains automated tests for the DemoQA website using Playwright with Typescript, covering both UI and API testing scenarios.

## Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Run all tests:**
   ```bash
   npm run test:all
   ```

4. **View test report:**
   ```bash
   npx playwright show-report
   ```

## Project Structure

```
e2e/
├── api/
│   ├── pages/
│   │   ├── AccountAPI.ts
│   │   └── BookStoreAPI.ts
│   ├── tc07-user-creation.spec.ts
│   ├── tc08-add-books.spec.ts
│   └── tc09-remove-books.spec.ts
├── ui/
│   ├── pages/
│   │   ├── HomePage.ts
│   │   ├── ElementsPage.ts
│   │   ├── FormsPage.ts
│   │   ├── PracticeFormPage.ts
│   │   ├── WebTablesPage.ts
│   │   ├── BrokenLinksImagesPage.ts
│   │   ├── ProgressBarPage.ts
│   │   ├── ToolTipsPage.ts
│   │   ├── DroppablePage.ts
│   │   ├── InteractionsPage.ts
│   │   └── WidgetsPage.ts
│   ├── tc01-webtablesfields.spec.ts
│   ├── tc02-brokenlinksimages.spec.ts
│   ├── tc03-practiceform.spec.ts
│   ├── tc04-progressbar.spec.ts
│   ├── tc05-tooltip.spec.ts
│   └── tc06-dragdrop.spec.ts
└── assets/
    └── sample.png
```

## Test Coverage

### UI Tests
- **TC01**: Web Tables 
- **TC02**: Broken Links and Images
- **TC03**: Practice Form
- **TC04**: Progress Bar
- **TC05**: Tooltip
- **TC06**: Drag and Drop

### API Tests
- **TC07**: User creation and authentication
- **TC08**: Adding books to user collection
- **TC09**: Removing books from user collection

## Configuration

The project is configured to run tests across three browsers (Chrome, Firefox, Safari) with the following settings:
- **Retries**: 2 attempts for failed tests
- **Workers**: 2 parallel workers (1 per browser)
- **Timeout**: 60 seconds per test
- **Screenshots**: Captured on test failures
- **Reports**: HTML and JSON formats

## Test Data

- Tests use dynamic data generation (timestamps) to avoid conflicts
- Sample image file included for upload tests
- API tests use DemoQA's Swagger

## Technical Implementation Notes

### Architecture & Design Patterns
- **Page Object Model**: Implemented to maintain clean separation between test logic and page interactions
- **API Abstraction**: Centralized API calls with consistent error handling and response parsing
- **Cross-browser Strategy**: Configured for Chrome, Firefox, and Safari with browser-specific optimizations

### Performance Considerations
- **Parallel Execution**: Tests run concurrently across browsers with controlled worker allocation
- **Resource Management**: Limited to 1 worker per browser to prevent resource conflicts

### Suggested Improvements
- **Test Data Management**: Consider implementing a test data factory pattern for more complex scenarios
- **Test Reporting**: Enhance reporting with custom metrics and trend analysis
- **Test Coverage**: Increase test coverage for each feature

