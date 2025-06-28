
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Edit, Flag } from "lucide-react";
import { useState } from "react";

// Mock data
const studentsData = [
  { id: 1, name: "Rahul Sharma", grade: "10th", area: "Malviya Nagar", attendance: 95, performance: "Excellent", subjects: { math: 85, science: 90, english: 88 } },
  { id: 2, name: "Priya Kumar", grade: "8th", area: "Saket", attendance: 45, performance: "At-risk", subjects: { math: 55, science: 60, english: 65 } },
  { id: 3, name: "Amit Singh", grade: "9th", area: "Lajpat Nagar", attendance: 88, performance: "Good", subjects: { math: 78, science: 82, english: 75 } },
  { id: 4, name: "Sneha Gupta", grade: "7th", area: "Greater Kailash", attendance: 35, performance: "At-risk", subjects: { math: 45, science: 50, english: 55 } },
  { id: 5, name: "Vikash Verma", grade: "10th", area: "Nehru Place", attendance: 92, performance: "Excellent", subjects: { math: 95, science: 88, english: 90 } },
];

const performanceData = [
  { month: 'Jan', math: 75, science: 80, english: 78 },
  { month: 'Feb', math: 78, science: 82, english: 80 },
  { month: 'Mar', math: 80, science: 85, english: 82 },
  { month: 'Apr', math: 82, science: 87, english: 85 },
  { month: 'May', math: 85, science: 88, english: 87 },
  { month: 'Jun', math: 87, science: 90, english: 88 }
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = areaFilter === "all" || student.area === areaFilter;
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;
    return matchesSearch && matchesArea && matchesGrade;
  });

  const atRiskStudents = studentsData.filter(s => s.attendance < 60);

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent": return "default";
      case "Good": return "secondary";
      case "At-risk": return "destructive";
      default: return "secondary";
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 80) return "text-green-600";
    if (attendance >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Monitor student progress and attendance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <User className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Alert for At-Risk Students */}
      {atRiskStudents.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <Flag className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{atRiskStudents.length} students</strong> have attendance below 60% and need immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{studentsData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">At-Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {studentsData.filter(s => s.performance === "At-risk").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Excellent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {studentsData.filter(s => s.performance === "Excellent").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(studentsData.reduce((sum, s) => sum + s.attendance, 0) / studentsData.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Subject-wise Performance Trends</CardTitle>
          <p className="text-sm text-gray-600">Average scores across all students</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="math" stroke="#3B82F6" strokeWidth={2} name="Math" />
              <Line type="monotone" dataKey="science" stroke="#10B981" strokeWidth={2} name="Science" />
              <Line type="monotone" dataKey="english" stroke="#F59E0B" strokeWidth={2} name="English" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="Malviya Nagar">Malviya Nagar</SelectItem>
                <SelectItem value="Saket">Saket</SelectItem>
                <SelectItem value="Lajpat Nagar">Lajpat Nagar</SelectItem>
                <SelectItem value="Greater Kailash">Greater Kailash</SelectItem>
                <SelectItem value="Nehru Place">Nehru Place</SelectItem>
              </SelectContent>
            </Select>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="7th">7th Grade</SelectItem>
                <SelectItem value="8th">8th Grade</SelectItem>
                <SelectItem value="9th">9th Grade</SelectItem>
                <SelectItem value="10th">10th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.area}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                      {student.attendance}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPerformanceColor(student.performance)}>
                      {student.performance}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;
