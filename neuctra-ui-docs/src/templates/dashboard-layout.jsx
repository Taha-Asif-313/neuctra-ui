import React, { useState } from "react";
import {
  Container,
  Drawer,
  DrawerButton,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerContent,
  DrawerTriggerButton,
  Button,
  Text,
  Badge,
  Avatar,
} from "@neuctra/ui";
import {
  Menu,
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Bell,
} from "lucide-react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Analytics" },
    { icon: Users, label: "Users" },
    { icon: FileText, label: "Documents" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <DrawerTriggerButton>
              <Menu className="w-5 h-5" />
            </DrawerTriggerButton>
            <Text variant="h6" className="font-semibold">Dashboard</Text>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar size="sm" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
          </div>
        </Container>
      </header>

      <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <DrawerContent className="w-64">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <Text variant="h6" className="font-semibold">Menu</Text>
              <DrawerButton>
                <Menu className="w-4 h-4" />
              </DrawerButton>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "primary" : "ghost"}
                  className="w-full justify-start"
                  size="sm"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" className="w-full">
              Sign Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <main className="p-4">
        <Container>
          <Text variant="h4" className="mb-4">Welcome to Dashboard</Text>
          <Text variant="body1" className="text-gray-600">
            This is a responsive dashboard layout with sidebar navigation.
          </Text>
        </Container>
      </main>
    </div>
  );
}
