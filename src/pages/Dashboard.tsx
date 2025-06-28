
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, User, Flag, Edit, MapPin } from "lucide-react";

// Mock data
const kpiData = {
  totalStudents: 1247,
  womenInPrograms: 156,
  activeTutors: 34,
  volunteers: 89,
  atRiskFamilies: 23
};

const attendanceData = [
  { month: 'Jan', attendance: 85 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 82 },
  { month: 'Apr', attendance: 90 },
  { month: 'May', attendance: 87 },
  { month: 'Jun', attendance: 92 }
];

const incomeData = [
  { month: 'Jan', income: 12000 },
  { month: 'Feb', income: 15000 },
  { month: 'Mar', income: 18000 },
  { month: 'Apr', income: 22000 },
  { month: 'May', income: 25000 },
  { month: 'Jun', income: 28000 }
];

const alerts = [
  { type: 'urgent', message: '12 students with <60% attendance this month', count: 12 },
  { type: 'warning', message: '5 tutors inactive for 7+ days', count: 5 },
  { type: 'info', message: '8 families flagged for follow-up', count: 8 },
  { type: 'success', message: '23 women completed skill training', count: 23 }
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Track impact and monitor program effectiveness</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Generate Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{kpiData.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Women in Programs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{kpiData.womenInPrograms}</div>
            <p className="text-xs text-purple-600 mt-1">Skill development</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Active Tutors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{kpiData.activeTutors}</div>
            <p className="text-xs text-green-600 mt-1">Teaching actively</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 flex items-center">
              <Flag className="h-4 w-4 mr-2" />
              Volunteers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{kpiData.volunteers}</div>
            <p className="text-xs text-orange-600 mt-1">Contributing regularly</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              At-Risk Families
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{kpiData.atRiskFamilies}</div>
            <p className="text-xs text-red-600 mt-1">Need follow-up</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Attendance Trends</CardTitle>
            <p className="text-sm text-gray-600">Monthly attendance percentage</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Income Growth</CardTitle>
            <p className="text-sm text-gray-600">Monthly income from women's programs (₹)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Smart Alerts Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Smart Alerts & Action Items</CardTitle>
          <p className="text-sm text-gray-600">Priority items requiring attention</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <Alert key={index} className={`border-l-4 ${
                alert.type === 'urgent' ? 'border-l-red-500 bg-red-50' :
                alert.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                alert.type === 'info' ? 'border-l-blue-500 bg-blue-50' :
                'border-l-green-500 bg-green-50'
              }`}>
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-sm">{alert.message}</span>
                  <Badge variant={alert.type === 'urgent' ? 'destructive' : 'secondary'}>
                    {alert.count}
                  </Badge>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Area-wise Impact Heatmap Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Area-wise Impact Overview</CardTitle>
          <p className="text-sm text-gray-600">Visual representation of engagement levels by area</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Malviya Nagar', 'Saket', 'Lajpat Nagar', 'Greater Kailash', 'Nehru Place', 'Kalkaji'].map((area, index) => {
              const intensity = Math.random();
              return (
                <div 
                  key={area}
                  className={`p-4 rounded-lg text-center transition-transform hover:scale-105 cursor-pointer ${
                    intensity > 0.7 ? 'bg-green-100 border-green-300' :
                    intensity > 0.4 ? 'bg-yellow-100 border-yellow-300' :
                    'bg-red-100 border-red-300'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900">{area}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {intensity > 0.7 ? 'High' : intensity > 0.4 ? 'Medium' : 'Low'} Impact
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
