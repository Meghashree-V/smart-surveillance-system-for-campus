import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, getDocs as getDocsAlias } from 'firebase/firestore';

// Add a new student with all required fields
export async function addStudent({
  name,
  usn,
  semester,
  section,
  branch,
  password,
  email,
  phone,
  parentDetails, // { fatherName, fatherPhone, motherName, motherPhone }
  address,
  videoUrl,
  consentGiven
}) {
  const docRef = await addDoc(collection(db, 'students'), {
    name,
    usn,
    semester,
    section,
    branch,
    password,
    email,
    phone,
    parentDetails,
    address,
    videoUrl,
    consentGiven
  });
  return docRef.id;
}

// Add a new class coordinator
export async function addClassCoordinator({
  username,
  name,
  email,
  role,
  department,
  status = 'pending',
  createdAt = new Date().toISOString(),
  passwordChanged = false,
  tempPassword
}) {
  const docRef = await addDoc(collection(db, 'class_coordinators'), {
    username,
    name,
    email,
    role,
    department,
    status,
    createdAt,
    passwordChanged,
    tempPassword
  });
  return docRef.id;
}

// Add a new subject teacher
export async function addSubjectTeacher({
  username,
  name,
  email,
  role,
  department,
  status = 'pending',
  createdAt = new Date().toISOString(),
  passwordChanged = false,
  tempPassword,
  semester = '',
  subject = '',
  subjectCode = ''
}) {
  const docRef = await addDoc(collection(db, 'subject_teachers'), {
    username,
    name,
    email,
    role,
    department,
    status,
    createdAt,
    passwordChanged,
    tempPassword,
    semester,
    subject,
    subjectCode
  });
  return docRef.id;
}

// Fetch all subject teachers
export async function getAllSubjectTeachers() {
  const snapshot = await getDocs(collection(db, 'subject_teachers'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch all class coordinators
export async function getAllClassCoordinators() {
  const snapshot = await getDocs(collection(db, 'class_coordinators'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch admin by username
export async function getAdminByUsername(username) {
  const q = query(collection(db, 'admins'), where('username', '==', username));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}
