// Fetch auto-marked attendance for a subject teacher
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Get auto-marked attendance for a teacher by username (or teacherId)
export async function getAutoMarkedAttendanceForTeacher(teacherUsername) {
  // You may want to filter by subject, date, etc. depending on your data model
  const q = query(
    collection(db, 'attendance_auto_marked'),
    where('teacherUsername', '==', teacherUsername)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
