import { test } from '@playwright/test';

test.use({
  storageState: 'john-auth.json', // Simulate logged-in state for John
});
