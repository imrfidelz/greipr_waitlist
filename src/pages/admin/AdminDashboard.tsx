import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileText, TrendingUp, Clock, CheckCircle, XCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [

    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active Jobs",
      value: "156",
      change: "+8.2%",
      icon: Briefcase,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Applications",
      value: "1,293",
      change: "+23.1%",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+18.7%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentApplications = [
    { id: 1, candidate: "Sarah Johnson", position: "Senior Developer", company: "Tech Corp", status: "pending", time: "2 hours ago" },
    { id: 2, candidate: "Michael Chen", position: "Product Manager", company: "StartUp Inc", status: "approved", time: "4 hours ago" },
    { id: 3, candidate: "Emma Wilson", position: "UX Designer", company: "Design Co", status: "rejected", time: "6 hours ago" },
    { id: 4, candidate: "James Brown", position: "Data Analyst", company: "Analytics Ltd", status: "pending", time: "8 hours ago" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-neutral-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium">{app.candidate}</p>
                      <p className="text-sm text-muted-foreground">{app.position} at {app.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">{app.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(app.status)}
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Applications
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/companies/add')}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Create Company
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Add New User
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/jobs/add')}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/applicants')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Review Applications
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>

          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
