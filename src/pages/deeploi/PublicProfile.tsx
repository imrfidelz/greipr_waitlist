import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardHeader } from "@/components/deeploi/public/DashboardHeader";
import { ProfileSummary } from "@/components/deeploi/public/ProfileSummary";
import { ExperienceTimeline } from "@/components/deeploi/public/ExperienceTimeline";
import { EducationSection } from "@/components/deeploi/public/EducationSection";
import { SkillsEndorsements } from "@/components/deeploi/public/SkillsEndorsements";
import { VerificationCard } from "@/components/deeploi/public/VerificationCard";
import { ShareCV } from "@/components/deeploi/public/ShareCV";
import { candidateService } from "@/services/candidateService";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PublicProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await candidateService.getPublicProfile(id);
        setProfileData(response.data.data);
      } catch (err: any) {
        console.error("Error fetching public profile:", err);
        setError(err.response?.data?.error || "Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <DashboardHeader />
        <div className="container mx-auto px-6 py-8">
          <div className="mt-8 space-y-8">
            <Skeleton className="h-48 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
              <div className="space-y-8">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <DashboardHeader />
        <div className="container mx-auto px-6 py-8">
          <Alert variant="destructive" className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "Profile not found"}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Extract data for components
  const candidateData = {
    name: profileData.name,
    esnId: profileData.esnId,
    tier: profileData.tier,
    location: profileData.location,
    bio: profileData.bio,
    employabilityScore: profileData.employabilityScore,
    skills: profileData.skills?.map((s: any) => s.name) || [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />

      <div className="container mx-auto px-6 py-8">

        <main className="mt-8 space-y-8">
          {/* Profile Summary */}
          <ProfileSummary {...candidateData} />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {profileData.experiences?.length > 0 && (
                <ExperienceTimeline experiences={profileData.experiences} />
              )}
              {profileData.education?.length > 0 && (
                <EducationSection education={profileData.education} />
              )}
              {profileData.skills?.length > 0 && (
                <SkillsEndorsements skills={profileData.skills} />
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <VerificationCard
                esnId={candidateData.esnId}
                issuanceDate="Jan 15, 2021"
                tier={candidateData.tier}
                industries={["Hospitality", "Food Service", "Tourism"]}
                verificationCount={profileData.experiences?.filter((e: any) => e.status === 'verified').length || 0}
              />
              <ShareCV esnId={candidateData.esnId} />
            </div>
          </div>
        </main>
      </div>

      {/* Floating gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
};

export default PublicProfile;
