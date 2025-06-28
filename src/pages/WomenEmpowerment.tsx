
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Plus } from "lucide-react";

// Mock data
const womenData = [
  { id: 1, name: "Sunita Devi", skill: "Tailoring", area: "Malviya Nagar", stage: "Business", income: 15000, progress: 100 },
  { id: 2, name: "Meera Sharma", skill: "Handicrafts", area: "Saket", stage: "Income", income: 8000, progress: 75 },
  { id: 3, name: "Asha Singh", skill: "Cooking", area: "Lajpat Nagar", stage: "Tool", income: 0, progress: 50 },
  { id: 4, name: "Rekha Gupta", skill: "Beauty Services", area: "Greater Kailash", stage: "Training", income: 0, progress: 25 },
  { id: 5, name: "Kamala Verma", skill: "Tailoring", area: "Nehru Place", stage: "Income", income: 12000, progress: 75 },
];

const incomeData = [
  { skill: 'Tailoring', avgIncome: 13500 },
  { skill: 'Handicrafts', avgIncome: 8000 },
  { skill: 'Cooking', avgIncome: 6500 },
  { skill: 'Beauty Services', avgIncome: 9200 },
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Training": return "bg-red-100 text-red-800";
    case "Tool": return "bg-yellow-100 text-yellow-800";
    case "Income": return "bg-blue-100 text-blue-800";
    case "Business": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const WomenEmpowerment = () => {
  const totalWomen = womenData.length;
  const avgIncome = Math.round(womenData.filter(w => w.income > 0).reduce((sum, w) => sum + w.income, 0) / womenData.filter(w => w.income > 0).length) || 0;
  const businessStage = womenData.filter(w => w.stage === "Business").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Women Empowerment</h1>
          <p className="text-gray-600 mt-1">Track skill development and income progress</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Enroll Woman
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Enrolled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{totalWomen}</div>
            <p className="text-xs text-purple-600 mt-1">Across all programs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Avg Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">₹{avgIncome.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">From skill programs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Business Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{businessStage}</div>
            <p className="text-xs text-blue-600 mt-1">Running own business</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Skills Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">4</div>
            <p className="text-xs text-orange-600 mt-1">Different programs</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Stages Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Program Progress Overview</CardTitle>
          <p className="text-sm text-gray-600">Training → Tool → Income → Business</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Training", "Tool", "Income", "Business"].map((stage, index) => {
              const count = womenData.filter(w => w.stage === stage).length;
              const percentage = (count / totalWomen) * 100;
              return (
                <div key={stage} className="text-center">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStageColor(stage)}`}>
                    {stage}
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600">{percentage.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Income by Skill Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Average Income by Skill</CardTitle>
          <p className="text-sm text-gray-600">Monthly earnings comparison</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Average Income']} />
              <Bar dataKey="avgIncome" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Women Table */}
      <Card>
        <CardHeader>
          <CardTitle>Women in Programs ({totalWomen})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Skill</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Monthly Income</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {womenData.map((woman) => (
                <TableRow key={woman.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{woman.name}</TableCell>
                  <TableCell>{woman.skill}</TableCell>
                  <TableCell>{woman.area}</TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStageColor(woman.stage)}`}>
                      {woman.stage}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={woman.progress} className="w-20" />
                      <span className="text-sm text-gray-600">{woman.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${woman.income > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      {woman.income > 0 ? `₹${woman.income.toLocaleString()}` : 'Not yet'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <User className="h-4 w-4 mr-1" />
                      Update
                    </Button>
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

export default WomenEmpowerment;
