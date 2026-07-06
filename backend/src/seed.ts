import { seedAdmin } from './seed/seedAdmin';
import { seedContent } from './seed/seedContent';

(async () => {
  await seedAdmin();
  await seedContent();
  console.log('✅ All seeding complete');
  process.exit(0);
})();