const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

async function addAdmin() {
  const adminData = {
    username: 'admin',
    password: 'admin123'
  };

  const docRef = await db.collection('admins').add(adminData);
  console.log('Admin added with ID:', docRef.id);
}

addAdmin().catch(console.error);