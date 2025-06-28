
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit, Plus, Flag } from "lucide-react";

// Mock data
const tutorsData = [
  { id: 1, name: "Dr. Rajesh Kumar", area: "Malviya Nagar", sessions: 45, lastActive: "2024-06-20", status: "Active", subjects: ["Math", "Science"] },
  { id: 2, name: "Priya Sharma", area: "Saket", sessions: 32, lastActive: "2024-06-12", status: "Inactive", subjects: ["English", "Hindi"] },
  { id: 3, name: "Amit Singh", area: "Lajpat Nagar", sessions: 38, lastActive: "2024-06-19", status: "Active", subjects: ["Math", "Physics"] },
  { id: 4, name: "Sneha Gupta", area: "Greater Kailash", sessions: 28, lastActive: "2024-06-10", status: "Inactive", subjects: ["English", "Social Studies"] },
  { id: 5, name: "Vikram Verma", area: "Nehru Place", sessions: 52, lastActive: "2024-06-21", status: "Active", subjects: ["Science", "Math"] },
];

const Tutors = () => {
  const activeTutors = tutorsData.filter(t => t.status === "Active").length;
  const inactiveTutors = tutorsData.filter(t => t.status === "Inactive").length;
  const totalSessions = tutorsData.reduce((sum, t) => sum + t.sessions, 0);
  const inactiveTutorsData = tutorsData.filter(t => t.status === "Inactive");

  const getStatusColor = (status: string) => {
    return status === "Active" ? "default" : "destructive";
  };

  const daysSinceActive = (lastActive: string) => {
    const today = new Date();
    const lastDate = new Date(lastActive);
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tutor Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor tutoring staff</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Tutor
        </Button>
      </div>

      {/* Alert for Inactive Tutors */}
      {inactiveTutorsData.length > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Flag className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>{inactiveTutorsData.length} tutors</strong> have been inactive for 7+ days and may need follow-up.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Active Tutors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{activeTutors}</div>
            <p className="text-xs text-green-600 mt-1">Currently teaching</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Inactive Tutors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{inactiveTutors}</div>
            <p className="text-xs text-red-600 mt-1">Need follow-up</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{totalSessions}</div>
            <p className="text-xs text-blue-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Avg Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {Math.round(totalSessions / tutorsData.length)}
            </div>
            <p className="text-xs text-purple-600 mt-1">Per tutor</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <Plus className="h-4 w-4 mr-2" />
              Assign New Area
            </Button>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Edit className="h-4 w-4 mr-2" />
              Schedule Training
            </Button>
            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
              <Flag className="h-4 w-4 mr-2" />
              Send Reminders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tutors Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tutors ({tutorsData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutorsData.map((tutor) => (
                <TableRow key={tutor.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{tutor.name}</TableCell>
                  <TableCell>{tutor.area}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tutor.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{tutor.sessions}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{tutor.lastActive}</div>
                      <div className="text-xs text-gray-500">
                        {daysSinceActive(tutor.lastActive)} days ago
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(tutor.status)}>
                      {tutor.status}
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

export default Tutors;
