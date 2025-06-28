
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileText, Calendar as CalendarIcon, Download, Filter } from "lucide-react";
import { format } from "date-fns";

// Mock data for reports
const reportTemplates = [
  { id: 1, name: "Monthly Impact Report", description: "Comprehensive overview of all programs", modules: ["All"] },
  { id: 2, name: "Student Performance Report", description: "Academic progress and attendance", modules: ["Students"] },
  { id: 3, name: "Women Empowerment Progress", description: "Income and skill development tracking", modules: ["Women"] },
  { id: 4, name: "Tutor Activity Report", description: "Teaching hours and engagement", modules: ["Tutors"] },
  { id: 5, name: "Volunteer Engagement Report", description: "Event participation and feedback", modules: ["Volunteers"] },
  { id: 6, name: "Family Support Analysis", description: "Family status and intervention needs", modules: ["Families"] },
];

const smartChips = [
  { label: "Dropout Risk", count: 12, type: "urgent" },
  { label: "Low Income Growth", count: 8, type: "warning" },
  { label: "Poor Attendance", count: 15, type: "warning" },
  { label: "Inactive Tutors", count: 5, type: "info" },
  { label: "High Performers", count: 23, type: "success" },
  { label: "New Enrollments", count: 18, type: "success" },
];

const getChipColor = (type: string) => {
  switch (type) {
    case "urgent": return "destructive";
    case "warning": return "secondary";
    case "info": return "outline";
    case "success": return "default";
    default: return "secondary";
  }
};

const Reports = () => {
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedModule, setSelectedModule] = useState("all");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate insights and export data</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export All Data
        </Button>
      </div>

      {/* Smart Insights Chips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">🧠 Smart Insights</CardTitle>
          <p className="text-sm text-gray-600">Key metrics that need attention</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {smartChips.map((chip, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Badge variant={getChipColor(chip.type)} className="cursor-pointer hover:opacity-80">
                  {chip.label}
                </Badge>
                <span className="text-sm font-semibold text-gray-700">{chip.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Area</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
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
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Module</label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  <SelectItem value="families">Families</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="women">Women Empowerment</SelectItem>
                  <SelectItem value="tutors">Tutors</SelectItem>
                  <SelectItem value="volunteers">Volunteers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                {template.name}
              </CardTitle>
              <p className="text-sm text-gray-600">{template.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">MODULES</p>
                  <div className="flex flex-wrap gap-1">
                    {template.modules.map((module, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-1" />
                    Generate PDF
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Export Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">📊 Quick Summary</CardTitle>
          <p className="text-sm text-gray-600">Current month overview</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">1,247</div>
              <div className="text-sm text-blue-600">Total Students</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-900">156</div>
              <div className="text-sm text-purple-600">Women Enrolled</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-900">34</div>
              <div className="text-sm text-green-600">Active Tutors</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-900">89</div>
              <div className="text-sm text-orange-600">Volunteers</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-900">23</div>
              <div className="text-sm text-red-600">At-Risk Families</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">87%</div>
              <div className="text-sm text-gray-600">Avg Attendance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
