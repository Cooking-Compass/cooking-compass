import { test } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json',
});
