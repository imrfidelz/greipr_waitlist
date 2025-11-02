import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Events from "./pages/Events";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/deeploi/Dashboard";
import Profile from "./pages/deeploi/Profile";
import EditProfile from "./pages/deeploi/EditProfile";
import PublicProfile from "./pages/deeploi/PublicProfile";
import JobDetails from "./pages/deeploi/JobDetails";
import SavedJobs from "./pages/deeploi/SavedJobs";
import Messages from "./pages/deeploi/Messages";
import Interviews from "./pages/deeploi/Interviews";
import InterviewDetail from "./pages/deeploi/InterviewDetail";
import Forum from "./pages/deeploi/Forum";
import ForumDetail from "./pages/deeploi/ForumDetail";
import GroupDetail from "./pages/deeploi/GroupDetail";
import Settings from "./pages/deeploi/Settings";
import UserTypeSelection from "./pages/UserTypeSelection";
import IdCard from "./pages/IdCard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import JobsManagement from "./pages/admin/JobsManagement";
import AddJob from "./pages/admin/AddJob";
import AddCompany from "./pages/admin/AddCompany";
import ApplicationsManagement from "./pages/admin/ApplicationsManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import EmployabilityScore from "./pages/EmployabilityScore";
import MyApplications from "./pages/deeploi/MyApplications";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import EmailVerified from "./pages/EmailVerified";
import KYCPage from "./pages/KYCPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-type-selection" element={<UserTypeSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/public-profile/:id" element={<PublicProfile />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/interview/:id" element={<InterviewDetail />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumDetail />} />
          <Route path="/group/:id" element={<GroupDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/kyc" element={<KYCPage />} />
          <Route path="/id-card/:id" element={<IdCard />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/jobs" element={<ProtectedAdminRoute><JobsManagement /></ProtectedAdminRoute>} />
          <Route path="/admin/jobs/add" element={<ProtectedAdminRoute><AddJob /></ProtectedAdminRoute>} />
          <Route path="/admin/companies/add" element={<ProtectedAdminRoute><AddCompany /></ProtectedAdminRoute>} />
          <Route path="/admin/applicants" element={<ProtectedAdminRoute><ApplicationsManagement /></ProtectedAdminRoute>} />
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/admin/users" element={<ProtectedAdminRoute><UsersManagement /></ProtectedAdminRoute>} />

          <Route path="/esn-score" element={<EmployabilityScore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
