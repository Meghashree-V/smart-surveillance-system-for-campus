import { addAdmin } from './firestoreHelpers.js';

// Call this script ONCE to create the default admin in Firestore
defaultAdmin();

async function defaultAdmin() {
  try {
    const id = await addAdmin({
      fullName: 'Admin',
      email: 'admin@admin.com',
      role: 'admin',
      department: 'CSE',
      phone: '+91 9876543210',
      username: 'admin',
      password: 'admin123', // For reference only, do NOT store plaintext passwords in production!
    });
    console.log('Default admin created with ID:', id);
  } catch (err) {
    console.error('Error creating default admin:', err);
  }
}
