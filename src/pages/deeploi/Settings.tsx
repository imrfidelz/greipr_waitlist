
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Bell, Settings as SettingsIcon, Shield, Lock, MapPin, 
  Briefcase, Upload, Trash2, Save, Phone, Mail, CheckCircle2, AlertCircle, LogOut, UserSquare, QrCode, Smartphone, Clock
} from 'lucide-react';
import { authService } from '@/services';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit dialog states
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openUsernameDialog, setOpenUsernameDialog] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [openChangeEmailDialog, setOpenChangeEmailDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);
  
  // 2FA dialog states
  const [open2FASetupDialog, setOpen2FASetupDialog] = useState(false);
  const [open2FADisableDialog, setOpen2FADisableDialog] = useState(false);
  const [setupStep, setSetupStep] = useState<'intro' | 'qrcode' | 'verify'>('intro');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [disableOtpValue, setDisableOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Edit form states
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: "",
    language: "English",
    JobPreference: "Hospitality",
    locationPreference: "Lagos, Nigeria",
    kycStatus: 'unverified' as 'unverified' | 'pending' | 'approved' | 'rejected',
    kycRejectionReason: "",
    emailVerified: false,
    phoneVerified: false,
    twoFactorEnabled: false
  });
  
  // Fetch user profile on component mount with retry logic
  useEffect(() => {
    const fetchUserProfile = async (retryCount = 0) => {
      const maxRetries = 3;
      const retryDelay = 1000; // 1 second
      
      try {
        const response = await authService.getProfile();
        const userData = response.data.data;
        
        setPersonalInfo({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phoneNumber || "",
          username: userData.userName || "",
          address: userData.location || "",
          language: "English",
          JobPreference: "Hospitality",
          locationPreference: userData.location || "Lagos, Nigeria",
          kycStatus: userData.kycStatus || 'unverified',
          kycRejectionReason: userData.kycRejectionReason || "",
          emailVerified: userData.emailVerified || false,
          phoneVerified: userData.isPhoneNumberVerified || false,
          twoFactorEnabled: userData.isTwoFactorEnabled || false
        });
        
        // Set edit form states
        setEditName(userData.name || "");
        setEditUsername(userData.userName || "");
        setEditAddress(userData.location || "");
        setIsLoading(false);
        
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        
        // Retry on network errors
        if (retryCount < maxRetries && error.code === 'ERR_NETWORK') {
          console.log(`Retrying... (${retryCount + 1}/${maxRetries})`);
          setTimeout(() => {
            fetchUserProfile(retryCount + 1);
          }, retryDelay * (retryCount + 1));
          return;
        }
        
        toast({
          title: "Error",
          description: "Failed to load profile data. Please refresh the page.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    messageNotifications: true,
    jobAlerts: true,
    marketingEmails: false,
    activitySummary: true
  });
  
  const [preferences, setPreferences] = useState({
    location: "Lagos",
    jobPreference: "Hospitality",
    darkMode: false,
    language: "English"
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavePersonalInfo = () => {
    toast({
      title: "Profile Updated",
      description: "Your personal information has been successfully updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your advanced preferences have been saved.",
    });
  };

  const handleVerifyPhone = () => {
    toast({
      title: "Verification Code Sent",
      description: "Please check your phone for the verification code.",
    });
  };

  const handleUpdateName = async () => {
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    try {
      await authService.updateProfile({ name: editName.trim() });
      setPersonalInfo(prev => ({ ...prev, name: editName.trim() }));
      setOpenNameDialog(false);
      toast({
        title: "Success",
        description: "Name updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update name",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateUsername = async () => {
    if (!editUsername.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    try {
      await authService.updateProfile({ userName: editUsername.trim() });
      setPersonalInfo(prev => ({ ...prev, username: editUsername.trim() }));
      setOpenUsernameDialog(false);
      toast({
        title: "Success",
        description: "Username updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update username",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateAddress = async () => {
    if (!editAddress.trim()) {
      toast({
        title: "Error",
        description: "Address cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    try {
      await authService.updateProfile({ location: editAddress.trim() });
      setPersonalInfo(prev => ({ ...prev, address: editAddress.trim() }));
      setOpenAddressDialog(false);
      toast({
        title: "Success",
        description: "Address updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update address",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoutAll = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logoutAll();
      toast({
        title: "Success",
        description: "You've been logged out from all devices.",
      });
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to logout from all devices",
        variant: "destructive"
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeactivating(true);
    try {
      await authService.deactivateAccount();
      setOpenDeleteDialog(false);
      toast({
        title: "Account Deactivated",
        description: "Your account has been permanently deactivated.",
        variant: "destructive"
      });
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to deactivate account",
        variant: "destructive"
      });
      setOpenDeleteDialog(false);
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    setSendingVerification(true);
    try {
      await authService.sendVerificationEmail();
      toast({
        title: "Verification Email Sent",
        description: "Please check your inbox and click the verification link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to send verification email.",
        variant: "destructive",
      });
    } finally {
      setSendingVerification(false);
    }
  };

  const handleChangeEmail = async () => {
    if (!newEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await authService.updateProfile({ email: newEmail });
      
      // Update local state
      setPersonalInfo(prev => ({ ...prev, email: newEmail, emailVerified: false }));
      
      toast({
        title: "Email Updated",
        description: "Your email has been updated. Please verify your new email address.",
      });
      
      setOpenChangeEmailDialog(false);
      setNewEmail('');
      
      // Automatically send verification email
      setTimeout(() => {
        handleSendVerificationEmail();
      }, 500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to update email.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      toast({
        title: "Error",
        description: "All password fields are required.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "New password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }

    if (currentPassword === newPassword) {
      toast({
        title: "Error",
        description: "New password must be different from current password.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await authService.updatePassword(currentPassword, newPassword);
      toast({
        title: "Success",
        description: "Password updated successfully.",
      });
      
      // Reset form and close dialog
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setOpenChangePasswordDialog(false);
    } catch (error: any) {
      console.error('Change password error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to change password. Please check your current password.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 2FA handlers
  const handleSetup2FA = async () => {
    setOpen2FASetupDialog(true);
    setSetupStep('intro');
  };

  const handleContinueToQRCode = async () => {
    setIsVerifying(true);
    try {
      const response = await authService.setup2FA();
      if (response.data.success) {
        setQrCodeUrl(response.data.qrCodeUrl);
        setSecret(response.data.secret);
        setSetupStep('qrcode');
      } else {
        throw new Error(response.data.message || 'Failed to setup 2FA');
      }
    } catch (error: any) {
      console.error('2FA setup error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.message || "Failed to setup 2FA.",
        variant: "destructive",
      });
      setOpen2FASetupDialog(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerify2FA = async () => {
    if (otpValue.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      await authService.enable2FA(personalInfo.email, otpValue);
      setPersonalInfo(prev => ({ ...prev, twoFactorEnabled: true }));
      toast({
        title: "Success",
        description: "Two-factor authentication enabled successfully.",
      });
      setOpen2FASetupDialog(false);
      setOtpValue('');
      setSetupStep('intro');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDisable2FA = async () => {
    if (disableOtpValue.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      await authService.disable2FA(disableOtpValue);
      setPersonalInfo(prev => ({ ...prev, twoFactorEnabled: false }));
      toast({
        title: "Success",
        description: "Two-factor authentication disabled.",
      });
      setOpen2FADisableDialog(false);
      setDisableOtpValue('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Settings">
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Settings">
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full grid grid-cols-3 p-0 h-auto">
                <TabsTrigger 
                  value="account" 
                  className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-green data-[state=active]:text-brand-green"
                >
                  <User className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-green data-[state=active]:text-brand-green"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced" 
                  className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-brand-green data-[state=active]:text-brand-green"
                >
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Advanced
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="p-6 space-y-4">
                <div className="space-y-4">
                  {/* KYC Verification */}
                  <div className="border rounded-lg p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-muted-foreground mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">KYC Verification</h3>
                              {personalInfo.kycStatus === 'approved' && (
                                <Badge variant="default" className="bg-brand-green hover:bg-brand-green">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              {personalInfo.kycStatus === 'pending' && (
                                <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-500 text-white">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Under Review
                                </Badge>
                              )}
                              {personalInfo.kycStatus === 'rejected' && (
                                <Badge variant="destructive">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Rejected
                                </Badge>
                              )}
                              {personalInfo.kycStatus === 'unverified' && (
                                <Badge variant="secondary" className="bg-orange-500 hover:bg-orange-500 text-white">
                                  Unverified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {personalInfo.kycStatus === 'approved' && "Your identity has been verified."}
                              {personalInfo.kycStatus === 'pending' && "Your KYC submission is under review. This typically takes 24-48 hours."}
                              {personalInfo.kycStatus === 'rejected' && "Your KYC submission was rejected. Please review the reason below and try again."}
                              {personalInfo.kycStatus === 'unverified' && "Verify your identity to access all features. This process takes a few minutes."}
                            </p>
                          </div>
                        </div>
                        {personalInfo.kycStatus === 'unverified' && (
                          <Button 
                            className="bg-brand-green hover:bg-brand-green/90"
                            onClick={() => navigate('/kyc')}
                          >
                            Start KYC
                          </Button>
                        )}
                        {personalInfo.kycStatus === 'rejected' && (
                          <Button 
                            variant="outline"
                            onClick={() => navigate('/kyc')}
                          >
                            Try Again
                          </Button>
                        )}
                      </div>
                      
                      {/* Show rejection reason if KYC was rejected */}
                      {personalInfo.kycStatus === 'rejected' && personalInfo.kycRejectionReason && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                            <div>
                              <p className="font-semibold text-sm text-destructive mb-1">Rejection Reason:</p>
                              <p className="text-sm text-muted-foreground">{personalInfo.kycRejectionReason}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Two-factor Authentication */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Lock className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">Two-factor Authentication</h3>
                            <Badge variant={personalInfo.twoFactorEnabled ? "default" : "secondary"} className={personalInfo.twoFactorEnabled ? "bg-brand-green hover:bg-brand-green" : ""}>
                              {personalInfo.twoFactorEnabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      {personalInfo.twoFactorEnabled ? (
                        <Dialog open={open2FADisableDialog} onOpenChange={setOpen2FADisableDialog}>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              Disable 2FA
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
                              <DialogDescription>
                                Disabling 2FA will make your account less secure. Enter your authenticator code to confirm.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Verification Code</Label>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Enter the 6-digit code from your authenticator app
                                </p>
                                <div className="flex justify-center">
                                  <InputOTP
                                    maxLength={6}
                                    value={disableOtpValue}
                                    onChange={(value) => setDisableOtpValue(value)}
                                  >
                                    <InputOTPGroup>
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                      <InputOTPSlot index={3} />
                                      <InputOTPSlot index={4} />
                                      <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setOpen2FADisableDialog(false);
                                  setDisableOtpValue('');
                                }} 
                                disabled={isVerifying}
                              >
                                Cancel
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={handleDisable2FA} 
                                disabled={isVerifying || disableOtpValue.length !== 6}
                              >
                                {isVerifying ? "Disabling..." : "Disable 2FA"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Dialog open={open2FASetupDialog} onOpenChange={setOpen2FASetupDialog}>
                          <DialogTrigger asChild>
                            <Button 
                              className="bg-brand-green hover:bg-brand-green/90"
                              onClick={handleSetup2FA}
                            >
                              Enable 2FA
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            {setupStep === 'intro' && (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
                                  <DialogDescription>
                                    Protect your account with an extra layer of security
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex items-start gap-3">
                                    <Shield className="h-5 w-5 text-brand-green mt-1" />
                                    <div>
                                      <h4 className="font-medium mb-1">Enhanced Security</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Prevent unauthorized access even if your password is compromised
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <Smartphone className="h-5 w-5 text-brand-green mt-1" />
                                    <div>
                                      <h4 className="font-medium mb-1">Easy to Use</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Use authenticator apps like Google Authenticator or Authy
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <Lock className="h-5 w-5 text-brand-green mt-1" />
                                    <div>
                                      <h4 className="font-medium mb-1">Industry Standard</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Time-based one-time passwords (TOTP) for maximum security
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setOpen2FASetupDialog(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    className="bg-brand-green hover:bg-brand-green/90"
                                    onClick={handleContinueToQRCode}
                                    disabled={isVerifying}
                                  >
                                    {isVerifying ? "Loading..." : "Continue"}
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                            
                            {setupStep === 'qrcode' && (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Scan QR Code</DialogTitle>
                                  <DialogDescription>
                                    Use your authenticator app to scan this QR code
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="flex justify-center">
                                    {qrCodeUrl && (
                                      <img 
                                        src={qrCodeUrl} 
                                        alt="2FA QR Code" 
                                        className="w-48 h-48 border rounded-lg"
                                      />
                                    )}
                                  </div>
                                  <div className="bg-muted p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">
                                      Manual Entry Code:
                                    </p>
                                    <code className="text-sm font-mono break-all">
                                      {secret}
                                    </code>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Can't scan? Copy the code above and enter it manually in your authenticator app.
                                  </p>
                                </div>
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => {
                                      setSetupStep('intro');
                                      setOpen2FASetupDialog(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    className="bg-brand-green hover:bg-brand-green/90"
                                    onClick={() => setSetupStep('verify')}
                                  >
                                    Next
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                            
                            {setupStep === 'verify' && (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Verify Setup</DialogTitle>
                                  <DialogDescription>
                                    Enter the 6-digit code from your authenticator app
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>Verification Code</Label>
                                    <div className="flex justify-center">
                                      <InputOTP
                                        maxLength={6}
                                        value={otpValue}
                                        onChange={(value) => setOtpValue(value)}
                                      >
                                        <InputOTPGroup>
                                          <InputOTPSlot index={0} />
                                          <InputOTPSlot index={1} />
                                          <InputOTPSlot index={2} />
                                          <InputOTPSlot index={3} />
                                          <InputOTPSlot index={4} />
                                          <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                      </InputOTP>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setSetupStep('qrcode')}
                                    disabled={isVerifying}
                                  >
                                    Back
                                  </Button>
                                  <Button 
                                    className="bg-brand-green hover:bg-brand-green/90"
                                    onClick={handleVerify2FA}
                                    disabled={isVerifying || otpValue.length !== 6}
                                  >
                                    {isVerifying ? "Verifying..." : "Enable 2FA"}
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>

                  {/* Email Verification */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Mail className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">Email Verification</h3>
                            <Badge variant={personalInfo.emailVerified ? "default" : "secondary"} className={personalInfo.emailVerified ? "bg-brand-green hover:bg-brand-green" : "bg-orange-500 hover:bg-orange-500"}>
                              {personalInfo.emailVerified ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!personalInfo.emailVerified && (
                          <Button 
                            variant="outline" 
                            onClick={handleSendVerificationEmail}
                            disabled={sendingVerification}
                          >
                            {sendingVerification ? "Sending..." : "Send Verification"}
                          </Button>
                        )}
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setNewEmail(personalInfo.email);
                            setOpenChangeEmailDialog(true);
                          }}
                        >
                          Change Email
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number Verification */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Phone className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">Phone Number Verification</h3>
                            <Badge variant={personalInfo.phoneVerified ? "default" : "secondary"} className={personalInfo.phoneVerified ? "bg-brand-green hover:bg-brand-green" : "bg-orange-500 hover:bg-orange-500"}>
                              {personalInfo.phoneVerified ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.phone}
                          </p>
                        </div>
                      </div>
                      {!personalInfo.phoneVerified && (
                        <Button 
                          variant="outline"
                          onClick={handleVerifyPhone}
                        >
                          Verify Now
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <UserSquare className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Name</h3>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.name || "Not set"}
                          </p>
                        </div>
                      </div>
                      <Dialog open={openNameDialog} onOpenChange={setOpenNameDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setEditName(personalInfo.name)}>
                            Edit Name
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Name</DialogTitle>
                            <DialogDescription>
                              Update your display name
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                placeholder="Enter your full name"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenNameDialog(false)} disabled={isSaving}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateName} disabled={isSaving} className="bg-brand-green hover:bg-brand-green/90">
                              {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <User className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Username</h3>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.username || "Not set"}
                          </p>
                        </div>
                      </div>
                      <Dialog open={openUsernameDialog} onOpenChange={setOpenUsernameDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setEditUsername(personalInfo.username)}>
                            Edit Username
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Username</DialogTitle>
                            <DialogDescription>
                              Choose a unique username for your profile
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="username">Username</Label>
                              <Input
                                id="username"
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                placeholder="Enter your username"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenUsernameDialog(false)} disabled={isSaving}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateUsername} disabled={isSaving} className="bg-brand-green hover:bg-brand-green/90">
                              {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Address</h3>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.address || "Not set"}
                          </p>
                        </div>
                      </div>
                      <Dialog open={openAddressDialog} onOpenChange={setOpenAddressDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setEditAddress(personalInfo.address)}>
                            Edit Address
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Address</DialogTitle>
                            <DialogDescription>
                              Update your location or address
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                value={editAddress}
                                onChange={(e) => setEditAddress(e.target.value)}
                                placeholder="Enter your address or location"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenAddressDialog(false)} disabled={isSaving}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateAddress} disabled={isSaving} className="bg-brand-green hover:bg-brand-green/90">
                              {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Lock className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Change Password</h3>
                          <p className="text-sm text-muted-foreground">
                            Your password is hidden for security reasons
                          </p>
                        </div>
                      </div>
                      <Dialog open={openChangePasswordDialog} onOpenChange={setOpenChangePasswordDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            Change Password
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Enter your current password and choose a new one. Your new password must be at least 8 characters long.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="current-password">Current Password</Label>
                              <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password (min. 8 characters)"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm New Password</Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setOpenChangePasswordDialog(false);
                                setCurrentPassword('');
                                setNewPassword('');
                                setConfirmPassword('');
                              }} 
                              disabled={isSaving}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleChangePassword} 
                              disabled={isSaving}
                              className="bg-brand-green hover:bg-brand-green/90"
                            >
                              {isSaving ? "Changing..." : "Change Password"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Logout From All Devices */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <LogOut className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Logout From All Devices</h3>
                          <p className="text-sm text-muted-foreground">
                            This will sign you out of all active sessions on other devices
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={handleLogoutAll}
                        disabled={isLoggingOut}
                      >
                        {isLoggingOut ? "Logging out..." : "Logout From All Devices"}
                      </Button>
                    </div>
                  </div>

                  {/* Deactivate Account */}
                  <div className="border border-destructive/50 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <AlertCircle className="h-5 w-5 text-destructive mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-destructive mb-1">Deactivate Account</h3>
                          <p className="text-sm text-muted-foreground">
                            This is permanent. This action can't be undone.
                          </p>
                        </div>
                      </div>
                      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                        <DialogTrigger asChild>
                          <Button variant="destructive">
                            Deactivate Account
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently deactivate your account and remove all your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => setOpenDeleteDialog(false)}
                              disabled={isDeactivating}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="destructive" 
                              onClick={handleDeleteAccount}
                              disabled={isDeactivating}
                            >
                              {isDeactivating ? "Deactivating..." : "Deactivate Account"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="p-6 space-y-6">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                    </div>
                    <Switch 
                      checked={notifications.emailNotifications}
                      onCheckedChange={() => handleNotificationChange('emailNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Message Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications when you get new messages</p>
                    </div>
                    <Switch 
                      checked={notifications.messageNotifications}
                      onCheckedChange={() => handleNotificationChange('messageNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Job Alerts</h3>
                      <p className="text-sm text-gray-500">Receive notifications for new job opportunities</p>
                    </div>
                    <Switch 
                      checked={notifications.jobAlerts}
                      onCheckedChange={() => handleNotificationChange('jobAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-500">Receive promotional content and offers</p>
                    </div>
                    <Switch 
                      checked={notifications.marketingEmails}
                      onCheckedChange={() => handleNotificationChange('marketingEmails')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Weekly Activity Summary</h3>
                      <p className="text-sm text-gray-500">Receive a weekly summary of your activity</p>
                    </div>
                    <Switch 
                      checked={notifications.activitySummary}
                      onCheckedChange={() => handleNotificationChange('activitySummary')}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button 
                    className="bg-brand-green hover:bg-brand-green/90"
                    onClick={handleSaveNotifications}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
                
              </TabsContent>
              
              <TabsContent value="advanced" className="p-6 space-y-6">
                <h2 className="text-xl font-semibold mb-6">Advanced Settings</h2>
                
                  {/* Language */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Language</h3>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.language}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">
                        Edit Language
                      </Button>
                    </div>
                  </div>

                  {/* Job Preference */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Briefcase className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Job Preference</h3>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.JobPreference}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">
                        Edit Job Preference
                      </Button>
                    </div>
                  </div>

                  {/* Location Preference */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Location Preference</h3>
                          <p className="text-sm text-muted-foreground">
                            {personalInfo.locationPreference}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">
                        Edit Location Preference
                      </Button>
                    </div>
                  </div>

              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Change Email Dialog */}
      <Dialog open={openChangeEmailDialog} onOpenChange={setOpenChangeEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
            <DialogDescription>
              Enter your new email address. You'll need to verify it after changing.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">New Email Address</Label>
              <Input
                id="newEmail"
                type="email"
                placeholder="Enter new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenChangeEmailDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangeEmail} disabled={isSaving} className="bg-brand-green hover:bg-brand-green/90">
              {isSaving ? "Updating..." : "Update Email"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Settings;