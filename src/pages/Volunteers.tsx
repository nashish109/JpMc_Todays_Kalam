
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Flag, Plus, Edit } from "lucide-react";

// Mock data
const volunteersData = [
  { 
    id: 1, 
    name: "Anjali Mehta", 
    interestArea: "Education", 
    feedbackScore: 4.8, 
    lastEvent: "2024-06-18", 
    eventsAttended: 12, 
    badges: ["Consistent", "Educator"] 
  },
  { 
    id: 2, 
    name: "Rohit Sharma", 
    interestArea: "Community Outreach", 
    feedbackScore: 4.5, 
    lastEvent: "2024-06-15", 
    eventsAttended: 8, 
    badges: ["Helper"] 
  },
  { 
    id: 3, 
    name: "Kavita Singh", 
    interestArea: "Women Empowerment", 
    feedbackScore: 4.9, 
    lastEvent: "2024-06-20", 
    eventsAttended: 15, 
    badges: ["Mentor", "Star Volunteer"] 
  },
  { 
    id: 4, 
    name: "Arjun Gupta", 
    interestArea: "Technology", 
    feedbackScore: 4.2, 
    lastEvent: "2024-06-12", 
    eventsAttended: 5, 
    badges: ["Tech Helper"] 
  },
  { 
    id: 5, 
    name: "Deepika Verma", 
    interestArea: "Health & Wellness", 
    feedbackScore: 4.7, 
    lastEvent: "2024-06-19", 
    eventsAttended: 10, 
    badges: ["Health Advocate", "Consistent"] 
  },
];

const getBadgeColor = (badge: string) => {
  const colors = {
    "Consistent": "bg-green-100 text-green-800",
    "Educator": "bg-blue-100 text-blue-800",
    "Helper": "bg-yellow-100 text-yellow-800",
    "Mentor": "bg-purple-100 text-purple-800",
    "Star Volunteer": "bg-red-100 text-red-800",
    "Tech Helper": "bg-gray-100 text-gray-800",
    "Health Advocate": "bg-orange-100 text-orange-800"
  };
  return colors[badge as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const getScoreColor = (score: number) => {
  if (score >= 4.5) return "text-green-600";
  if (score >= 4.0) return "text-yellow-600";
  return "text-red-600";
};

const Volunteers = () => {
  const totalVolunteers = volunteersData.length;
  const repeatVolunteers = volunteersData.filter(v => v.eventsAttended >= 5).length;
  const avgFeedback = (volunteersData.reduce((sum, v) => sum + v.feedbackScore, 0) / totalVolunteers).toFixed(1);
  const totalEvents = volunteersData.reduce((sum, v) => sum + v.eventsAttended, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Volunteer Engagement</h1>
          <p className="text-gray-600 mt-1">Manage and recognize volunteer contributions</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Register Volunteer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{totalVolunteers}</div>
            <p className="text-xs text-orange-600 mt-1">Registered volunteers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Repeat Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{repeatVolunteers}</div>
            <p className="text-xs text-green-600 mt-1">5+ events attended</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Avg Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{avgFeedback}/5.0</div>
            <p className="text-xs text-blue-600 mt-1">Overall rating</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{totalEvents}</div>
            <p className="text-xs text-purple-600 mt-1">Events attended</p>
          </CardContent>
        </Card>
      </div>

      {/* Volunteer Recognition Board */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">🏅 Top Volunteers This Month</CardTitle>
          <p className="text-sm text-gray-600">Recognizing outstanding contributions</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {volunteersData
              .sort((a, b) => b.feedbackScore - a.feedbackScore)
              .slice(0, 3)
              .map((volunteer, index) => (
                <div key={volunteer.id} className={`p-4 rounded-lg border-2 ${
                  index === 0 ? 'border-yellow-300 bg-yellow-50' :
                  index === 1 ? 'border-gray-300 bg-gray-50' :
                  'border-orange-300 bg-orange-50'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </div>
                    <div className="font-semibold text-gray-900">{volunteer.name}</div>
                    <div className="text-sm text-gray-600">{volunteer.interestArea}</div>
                    <div className="text-lg font-bold text-gray-900 mt-2">
                      ⭐ {volunteer.feedbackScore}/5.0
                    </div>
                    <div className="text-xs text-gray-500">
                      {volunteer.eventsAttended} events attended
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Badge System */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">🎖️ Achievement Badges</CardTitle>
          <p className="text-sm text-gray-600">Digital recognition system</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Array.from(new Set(volunteersData.flatMap(v => v.badges))).map((badge) => {
              const count = volunteersData.filter(v => v.badges.includes(badge)).length;
              return (
                <div key={badge} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}>
                    {badge}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{count} earned</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Volunteers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Volunteers ({totalVolunteers})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Interest Area</TableHead>
                <TableHead>Feedback Score</TableHead>
                <TableHead>Events Attended</TableHead>
                <TableHead>Last Event</TableHead>
                <TableHead>Badges</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteersData.map((volunteer) => (
                <TableRow key={volunteer.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>{volunteer.interestArea}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getScoreColor(volunteer.feedbackScore)}`}>
                      ⭐ {volunteer.feedbackScore}/5.0
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{volunteer.eventsAttended}</TableCell>
                  <TableCell>{volunteer.lastEvent}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {volunteer.badges.map((badge, index) => (
                        <span 
                          key={index} 
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
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

export default Volunteers;
