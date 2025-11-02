import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Camera, Download, Edit, Plus, FileText, Briefcase, GraduationCap, Award, Calendar, MapPin, Globe, Linkedin, Twitter, Github, Clock, Video, AlertCircle, CheckCircle, Building, Trash2, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { authService, candidateService, galleryService, reviewService } from '@/services';
import { Skeleton } from "@/components/ui/skeleton";
import EditBioModal from '@/components/deeploi/EditBioModal';
import EditExperienceModal from '@/components/deeploi/EditExperienceModal';
import EditEducationModal from '@/components/deeploi/EditEducationModal';
import EditCertificationModal from '@/components/deeploi/EditCertificationModal';
import EditSkillModal from '@/components/deeploi/EditSkillModal';
import EditGalleryModal from '@/components/deeploi/EditGalleryModal';
import ReviewsList from '@/components/deeploi/ReviewsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUserInterviews } from '@/hooks/useUserInterviews';
import type { Review } from '@/services/reviewService';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  
  // State for user and candidate data
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [candidateData, setCandidateData] = useState<any>(null);
  
  const [workExperience, setWorkExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Modal states
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  
  const [currentExperience, setCurrentExperience] = useState<any>(null);
  const [currentEducation, setCurrentEducation] = useState<any>(null);
  const [currentCertification, setCurrentCertification] = useState<any>(null);
  const [currentSkill, setCurrentSkill] = useState<any>(null);
  const [currentGalleryItem, setCurrentGalleryItem] = useState<any>(null);
  
  // Delete confirmation state
  const [experienceToDelete, setExperienceToDelete] = useState<string | null>(null);
  const [educationToDelete, setEducationToDelete] = useState<string | null>(null);
  const [certificationToDelete, setCertificationToDelete] = useState<string | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
  const [galleryItemToDelete, setGalleryItemToDelete] = useState<string | null>(null);

  // Fetch interviews using the custom hook
  const { availableInterviews, completedInterviews, loading: interviewsLoading } = useUserInterviews();

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please log in to view your profile.",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        // Fetch user data
        const userResponse = await authService.getProfile();
        const user = userResponse.data.data;
        setUserData(user);

        // Fetch candidate profile data
        try {
          const candidateResponse = await candidateService.getMyCandidate();
          setCandidateData(candidateResponse.data.data);
        } catch (error) {
          console.log('No candidate profile found yet');
        }

        // Fetch education data
        try {
          const eduResponse = await candidateService.getEducations();
          if (eduResponse.data.success && eduResponse.data.data) {
            const formattedEdu = eduResponse.data.data.map((edu: any) => ({
              // Display properties
              id: edu._id,
              title: `${edu.degree || 'Degree'}, ${edu.fieldOfStudy || 'Field of Study'}`,
              organization: edu.school,
              period: `${new Date(edu.startDate).getFullYear()} - ${edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}`,
              description: edu.description || '',
              status: edu.status || 'pending',
              // Raw data for editing
              rawData: {
                _id: edu._id,
                school: edu.school,
                degree: edu.degree || '',
                fieldOfStudy: edu.fieldOfStudy || '',
                startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
                endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : '',
                grade: edu.grade || '',
                description: edu.description || ''
              }
            }));
            setEducation(formattedEdu);
          }
        } catch (error) {
          console.log('No education data found');
        }

        // Fetch experience data
        try {
          const expResponse = await candidateService.getExperiences();
          if (expResponse.data.success && expResponse.data.data) {
            // Store raw data with display properties
            const formattedExp = expResponse.data.data.map((exp: any) => ({
              // Display properties
              id: exp._id,
              title: exp.title,
              organization: exp.company,
              period: `${new Date(exp.startDate).getFullYear()} - ${exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}`,
              description: exp.description || '',
              status: exp.status || 'pending',
              // Raw data for editing
              rawData: {
                _id: exp._id,
                title: exp.title,
                company: exp.company,
                location: exp.location || '',
                startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
                endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
                isCurrent: exp.isCurrent || false,
                description: exp.description || ''
              }
            }));
            setWorkExperience(formattedExp);
          }
        } catch (error) {
          console.log('No experience data found');
        }

        // Fetch certifications data
        try {
          const certResponse = await candidateService.getCertifications();
          if (certResponse.data.success && certResponse.data.data) {
            const formattedCert = certResponse.data.data.map((cert: any) => ({
              // Display properties
              id: cert._id,
              title: cert.name,
              organization: cert.organization || 'N/A',
              period: `${new Date(cert.issueDate).getFullYear()}${cert.expirationDate ? ` - ${new Date(cert.expirationDate).getFullYear()}` : ' - Present'}`,
              description: cert.credentialId ? `Credential ID: ${cert.credentialId}` : '',
              // Raw data for editing
              rawData: {
                _id: cert._id,
                name: cert.name,
                organization: cert.organization || '',
                issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString().split('T')[0] : '',
                expirationDate: cert.expirationDate ? new Date(cert.expirationDate).toISOString().split('T')[0] : '',
                credentialId: cert.credentialId || '',
                credentialUrl: cert.credentialUrl || ''
              }
            }));
            setCertifications(formattedCert);
          }
        } catch (error) {
          console.log('No certifications data found');
        }

        // Fetch skills data
        try {
          const skillsResponse = await candidateService.getSkills();
          if (skillsResponse.data.success && skillsResponse.data.data) {
            setSkills(skillsResponse.data.data);
          }
        } catch (error) {
          console.log('No skills data found');
        }

        // Fetch gallery data
        try {
          const galleryResponse = await galleryService.getMyGallery();
          if (galleryResponse.data.success && galleryResponse.data.data) {
            setGalleryItems(galleryResponse.data.data);
          }
        } catch (error) {
          console.log('No gallery data found');
        }

        // Fetch reviews data (reviews received by this user)
        if (candidateData?._id || user._id) {
          fetchReviews(candidateData?._id || user._id);
        }

      } catch (error: any) {
        console.error('Error fetching profile data:', error);
        toast({
          title: "Error",
          description: error.response?.data?.error || "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate, toast]);

  // Handle profile image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Image must be smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploadingImage(true);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append('file', file);

      // Upload the image
      const response = await authService.updateProfile(formData);

      // Update local userData with new image
      if (response.data?.data?.image) {
        setUserData((prev: any) => ({
          ...prev,
          image: response.data.data.image
        }));
      }

      toast({
        title: "Success",
        description: "Profile image updated successfully"
      });
    } catch (error: any) {
      console.error('Image upload error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploadingImage(false);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // Handle cover image upload
  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Image must be smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploadingCoverImage(true);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append('coverImage', file);

      // Upload the cover image
      const response = await authService.updateProfile(formData);

      // Update local userData with new cover image
      if (response.data?.data?.coverImage) {
        setUserData((prev: any) => ({
          ...prev,
          coverImage: response.data.data.coverImage
        }));
      }

      toast({
        title: "Success",
        description: "Cover image updated successfully"
      });
    } catch (error: any) {
      console.error('Cover image upload error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to upload cover image",
        variant: "destructive"
      });
    } finally {
      setIsUploadingCoverImage(false);
      // Reset the input
      if (coverImageInputRef.current) {
        coverImageInputRef.current.value = '';
      }
    }
  };

  const handleCoverImageClick = () => {
    coverImageInputRef.current?.click();
  };

  const handleSaveBio = async (bio: string) => {
    try {
      const dataToUpdate = { bio };
      
      if (candidateData?._id) {
        await candidateService.updateCandidate(candidateData._id, dataToUpdate);
      } else {
        await candidateService.createOrUpdateCandidate(dataToUpdate);
      }
      
      const updatedCandidate = await candidateService.getMyCandidate();
      setCandidateData(updatedCandidate.data.data);
      
      toast({
        title: "Success",
        description: "Bio updated successfully"
      });
      setIsBioModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update bio",
        variant: "destructive"
      });
    }
  };

  // Experience handlers
  const handleAddExperience = () => {
    setCurrentExperience(null);
    setIsExperienceModalOpen(true);
  };

  const handleEditExperience = (exp: any) => {
    // Pass the raw data structure expected by the modal
    setCurrentExperience(exp.rawData);
    setIsExperienceModalOpen(true);
  };

  const handleSaveExperience = async (data: any) => {
    try {
      // Ensure candidate profile exists before adding related records
      if (!candidateData?._id) {
        await candidateService.createOrUpdateCandidate({});
        const fresh = await candidateService.getMyCandidate();
        setCandidateData(fresh.data.data);
      }

      if (currentExperience?._id) {
        await candidateService.updateExperience(currentExperience._id, data);
      } else {
        await candidateService.createExperience(data);
      }
      
      const expResponse = await candidateService.getExperiences();
      const formattedExp = (expResponse.data.data || []).map((exp: any) => ({
        // Display properties
        id: exp._id,
        title: exp.title,
        organization: exp.company,
        period: `${new Date(exp.startDate).getFullYear()} - ${exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}`,
        description: exp.description || '',
        status: exp.status || 'pending',
        // Raw data for editing
        rawData: {
          _id: exp._id,
          title: exp.title,
          company: exp.company,
          location: exp.location || '',
          startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
          endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
          isCurrent: exp.isCurrent || false,
          description: exp.description || ''
        }
      }));
      setWorkExperience(formattedExp);
      
      toast({
        title: "Success",
        description: currentExperience ? "Experience updated" : "Experience added"
      });
      setIsExperienceModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to save experience",
        variant: "destructive"
      });
    }
  };

  const handleDeleteExperience = (id: string) => {
    setExperienceToDelete(id);
  };

  const confirmDeleteExperience = async () => {
    if (!experienceToDelete) return;

    try {
      await candidateService.deleteExperience(experienceToDelete);
      // Immediately update UI by filtering out the deleted experience
      setWorkExperience(prev => prev.filter(exp => exp.id !== experienceToDelete));
      toast({
        title: "Success",
        description: "Experience deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete experience",
        variant: "destructive"
      });
    } finally {
      setExperienceToDelete(null);
    }
  };

  // Education handlers
  const handleAddEducation = () => {
    setCurrentEducation(null);
    setIsEducationModalOpen(true);
  };

  const handleEditEducation = (edu: any) => {
    setCurrentEducation(edu.rawData);
    setIsEducationModalOpen(true);
  };

  const handleSaveEducation = async (data: any) => {
    try {
      if (currentEducation?._id) {
        await candidateService.updateEducation(currentEducation._id, data);
      } else {
        await candidateService.createEducation(data);
      }
      
      const eduResponse = await candidateService.getEducations();
      if (eduResponse.data.success && eduResponse.data.data) {
        const formattedEdu = eduResponse.data.data.map((edu: any) => ({
          // Display properties
          id: edu._id,
          title: `${edu.degree || 'Degree'}, ${edu.fieldOfStudy || 'Field of Study'}`,
          organization: edu.school,
          period: `${new Date(edu.startDate).getFullYear()} - ${edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}`,
          description: edu.description || '',
          status: edu.status || 'pending',
          // Raw data for editing
          rawData: {
            _id: edu._id,
            school: edu.school,
            degree: edu.degree || '',
            fieldOfStudy: edu.fieldOfStudy || '',
            startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
            endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : '',
            grade: edu.grade || '',
            description: edu.description || ''
          }
        }));
        setEducation(formattedEdu);
      }
      
      toast({
        title: "Success",
        description: currentEducation ? "Education updated" : "Education added"
      });
      setIsEducationModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to save education",
        variant: "destructive"
      });
    }
  };

  const handleDeleteEducation = (id: string) => {
    setEducationToDelete(id);
  };

  const confirmDeleteEducation = async () => {
    if (!educationToDelete) return;
    
    // Optimistic UI update - remove immediately
    setEducation(prev => prev.filter(edu => edu.id !== educationToDelete));
    
    try {
      await candidateService.deleteEducation(educationToDelete);
      toast({
        title: "Success",
        description: "Education deleted"
      });
    } catch (error: any) {
      // Revert on error - refetch education data
      try {
        const eduResponse = await candidateService.getEducations();
        if (eduResponse.data.success && eduResponse.data.data) {
          const formattedEdu = eduResponse.data.data.map((edu: any) => ({
            id: edu._id,
            title: `${edu.degree || 'Degree'}, ${edu.fieldOfStudy || 'Field of Study'}`,
            organization: edu.school,
            period: `${new Date(edu.startDate).getFullYear()} - ${edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}`,
            description: edu.description || '',
            status: edu.status || 'pending',
            rawData: {
              _id: edu._id,
              school: edu.school,
              degree: edu.degree || '',
              fieldOfStudy: edu.fieldOfStudy || '',
              startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
              endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : '',
              grade: edu.grade || '',
              description: edu.description || ''
            }
          }));
          setEducation(formattedEdu);
        }
      } catch (refetchError) {
        console.error('Failed to refetch education data');
      }
      
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete education",
        variant: "destructive"
      });
    } finally {
      setEducationToDelete(null);
    }
  };

  // Certification handlers
  const handleAddCertification = () => {
    setCurrentCertification(null);
    setIsCertificationModalOpen(true);
  };

  const handleEditCertification = (cert: any) => {
    setCurrentCertification(cert.rawData);
    setIsCertificationModalOpen(true);
  };

  const handleSaveCertification = async (data: any) => {
    try {
      if (currentCertification?._id) {
        await candidateService.updateCertification(currentCertification._id, data);
      } else {
        await candidateService.createCertification(data);
      }
      
      // Refetch and format certifications data
      const certResponse = await candidateService.getCertifications();
      if (certResponse.data.success && certResponse.data.data) {
        const formattedCert = certResponse.data.data.map((cert: any) => ({
          id: cert._id,
          title: cert.name,
          organization: cert.organization || 'N/A',
          period: `${new Date(cert.issueDate).getFullYear()}${cert.expirationDate ? ` - ${new Date(cert.expirationDate).getFullYear()}` : ' - Present'}`,
          description: cert.credentialId ? `Credential ID: ${cert.credentialId}` : '',
          rawData: {
            _id: cert._id,
            name: cert.name,
            organization: cert.organization || '',
            issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString().split('T')[0] : '',
            expirationDate: cert.expirationDate ? new Date(cert.expirationDate).toISOString().split('T')[0] : '',
            credentialId: cert.credentialId || '',
            credentialUrl: cert.credentialUrl || ''
          }
        }));
        setCertifications(formattedCert);
      }
      
      toast({
        title: "Success",
        description: currentCertification ? "Certification updated" : "Certification added"
      });
      setIsCertificationModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to save certification",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCertification = (id: string) => {
    setCertificationToDelete(id);
  };

  const confirmDeleteCertification = async () => {
    if (!certificationToDelete) return;
    
    // Optimistic UI update - remove immediately
    setCertifications(prev => prev.filter(cert => cert.id !== certificationToDelete));
    
    try {
      await candidateService.deleteCertification(certificationToDelete);
      toast({
        title: "Success",
        description: "Certification deleted"
      });
    } catch (error: any) {
      // Revert on error - refetch certification data
      try {
        const certResponse = await candidateService.getCertifications();
        if (certResponse.data.success && certResponse.data.data) {
          const formattedCert = certResponse.data.data.map((cert: any) => ({
            id: cert._id,
            title: cert.name,
            organization: cert.organization || 'N/A',
            period: `${new Date(cert.issueDate).getFullYear()}${cert.expirationDate ? ` - ${new Date(cert.expirationDate).getFullYear()}` : ' - Present'}`,
            description: cert.credentialId ? `Credential ID: ${cert.credentialId}` : '',
            rawData: {
              _id: cert._id,
              name: cert.name,
              organization: cert.organization || '',
              issueDate: cert.issueDate ? new Date(cert.issueDate).toISOString().split('T')[0] : '',
              expirationDate: cert.expirationDate ? new Date(cert.expirationDate).toISOString().split('T')[0] : '',
              credentialId: cert.credentialId || '',
              credentialUrl: cert.credentialUrl || ''
            }
          }));
          setCertifications(formattedCert);
        }
      } catch (refetchError) {
        console.error('Failed to refetch certification data');
      }
      
      console.error('Delete certification error:', error?.response?.status, error?.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete certification",
        variant: "destructive"
      });
    } finally {
      setCertificationToDelete(null);
    }
  };

  // Skill handlers
  const handleAddSkill = () => {
    setCurrentSkill(null);
    setIsSkillModalOpen(true);
  };

  const handleEditSkill = (skill: any) => {
    setCurrentSkill(skill);
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = async (data: any) => {
    try {
      if (currentSkill?._id) {
        await candidateService.updateSkill(currentSkill._id, data);
      } else {
        await candidateService.createSkill(data);
      }
      
      const skillsResponse = await candidateService.getSkills();
      setSkills(skillsResponse.data.data || []);
      
      toast({
        title: "Success",
        description: currentSkill ? "Skill updated" : "Skill added"
      });
      setIsSkillModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to save skill",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSkill = (id: string) => {
    setSkillToDelete(id);
  };

  const confirmDeleteSkill = async () => {
    if (!skillToDelete) return;
    
    // Optimistic UI update - remove immediately
    setSkills(prev => prev.filter(skill => skill._id !== skillToDelete));
    
    try {
      await candidateService.deleteSkill(skillToDelete);
      toast({
        title: "Success",
        description: "Skill deleted"
      });
    } catch (error: any) {
      // Revert on error - refetch skills data
      try {
        const skillsResponse = await candidateService.getSkills();
        if (skillsResponse.data.success && skillsResponse.data.data) {
          setSkills(skillsResponse.data.data);
        }
      } catch (refetchError) {
        console.error('Failed to refetch skills data');
      }
      
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete skill",
        variant: "destructive"
      });
    } finally {
      setSkillToDelete(null);
    }
  };

  // Gallery handlers
  const handleAddGalleryItem = () => {
    setCurrentGalleryItem(null);
    setIsGalleryModalOpen(true);
  };

  const handleEditGalleryItem = (item: any) => {
    setCurrentGalleryItem(item);
    setIsGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = async (data: any) => {
    try {
      if (currentGalleryItem?._id) {
        await galleryService.updateGalleryItem(currentGalleryItem._id, data);
      } else {
        await galleryService.createGalleryItem(data);
      }
      
      const galleryResponse = await galleryService.getMyGallery();
      setGalleryItems(galleryResponse.data.data || []);
      
      toast({
        title: "Success",
        description: currentGalleryItem ? "Photo updated" : "Photo added"
      });
      setIsGalleryModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to save photo",
        variant: "destructive"
      });
    }
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItemToDelete(id);
  };

  const confirmDeleteGalleryItem = async () => {
    if (!galleryItemToDelete) return;
    
    setGalleryItems(prev => prev.filter(item => item._id !== galleryItemToDelete));
    
    try {
      await galleryService.deleteGalleryItem(galleryItemToDelete);
      toast({
        title: "Success",
        description: "Photo deleted"
      });
    } catch (error: any) {
      try {
        const galleryResponse = await galleryService.getMyGallery();
        if (galleryResponse.data.success && galleryResponse.data.data) {
          setGalleryItems(galleryResponse.data.data);
        }
      } catch (refetchError) {
        console.error('Failed to refetch gallery data');
      }
      
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete photo",
        variant: "destructive"
      });
    } finally {
      setGalleryItemToDelete(null);
    }
  };

  // Review handlers
  const fetchReviews = async (userId: string) => {
    try {
      setReviewsLoading(true);
      const response = await reviewService.getReviewsForUser(userId);
      if (response.data.success) {
        setReviews(response.data.data || []);
      }
    } catch (error: any) {
      console.log('Error fetching reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
      toast({
        title: "Success",
        description: "Review deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete review",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Profile">
        <div className="h-48 md:h-64 w-full bg-gray-200 animate-pulse" />
        <div className="bg-white px-6 py-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end -mt-12">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="ml-4 mb-4 space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile">
        <div className="h-48 md:h-64 w-full relative group">
          <input
            ref={coverImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverImageUpload}
            className="hidden"
          />
          <img 
            src={userData?.coverImage || "/lovable-uploads/dd6ecf82-a9a8-4c5f-a5d3-217f97b9060f.png"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleCoverImageClick}
            disabled={isUploadingCoverImage}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Camera className="w-5 h-5 text-gray-700" />
          </button>
          {isUploadingCoverImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className="bg-white px-4 sm:px-6 py-4 shadow-sm">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-12 sm:-mt-12">
              <div className="flex flex-col sm:flex-row items-center sm:items-end w-full sm:w-auto">
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <img 
                    src={userData?.image || userData?.photo || "/lovable-uploads/0d41e9be-6f02-4111-b099-c5debea9ed50.png"}
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover"
                  />
                  <button 
                    onClick={handleCameraClick}
                    disabled={isUploadingImage}
                    className="absolute bottom-2 right-2 bg-brand-green rounded-full p-1.5 hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                  {isUploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div className="sm:ml-4 mt-4 sm:mt-0 sm:mb-4 text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-bold">{userData?.name || 'User'}</h1>
                  <p className="text-gray-600 text-sm sm:text-base">{candidateData?.headline || 'Job Seeker'}</p>
                  <p className="text-xs sm:text-sm text-gray-500">ESN: {userData?.esn || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base break-all">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{userData?.email || 'No email'}</span>
                  {userData?.emailVerified && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex-shrink-0">Verified</span>
                  )}
                </div>
                {userData?.phoneNumber && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{userData.phoneNumber}</span>
                    {userData?.isPhoneNumberVerified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded flex-shrink-0">Verified</span>
                    )}
                  </div>
                )}
                {candidateData?.location?.city && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {[candidateData.location.city, candidateData.location.state, candidateData.location.country]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}
              </div>
              
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to={`/public-profile/${userData?._id}`} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  View Public Profile
                </Button>
              </Link>
              <Link to="/profile/edit" className="w-full sm:w-auto">
                <Button 
                  variant="default" 
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <Tabs defaultValue="about" className="space-y-6 sm:space-y-8">
            <div className="relative -mx-4 sm:mx-0">
              <TabsList className="bg-transparent border-b w-full justify-start gap-4 sm:gap-8 h-auto p-0 px-4 sm:px-0 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth">
                <TabsTrigger 
                  value="about"
                  className="data-[state=active]:text-brand-green data-[state=active]:border-brand-green border-b-2 border-transparent pb-3 sm:pb-4 text-sm sm:text-base whitespace-nowrap snap-start"
                >
                  About
                </TabsTrigger>
                <TabsTrigger 
                  value="interviews"
                  className="data-[state=active]:text-brand-green data-[state=active]:border-brand-green border-b-2 border-transparent pb-3 sm:pb-4 text-sm sm:text-base whitespace-nowrap snap-start"
                >
                  Interviews
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery"
                  className="data-[state=active]:text-brand-green data-[state=active]:border-brand-green border-b-2 border-transparent pb-3 sm:pb-4 text-sm sm:text-base whitespace-nowrap snap-start"
                >
                  Gallery
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="data-[state=active]:text-brand-green data-[state=active]:border-brand-green border-b-2 border-transparent pb-3 sm:pb-4 text-sm sm:text-base whitespace-nowrap snap-start"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              {/* Scroll fade indicators for mobile */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
            </div>

            <TabsContent value="about" className="space-y-6 sm:space-y-8">
              {/* Bio Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">About</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsBioModalOpen(true)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {candidateData?.bio || 'No bio added yet. Add a bio to tell employers about yourself.'}
                </p>
              </div>

              {/* Personal Information Section */}
              {(candidateData?.maritalStatus || candidateData?.gender || candidateData?.dateOfBirth) && (
                <div className="bg-white p-4 sm:p-6 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {candidateData?.gender && (
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium capitalize">{candidateData.gender}</p>
                      </div>
                    )}
                    {candidateData?.maritalStatus && (
                      <div>
                        <p className="text-sm text-gray-500">Marital Status</p>
                        <p className="font-medium capitalize">{candidateData.maritalStatus}</p>
                      </div>
                    )}
                    {candidateData?.dateOfBirth && (
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">{new Date(candidateData.dateOfBirth).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Job Preferences Section */}
              {(candidateData?.preferredIndustries?.length > 0 || candidateData?.preferredLocations?.length > 0 || candidateData?.relocationWillingness) && (
                <div className="bg-white p-4 sm:p-6 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Job Preferences</h2>
                  <div className="space-y-4">
                    {candidateData?.preferredIndustries?.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Preferred Industries</p>
                        <div className="flex flex-wrap gap-2">
                          {candidateData.preferredIndustries.map((industry: string) => (
                            <span key={industry} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                              {industry}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {candidateData?.preferredLocations?.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Preferred Locations</p>
                        <div className="flex flex-wrap gap-2">
                          {candidateData.preferredLocations.map((location: string) => (
                            <span key={location} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {candidateData?.relocationWillingness && (
                      <div className="flex items-center gap-2 text-green-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">Open to relocation</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Social Links Section */}
              {candidateData?.socialLinks && Object.values(candidateData.socialLinks).some((link: any) => link) && (
                <div className="bg-white p-4 sm:p-6 rounded-lg">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Social Links</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {candidateData.socialLinks.linkedin && (
                      <a href={candidateData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {candidateData.socialLinks.github && (
                      <a href={candidateData.socialLinks.github} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:underline">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {candidateData.socialLinks.portfolio && (
                      <a href={candidateData.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:underline">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Portfolio
                      </a>
                    )}
                    {candidateData.socialLinks.twitter && (
                      <a href={candidateData.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-sky-500 hover:text-sky-600 hover:underline">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Work Experience Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 sm:w-5 h-4 sm:h-5 text-brand-green" />
                    <span className="text-base sm:text-xl">Work Experience</span>
                  </h2>
                  <Button variant="ghost" size="icon" onClick={handleAddExperience}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {workExperience.length > 0 ? (
                    workExperience.map((exp: any) => (
                      <div key={exp.id} className="border-l-2 border-brand-green pl-3 sm:pl-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-base sm:text-lg">{exp.title}</h3>
                              <Badge
                                variant={
                                  exp.status === 'confirmed' ? 'default' : 
                                  exp.status === 'rejected' ? 'destructive' : 
                                  'secondary'
                                }
                                className={
                                  exp.status === 'confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                                  exp.status === 'rejected' ? 'bg-red-100 text-red-700 hover:bg-red-100' : 
                                  'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                }
                              >
                                {exp.status === 'confirmed' ? 'Verified' : 
                                 exp.status === 'rejected' ? 'Rejected' : 
                                 'Pending'}
                              </Badge>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 truncate">{exp.organization}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{exp.period}</p>
                          </div>
                          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleEditExperience(exp)}>
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleDeleteExperience(exp.id)}>
                              <Plus className="w-4 h-4 rotate-45" />
                            </Button>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-600 text-sm">{exp.description}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No work experience added yet</p>
                  )}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <GraduationCap className="w-4 sm:w-5 h-4 sm:h-5 text-brand-green" />
                    <span className="text-base sm:text-xl">Education</span>
                  </h2>
                  <Button variant="ghost" size="icon" onClick={handleAddEducation}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {education.length > 0 ? (
                    education.map((edu: any) => (
                      <div key={edu.id} className="border-l-2 border-brand-green pl-3 sm:pl-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-base sm:text-lg">{edu.title}</h3>
                              <Badge 
                                variant={
                                  edu.status === 'confirmed' ? 'default' : 
                                  edu.status === 'rejected' ? 'destructive' : 
                                  'secondary'
                                }
                                className={
                                  edu.status === 'confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                                  edu.status === 'rejected' ? 'bg-red-100 text-red-700 hover:bg-red-100' : 
                                  'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                }
                              >
                                {edu.status === 'confirmed' ? 'Verified' : 
                                 edu.status === 'rejected' ? 'Rejected' : 
                                 'Pending'}
                              </Badge>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 truncate">{edu.organization}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{edu.period}</p>
                          </div>
                          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleEditEducation(edu)}>
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleDeleteEducation(edu.id)}>
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4 rotate-45" />
                            </Button>
                          </div>
                        </div>
                        {edu.description && (
                          <p className="text-gray-600 text-xs sm:text-sm">{edu.description}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm sm:text-base">No education added yet</p>
                  )}
                </div>
              </div>

              {/* Certifications Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <Award className="w-4 sm:w-5 h-4 sm:h-5 text-brand-green" />
                    <span className="text-base sm:text-xl">Certifications</span>
                  </h2>
                  <Button variant="ghost" size="icon" onClick={handleAddCertification}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {certifications.length > 0 ? (
                    certifications.map((cert: any) => (
                      <div key={cert.id} className="border-l-2 border-brand-green pl-3 sm:pl-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg">{cert.title}</h3>
                            <p className="text-sm sm:text-base text-gray-600 truncate">{cert.organization}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{cert.period}</p>
                          </div>
                          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleEditCertification(cert)}>
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleDeleteCertification(cert.id)}>
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4 rotate-45" />
                            </Button>
                          </div>
                        </div>
                        {cert.description && (
                          <p className="text-gray-600 text-xs sm:text-sm">{cert.description}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm sm:text-base">No certifications added yet</p>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-white p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Skills</h2>
                  <Button variant="ghost" size="icon" onClick={handleAddSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {skills.length > 0 ? (
                    skills.map((skill: any) => (
                      <div key={skill._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors gap-2">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="font-medium text-sm sm:text-base truncate">{skill.name}</span>
                          <Badge variant="secondary" className="bg-green-50 text-brand-green hover:bg-green-50 text-xs sm:text-sm flex-shrink-0">
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="flex gap-1 sm:gap-2 self-end sm:self-auto">
                          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleEditSkill(skill)}>
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleDeleteSkill(skill._id)}>
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 rotate-45" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm sm:text-base">No skills added yet</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interviews" className="space-y-6">
              <div className="bg-white rounded-lg p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base sm:text-lg font-semibold">My Interviews</h3>
                  <Link to="/interviews">
                    <Button variant="link" className="text-brand-green text-sm sm:text-base">
                      View All
                    </Button>
                  </Link>
                </div>

                {interviewsLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <Skeleton className="h-32 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {availableInterviews.length > 0 && (
                      <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase">Available</h4>
                        {availableInterviews.slice(0, 2).map((interview) => (
                          <Card key={interview._id} className="overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-brand-green/10 to-transparent pb-3">
                              <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={interview.job.owner.logo} />
                                    <AvatarFallback className="bg-brand-green text-white">
                                      {interview.job.owner.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <CardTitle className="text-base mb-1">{interview.title}</CardTitle>
                                    <p className="text-sm text-brand-green font-medium">{interview.job.title}</p>
                                    <p className="text-xs text-muted-foreground">{interview.job.owner.name}</p>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <Button 
                                onClick={() => navigate(`/interview/${interview._id}`)}
                                className="w-full bg-brand-green hover:bg-brand-green-light"
                              >
                                Take Interview
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {completedInterviews.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase">Completed</h4>
                        {completedInterviews.slice(0, 2).map((interview) => (
                          <Card key={interview._id}>
                            <CardContent className="pt-6">
                              <p className="text-sm font-medium">{interview.title}</p>
                              <p className="text-xs text-muted-foreground">{interview.job.title}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {availableInterviews.length === 0 && completedInterviews.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No interviews yet. Apply to jobs to get interview opportunities.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold">Gallery</h2>
                <Button className="w-full sm:w-auto" onClick={handleAddGalleryItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
              </div>
              {galleryItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {galleryItems.map((item) => (
                    <div key={item._id} className="relative group">
                      <img 
                        src={item.imageUrl}
                        alt={item.title || 'Gallery'}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEditGalleryItem(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteGalleryItem(item._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {item.title && (
                        <p className="mt-2 text-sm font-medium truncate">{item.title}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No photos yet. Add photos to showcase your work and achievements.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">Reviews & Ratings</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reviews from companies and colleagues
                  </p>
                </div>
              </div>

              <ReviewsList
                reviews={reviews}
                loading={reviewsLoading}
                currentUserId={userData?._id}
                onDeleteReview={handleDeleteReview}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Modals */}
        <EditBioModal
          open={isBioModalOpen}
          onClose={() => setIsBioModalOpen(false)}
          onSave={handleSaveBio}
          initialBio={candidateData?.bio}
        />
        <EditExperienceModal
          open={isExperienceModalOpen}
          onClose={() => setIsExperienceModalOpen(false)}
          onSave={handleSaveExperience}
          initialData={currentExperience}
          isEditing={!!currentExperience}
        />
        <EditEducationModal
          open={isEducationModalOpen}
          onClose={() => setIsEducationModalOpen(false)}
          onSave={handleSaveEducation}
          initialData={currentEducation}
          isEditing={!!currentEducation}
        />
        <EditCertificationModal
          open={isCertificationModalOpen}
          onClose={() => setIsCertificationModalOpen(false)}
          onSave={handleSaveCertification}
          initialData={currentCertification}
          isEditing={!!currentCertification}
        />
        <EditSkillModal
          open={isSkillModalOpen}
          onClose={() => setIsSkillModalOpen(false)}
          onSave={handleSaveSkill}
          initialData={currentSkill}
          isEditing={!!currentSkill}
        />
        <EditGalleryModal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          onSave={handleSaveGalleryItem}
          galleryItem={currentGalleryItem}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!experienceToDelete} onOpenChange={(open) => !open && setExperienceToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Work Experience</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this work experience? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteExperience}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Education Confirmation Dialog */}
        <AlertDialog open={!!educationToDelete} onOpenChange={(open) => !open && setEducationToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Education</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this education? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteEducation}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Certification Confirmation Dialog */}
        <AlertDialog open={!!certificationToDelete} onOpenChange={(open) => !open && setCertificationToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Certification</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this certification? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteCertification}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Skill Confirmation Dialog */}
        <AlertDialog open={!!skillToDelete} onOpenChange={(open) => !open && setSkillToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Skill</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this skill? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteSkill}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Gallery Item Confirmation Dialog */}
        <AlertDialog open={!!galleryItemToDelete} onOpenChange={(open) => !open && setGalleryItemToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Photo</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this photo? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteGalleryItem}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </DashboardLayout>
  );
};

export default Profile;
