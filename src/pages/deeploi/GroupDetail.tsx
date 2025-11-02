
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2, 
  Users, 
  Settings,
  Bell,
  BellOff,
  Tag,
  Calendar,
  Info,
  UsersRound,
  FileText,
  Clock,
  Filter,
  Plus
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

type Member = {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
};

type Post = {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  tags?: string[];
  isLiked: boolean;
};

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  isAttending: boolean;
};

type Resource = {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'doc' | 'image' | 'link';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  downloads: number;
};

type Group = {
  id: string;
  name: string;
  description: string;
  image: string;
  coverImage: string;
  memberCount: number;
  isMember: boolean;
  isSubscribed: boolean;
  createdAt: string;
  topic: string;
  rules: string[];
};

const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeTab, setActiveTab] = useState('discussions');
  const [isLoading, setIsLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('');
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate fetching group data
  useEffect(() => {
    setTimeout(() => {
      const mockGroup: Group = {
        id: id || '1',
        name: 'Hotel Management Professionals',
        description: 'A community for hotel industry professionals to discuss management strategies, career growth, and industry trends.',
        image: '/placeholder.svg',
        coverImage: '/placeholder.svg',
        memberCount: 10452,
        isMember: true,
        isSubscribed: true,
        createdAt: 'January 15, 2023',
        topic: 'Hotel Industry',
        rules: [
          'Be respectful and professional',
          'No self-promotion without prior approval',
          'Keep discussions relevant to the hotel industry',
          'Share experiences, not confidential information',
          'Support fellow members with constructive feedback'
        ]
      };
      
      const mockPosts: Post[] = [
        {
          id: '1',
          authorName: 'Emily Johnson',
          authorAvatar: '/placeholder.svg',
          content: 'What strategies have you found effective for managing staff turnover in the current market? We\'ve been experiencing higher than normal rates at our property.',
          likesCount: 24,
          commentsCount: 18,
          timestamp: '3 days ago',
          tags: ['staffing', 'management', 'retention'],
          isLiked: false
        },
        {
          id: '2',
          authorName: 'Michael Wong',
          authorAvatar: '/placeholder.svg',
          content: 'Just completed a successful renovation of our lobby while maintaining operations. Happy to share our approach and lessons learned if anyone is planning similar projects.',
          likesCount: 31,
          commentsCount: 12,
          timestamp: '1 week ago',
          tags: ['renovation', 'operations', 'project-management'],
          isLiked: true
        },
        {
          id: '3',
          authorName: 'Sarah Martinez',
          authorAvatar: '/placeholder.svg',
          content: 'Is anyone attending the International Hotel Conference next month in Singapore? Would love to connect with fellow group members.',
          likesCount: 15,
          commentsCount: 22,
          timestamp: '2 weeks ago',
          tags: ['networking', 'conference', 'events'],
          isLiked: false
        }
      ];
      
      const mockMembers: Member[] = [
        {
          id: '1',
          name: 'Robert Chen',
          avatar: '/placeholder.svg',
          role: 'admin',
          joinedAt: 'Jan 2023'
        },
        {
          id: '2',
          name: 'Lisa Thompson',
          avatar: '/placeholder.svg',
          role: 'moderator',
          joinedAt: 'Feb 2023'
        },
        {
          id: '3',
          name: 'David Wilson',
          avatar: '/placeholder.svg',
          role: 'member',
          joinedAt: 'Mar 2023'
        },
        {
          id: '4',
          name: 'Grace Lee',
          avatar: '/placeholder.svg',
          role: 'member',
          joinedAt: 'Apr 2023'
        },
        {
          id: '5',
          name: 'James Miller',
          avatar: '/placeholder.svg',
          role: 'member',
          joinedAt: 'May 2023'
        }
      ];
      
      const mockEvents: Event[] = [
        {
          id: '1',
          title: 'Virtual Networking: Front Desk Management',
          description: 'Join us for a virtual networking session focused on front desk operations and guest experience.',
          date: '2023-10-15',
          time: '7:00 PM EST',
          location: 'Zoom (link will be shared to attendees)',
          attendees: 43,
          isAttending: true
        },
        {
          id: '2',
          title: 'Hotel Tech Innovation Webinar',
          description: 'Discover the latest technological innovations transforming the hotel industry.',
          date: '2023-10-22',
          time: '3:00 PM EST',
          location: 'Virtual',
          attendees: 78,
          isAttending: false
        },
        {
          id: '3',
          title: 'Regional Meetup: NYC Hotel Professionals',
          description: 'In-person networking event for hotel professionals in the New York City area.',
          date: '2023-11-05',
          time: '6:30 PM EST',
          location: 'Marriott Marquis, Times Square',
          attendees: 25,
          isAttending: false
        }
      ];
      
      const mockResources: Resource[] = [
        {
          id: '1',
          title: 'Hotel Staff Training Manual Template',
          description: 'A comprehensive template for creating effective training manuals for various hotel positions.',
          fileType: 'pdf',
          url: '#',
          uploadedBy: 'Robert Chen',
          uploadedAt: '3 months ago',
          downloads: 156
        },
        {
          id: '2',
          title: 'Revenue Management Strategies 2023',
          description: 'Current trends and strategies in hotel revenue management for maximizing profits.',
          fileType: 'doc',
          url: '#',
          uploadedBy: 'Sarah Martinez',
          uploadedAt: '2 months ago',
          downloads: 98
        },
        {
          id: '3',
          title: 'Guest Experience Enhancement Checklist',
          description: 'A practical checklist for evaluating and improving the guest experience at your property.',
          fileType: 'pdf',
          url: '#',
          uploadedBy: 'Lisa Thompson',
          uploadedAt: '1 month ago',
          downloads: 212
        }
      ];
      
      setGroup(mockGroup);
      setPosts(mockPosts);
      setMembers(mockMembers);
      setEvents(mockEvents);
      setResources(mockResources);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  const handleBack = () => {
    navigate('/forum');
  };
  
  const handleJoinGroup = () => {
    if (!group) return;
    
    const newMemberStatus = !group.isMember;
    setGroup({
      ...group,
      isMember: newMemberStatus,
      memberCount: newMemberStatus ? group.memberCount + 1 : group.memberCount - 1
    });
    
    toast({
      title: newMemberStatus ? "Joined group!" : "Left group",
      description: newMemberStatus 
        ? `You are now a member of ${group.name}` 
        : `You are no longer a member of ${group.name}`,
      duration: 3000,
    });
  };
  
  const handleToggleNotifications = () => {
    if (!group) return;
    
    setGroup({
      ...group,
      isSubscribed: !group.isSubscribed
    });
    
    toast({
      description: group.isSubscribed 
        ? "Notifications turned off for this group" 
        : "Notifications turned on for this group",
      duration: 2000,
    });
  };
  
  const handlePostLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLikeStatus = !post.isLiked;
        return {
          ...post,
          likesCount: newLikeStatus ? post.likesCount + 1 : post.likesCount - 1,
          isLiked: newLikeStatus
        };
      }
      return post;
    }));
  };
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    // Parse tags from input
    const tagsArray = postTags
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag !== '');

    const newPost: Post = {
      id: Date.now().toString(),
      authorName: 'You',
      authorAvatar: '/placeholder.svg',
      content: postContent,
      likesCount: 0,
      commentsCount: 0,
      timestamp: 'Just now',
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setPostTags('');
    setIsNewPostDialogOpen(false);
    
    toast({
      title: "Post published!",
      description: "Your post is now live in the group.",
      duration: 3000,
    });
  };
  
  const handlePostClick = (postId: string) => {
    navigate(`/forum/${postId}`);
  };
  
  const handleAttendEvent = (eventId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const newAttendingStatus = !event.isAttending;
        return {
          ...event,
          attendees: newAttendingStatus ? event.attendees + 1 : event.attendees - 1,
          isAttending: newAttendingStatus
        };
      }
      return event;
    }));
    
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: event.isAttending ? "Removed from attendees" : "Added to attendees",
        description: event.isAttending 
          ? `You are no longer attending ${event.title}` 
          : `You are now attending ${event.title}`,
        duration: 3000,
      });
    }
  };
  
  const handleDownloadResource = (resourceId: string) => {
    setResources(resources.map(resource => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          downloads: resource.downloads + 1
        };
      }
      return resource;
    }));
    
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      toast({
        title: "Download started",
        description: `${resource.title} is downloading...`,
        duration: 3000,
      });
    }
  };
  
  const filteredPosts = posts.filter(post => 
    searchQuery === '' || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'doc':
        return <FileText className="text-blue-500" />;
      case 'image':
        return <FileText className="text-green-500" />;
      default:
        return <FileText />;
    }
  };
  
  if (isLoading) {
    return (
      <DashboardLayout title="Group">
        <div className="mx-auto max-w-6xl px-8 py-8">
            <div className="h-40 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
      </DashboardLayout>
    );
  }
  
  if (!group) {
    return (
      <DashboardLayout title="Group">
        <div className="mx-auto max-w-6xl px-8 py-8">
            <div className="flex items-center space-x-2 mb-6">
              <Button variant="outline" size="sm" onClick={handleBack}>
                <ArrowLeft size={16} className="mr-2" /> Back to Forum
              </Button>
            </div>
            <Card className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Group Not Found</h2>
              <p className="text-gray-500 mb-4">The group you're looking for doesn't exist or has been removed.</p>
              <Button onClick={handleBack}>Return to Forum</Button>
            </Card>
          </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title={group.name}>
      <div className="relative">
          {/* Cover Image */}
          <div 
            className="h-64 w-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${group.coverImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          </div>
          
          {/* Group Info Overlay */}
          <div className="container px-4 mx-auto max-w-6xl relative -mt-24 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={group.image} alt={group.name} />
                <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">{group.name}</h1>
                <div className="flex items-center space-x-4 mt-2 text-white">
                  <span className="flex items-center">
                    <Users size={16} className="mr-1" />
                    {group.memberCount.toLocaleString()} members
                  </span>
                  <span className="flex items-center">
                    <Tag size={16} className="mr-1" />
                    {group.topic}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Est. {group.createdAt}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleJoinGroup}
                  className={`${
                    group.isMember 
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                      : 'bg-brand-green hover:bg-brand-green-light text-white'
                  }`}
                >
                  {group.isMember ? 'Leave Group' : 'Join Group'}
                </Button>
                {group.isMember && (
                  <Button 
                    variant="outline" 
                    onClick={handleToggleNotifications}
                    className="bg-white/80"
                  >
                    {group.isSubscribed ? <BellOff size={18} /> : <Bell size={18} />}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container px-4 py-6 mx-auto max-w-6xl">
          <div className="mb-6 bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-700">{group.description}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main content */}
            <div className="md:w-2/3">
              <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="w-full">
                  <TabsTrigger value="discussions" className="flex-1">Discussions</TabsTrigger>
                  <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
                  <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
                  <TabsTrigger value="members" className="flex-1">Members</TabsTrigger>
                  <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                </TabsList>
                
                {/* Discussions Tab */}
                <TabsContent value="discussions" className="space-y-6 mt-6">
                  <div className="flex justify-between items-center">
                    <div className="relative flex-1 max-w-md">
                      <Input
                        placeholder="Search discussions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-8"
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setSearchQuery('')}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                    <Button 
                      onClick={() => setIsNewPostDialogOpen(true)}
                      className="bg-brand-green hover:bg-brand-green-light"
                    >
                      <Plus size={16} className="mr-2" /> New Post
                    </Button>
                  </div>
                  
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePostClick(post.id)}>
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                              <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium">{post.authorName}</h3>
                                <span className="text-xs text-gray-500">{post.timestamp}</span>
                              </div>
                              <p className="text-gray-700 mb-3">{post.content}</p>
                              
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {post.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="flex items-center">
                                      <Tag size={10} className="mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-6 text-gray-500">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`${post.isLiked ? 'text-brand-green' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePostLike(post.id);
                                  }}
                                >
                                  {post.isLiked ? <Heart className="fill-brand-green" size={16} /> : <Heart size={16} />}
                                  <span className="ml-1">{post.likesCount}</span>
                                </Button>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle size={16} />
                                  <span>{post.commentsCount}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const url = `${window.location.origin}/forum/${post.id}`;
                                    navigator.clipboard.writeText(url);
                                    toast({
                                      description: "Link copied to clipboard",
                                      duration: 2000,
                                    });
                                  }}
                                >
                                  <Share2 size={16} />
                                  <span className="ml-1">Share</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-6 text-center">
                      <p className="text-gray-500">No discussions found. Be the first to start a conversation!</p>
                      <Button 
                        onClick={() => setIsNewPostDialogOpen(true)} 
                        className="mt-4 bg-brand-green hover:bg-brand-green-light"
                      >
                        Start Discussion
                      </Button>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Events Tab */}
                <TabsContent value="events" className="space-y-6 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Upcoming Events</h2>
                    <Button 
                      variant="outline"
                      className="text-brand-green border-brand-green"
                    >
                      <Calendar size={16} className="mr-2" /> 
                      Propose Event
                    </Button>
                  </div>
                  
                  {events.length > 0 ? (
                    events.map(event => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-brand-green text-white p-4 text-center md:w-1/4 flex flex-col justify-center">
                            <div className="text-2xl font-bold">
                              {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}
                            </div>
                            <div className="text-lg">
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                            <div className="text-sm mt-2">
                              {event.time}
                            </div>
                          </div>
                          <div className="p-6 md:w-3/4">
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-1" />
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <div className="flex items-center">
                                <Clock size={16} className="mr-1" />
                                {event.time}
                              </div>
                              <div className="flex items-center">
                                <Info size={16} className="mr-1" />
                                {event.location}
                              </div>
                              <div className="flex items-center">
                                <UsersRound size={16} className="mr-1" />
                                {event.attendees} attendees
                              </div>
                            </div>
                            <Button 
                              onClick={() => handleAttendEvent(event.id)}
                              className={`${
                                event.isAttending 
                                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                                  : 'bg-brand-green hover:bg-brand-green-light text-white'
                              }`}
                            >
                              {event.isAttending ? 'Cancel Attendance' : 'Attend Event'}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-6 text-center">
                      <p className="text-gray-500">No upcoming events scheduled.</p>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Resources Tab */}
                <TabsContent value="resources" className="space-y-6 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Shared Resources</h2>
                    <Button 
                      variant="outline"
                      className="text-brand-green border-brand-green"
                    >
                      <Plus size={16} className="mr-2" /> 
                      Upload Resource
                    </Button>
                  </div>
                  
                  {resources.length > 0 ? (
                    resources.map(resource => (
                      <Card key={resource.id} className="p-6">
                        <div className="flex items-start">
                          <div className="bg-gray-100 p-4 rounded-lg mr-4">
                            {getFileIcon(resource.fileType)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium mb-1">{resource.title}</h3>
                            <p className="text-gray-600 mb-2">{resource.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                              <span>Uploaded by {resource.uploadedBy}</span>
                              <span>{resource.uploadedAt}</span>
                              <span>{resource.downloads} downloads</span>
                            </div>
                            <Button 
                              onClick={() => handleDownloadResource(resource.id)}
                              className="bg-brand-green hover:bg-brand-green-light"
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-6 text-center">
                      <p className="text-gray-500">No resources have been shared yet.</p>
                    </Card>
                  )}
                </TabsContent>
                
                {/* Members Tab */}
                <TabsContent value="members" className="space-y-6 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Group Members</h2>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search members..."
                        className="w-64"
                      />
                      <Button variant="outline">
                        <Filter size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map(member => (
                      <Card key={member.id} className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-medium">{member.name}</h3>
                              {member.role !== 'member' && (
                                <Badge className="ml-2 bg-brand-green text-white">
                                  {member.role === 'admin' ? 'Admin' : 'Moderator'}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">Joined {member.joinedAt}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Message
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* About Tab */}
                <TabsContent value="about" className="space-y-6 mt-6">
                  <Card className="p-6">
                    <h2 className="text-xl font-bold mb-4">About This Group</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Description</h3>
                        <p className="text-gray-700">{group.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Group Rules</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {group.rules.map((rule, index) => (
                            <li key={index} className="text-gray-700">{rule}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Group Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Calendar size={18} className="text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Created</p>
                              <p className="font-medium">{group.createdAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users size={18} className="text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Members</p>
                              <p className="font-medium">{group.memberCount.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Tag size={18} className="text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Topic</p>
                              <p className="font-medium">{group.topic}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Settings size={18} className="text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Privacy</p>
                              <p className="font-medium">Public Group</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button variant="outline" className="text-red-500 border-red-500">
                          Report Group
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right sidebar */}
            <div className="md:w-1/3 space-y-6">
              {/* Group Admins Card */}
              <Card className="p-4">
                <h2 className="font-bold mb-4">Group Administrators</h2>
                <div className="space-y-4">
                  {members
                    .filter(member => member.role === 'admin' || member.role === 'moderator')
                    .slice(0, 3)
                    .map(admin => (
                      <div key={admin.id} className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={admin.avatar} alt={admin.name} />
                          <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{admin.name}</p>
                          <p className="text-xs text-gray-500">
                            {admin.role === 'admin' ? 'Administrator' : 'Moderator'}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
              
              {/* Upcoming Events Card */}
              <Card className="p-4">
                <h2 className="font-bold mb-4">Upcoming Events</h2>
                {events.length > 0 ? (
                  <div className="space-y-4">
                    {events.slice(0, 2).map(event => (
                      <div key={event.id} className="flex items-start space-x-3">
                        <div className="bg-gray-100 text-brand-green px-2 py-1 rounded text-center min-w-14">
                          <p className="text-xs">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</p>
                          <p className="text-lg font-bold">{new Date(event.date).toLocaleDateString('en-US', { day: 'numeric' })}</p>
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.time} • {event.attendees} attending</p>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full text-brand-green border-brand-green"
                      onClick={() => setActiveTab('events')}
                    >
                      View All Events
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming events scheduled.</p>
                )}
              </Card>
              
              {/* Popular Topics Card */}
              <Card className="p-4">
                <h2 className="font-bold mb-4">Popular Topics</h2>
                <div className="flex flex-wrap gap-2">
                  {['management', 'career-growth', 'guest-experience', 'staffing', 'technology', 'marketing', 'revenue', 'housekeeping'].map(topic => (
                    <Badge key={topic} variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Tag size={10} className="mr-1" />
                      {topic}
                    </Badge>
                  ))}
                </div>
              </Card>
              
              {/* Group Rules Card */}
              <Card className="p-4">
                <h2 className="font-bold mb-4">Group Rules</h2>
                <ul className="space-y-2 text-sm">
                  {group.rules.slice(0, 3).map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block bg-brand-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                  {group.rules.length > 3 && (
                    <li className="text-brand-green cursor-pointer hover:underline text-center pt-2" onClick={() => setActiveTab('about')}>
                      See All Rules
                    </li>
                  )}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      
      {/* New Post Dialog */}
      <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts, questions, or experiences with the group.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-32"
              />
              
              <div>
                <label htmlFor="tags" className="text-sm font-medium text-gray-700 block mb-1">
                  Tags (separate with commas)
                </label>
                <Input
                  id="tags"
                  placeholder="e.g., advice, management, staffing"
                  value={postTags}
                  onChange={(e) => setPostTags(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Adding relevant tags helps others find your post
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsNewPostDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-brand-green hover:bg-brand-green-light"
                disabled={!postContent.trim()}
              >
                Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default GroupDetail;
