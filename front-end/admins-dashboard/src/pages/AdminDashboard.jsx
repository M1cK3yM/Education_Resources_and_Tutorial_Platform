import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { name: "Home", icon: "🏠" },
  { name: "Universities", icon: "🏛️" },
  { name: "Resources", icon: "📚" },
  { name: "Events", icon: "🎉" },
  { name: "News", icon: "📰" },
  { name: "Users", icon: "👥" },
  { name: "Event RSVP", icon: "📝" },
];

const dashboardItems = [
  { name: "Universities", icon: "🏛️", color: "bg-blue-500" },
  { name: "Resources", icon: "📚", color: "bg-green-500" },
  { name: "Events", icon: "🎉", color: "bg-yellow-500" },
  { name: "News", icon: "📰", color: "bg-red-500" },
  { name: "Users", icon: "👥", color: "bg-purple-500" },
  { name: "Event RSVP", icon: "📝", color: "bg-pink-500" },
];

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/admin/${item.toLowerCase().replace(" ", "-")}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        <nav>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start mb-2 text-white hover:bg-gray-700"
              onClick={() => handleItemClick(item.name)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <Input className="w-64" placeholder="Search..." />
          <div className="flex">
            <Avatar>
              <AvatarImage
                src="src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button className="ml-10" onClick={handleLogout}>Logout</Button>

          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {dashboardItems.map((item) => (
            <Button
              key={item.name}
              className={`h-32 ${item.color} text-white flex flex-col items-center justify-center`}
              onClick={() => handleItemClick(item.name)}
            >
              <span className="text-3xl mb-2">{item.icon}</span>
              <span>{item.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
