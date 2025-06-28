
import { 
  Users, 
  User, 
  Calendar, 
  BarChart, 
  FileText, 
  Edit,
  Flag,
  MapPin
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart },
  { title: "Families", url: "/families", icon: Users },
  { title: "Students", url: "/students", icon: User },
  { title: "Women Empowerment", url: "/women-empowerment", icon: User },
  { title: "Tutors", url: "/tutors", icon: Edit },
  { title: "Volunteers", url: "/volunteers", icon: Flag },
  { title: "Reports", url: "/reports", icon: FileText },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-medium">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
