import { useAuth } from "../../context/AuthContext";
import StudentHome from "../student/Home";
import VendorDashboard from "../vendor/Dashboard";
import AdminDashboard from "../admin/Dashboard";

export default function DashboardRouter() {
  const { user } = useAuth();

  if (user.role === "vendor") return <VendorDashboard />;
  if (user.role === "admin") return <AdminDashboard />;

  return <StudentHome />;
}