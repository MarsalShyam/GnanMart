import { useAuth } from "../../context/AuthContext";
import StudentDashboard from "../student/StudentDashboard";
import VendorDashboard from "../vendor/VendorDashboard";

export default function DashboardRouter() {
  const { user } = useAuth();

  if (user?.role === "vendor") {
    return <VendorDashboard />;
  }

  return <StudentDashboard />;


}