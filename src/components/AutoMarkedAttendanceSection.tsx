import React, { useEffect, useState } from 'react';
import { getAutoMarkedAttendanceForTeacher } from '../lib/autoMarkedAttendanceHelpers';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AutoMarkedAttendanceSection = ({ teacherUsername }) => {
  const [autoMarked, setAutoMarked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teacherUsername) return;
    setLoading(true);
    getAutoMarkedAttendanceForTeacher(teacherUsername)
      .then(setAutoMarked)
      .finally(() => setLoading(false));
  }, [teacherUsername]);

  if (!teacherUsername) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Auto-Marked Attendance
        </CardTitle>
        <CardDescription>
          Students who were automatically marked present based on detection thresholds
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : autoMarked.length === 0 ? (
          <div className="text-slate-500">No auto-marked students found for your classes.</div>
        ) : (
          <div className="space-y-4">
            {autoMarked.map((record, idx) => (
              <div key={record.id || idx} className="border rounded-lg p-4 bg-green-50">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={record.image || '/placeholder.svg'} alt={record.name} />
                    <AvatarFallback>{record.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-slate-800">{record.name}</h3>
                      <Badge variant="outline">{record.usn}</Badge>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p><strong>Subject:</strong> {record.subject}</p>
                      <p><strong>Date:</strong> {record.date}</p>
                      <p><strong>Detection Time:</strong> {record.detectedTime || 'N/A'}</p>
                      <p className="text-green-600">Auto-marked present</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoMarkedAttendanceSection;
