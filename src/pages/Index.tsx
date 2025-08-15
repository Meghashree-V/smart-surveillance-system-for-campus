
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Shield, Users, GraduationCap, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userType || !username || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    if (userType === 'admin') {
      try {
        const { getAdminByUsername } = await import('../lib/firestoreHelpers');
        const admin = await getAdminByUsername(username);
        if (!admin || admin.password !== password) {
          toast({
            title: "Invalid Credentials",
            description: "Incorrect admin username or password.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        localStorage.setItem('userType', userType);
        localStorage.setItem('username', username);
        toast({
          title: "Login Successful",
          description: `Welcome to the Campus Surveillance System`,
        });
        navigate('/admin-dashboard');
      } catch (err) {
        toast({
          title: "Login Error",
          description: "Could not validate admin credentials.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
      return;
    }

    // Simulate authentication for other user types
    setTimeout(() => {
      localStorage.setItem('userType', userType);
      localStorage.setItem('username', username);
      toast({
        title: "Login Successful",
        description: `Welcome to the Campus Surveillance System`,
      });
      // Navigate based on user type
      switch (userType) {
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'cc':
          navigate('/cc-dashboard');
          break;
        case 'teacher':
          navigate('/teacher-dashboard');
          break;
      }
      setIsLoading(false);
    }, 1000);
  };
  const userTypeIcons = {
    student: GraduationCap,
    cc: Users,
    teacher: UserCheck,
    admin: Shield
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Campus Surveillance</h1>
          <p className="text-slate-600">Smart Attendance & Security System</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">User Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Student
                      </div>
                    </SelectItem>
                    <SelectItem value="cc">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Class Coordinator
                      </div>
                    </SelectItem>
                    <SelectItem value="teacher">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        Subject Teacher
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username/ID</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username or ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
