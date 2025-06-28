
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Edit, Flag } from "lucide-react";

// Mock data
const familiesData = [
  { id: 1, name: "Sharma Family", area: "Malviya Nagar", tag: "High Potential", members: 5, lastContact: "2024-06-15" },
  { id: 2, name: "Kumar Family", area: "Saket", tag: "At-risk", members: 4, lastContact: "2024-06-10" },
  { id: 3, name: "Singh Family", area: "Lajpat Nagar", tag: "Stable", members: 6, lastContact: "2024-06-18" },
  { id: 4, name: "Gupta Family", area: "Greater Kailash", tag: "At-risk", members: 3, lastContact: "2024-06-05" },
  { id: 5, name: "Verma Family", area: "Nehru Place", tag: "High Potential", members: 4, lastContact: "2024-06-20" },
];

const Families = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");

  const filteredFamilies = familiesData.filter(family => {
    const matchesSearch = family.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = areaFilter === "all" || family.area === areaFilter;
    const matchesTag = tagFilter === "all" || family.tag === tagFilter;
    return matchesSearch && matchesArea && matchesTag;
  });

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "At-risk": return "destructive";
      case "High Potential": return "default";
      case "Stable": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Family Management</h1>
          <p className="text-gray-600 mt-1">Track and support families in our programs</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Users className="h-4 w-4 mr-2" />
          Add Family
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Families</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{familiesData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">At-Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {familiesData.filter(f => f.tag === "At-risk").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {familiesData.filter(f => f.tag === "High Potential").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {familiesData.reduce((sum, f) => sum + f.members, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search families..."
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
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="At-risk">At-risk</SelectItem>
                <SelectItem value="High Potential">High Potential</SelectItem>
                <SelectItem value="Stable">Stable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Families Table */}
      <Card>
        <CardHeader>
          <CardTitle>Families ({filteredFamilies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Family Name</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFamilies.map((family) => (
                <TableRow key={family.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{family.name}</TableCell>
                  <TableCell>{family.area}</TableCell>
                  <TableCell>
                    <Badge variant={getTagColor(family.tag)}>
                      {family.tag}
                    </Badge>
                  </TableCell>
                  <TableCell>{family.members}</TableCell>
                  <TableCell>{family.lastContact}</TableCell>
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

export default Families;
