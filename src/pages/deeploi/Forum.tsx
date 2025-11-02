import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  HeartIcon, 
  MessageSquare, 
  Share2, 
  Users, 
  Search, 
  Tag, 
  Plus,
  Clock,
  Filter
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

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

type Group = {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  isMember: boolean;
};

const Forum = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [posts, setPosts] = useState<Post[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeTab, setActiveTab] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('');
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: '1',
          authorName: 'Grace Marlins',
          authorAvatar: '/placeholder.svg',
          content: 'How do you handle situations where customers are very rude to staffs? I have been insulted at work and it almost cost me my job, why cant customers just be nice?',
          likesCount: 10,
          commentsCount: 4,
          timestamp: '2 hours ago',
          tags: ['customer-service', 'advice-needed'],
          isLiked: false
        },
        {
          id: '2',
          authorName: 'Seyi Hassan',
          authorAvatar: '/placeholder.svg',
          content: 'I just got a job in Ikeja but I need an affordable accommodation close to Ikeja for easy commute. Can I get some suggestions please?',
          likesCount: 10,
          commentsCount: 7,
          timestamp: '3 hours ago',
          tags: ['housing', 'relocation'],
          isLiked: true
        },
        {
          id: '3',
          authorName: 'Jessica Parker',
          authorAvatar: '/placeholder.svg',
          content: 'What skills are most in-demand for hospitality workers right now? I\'m looking to improve my resume and stand out more to potential employers.',
          likesCount: 8,
          commentsCount: 2,
          timestamp: '5 hours ago',
          tags: ['career-development', 'skills'],
          isLiked: false
        },
        {
          id: '4',
          authorName: 'Michael Johnson',
          authorAvatar: '/placeholder.svg',
          content: 'Just finished my first week at the new hotel job. The team is amazing and the management is so supportive! Has anyone else had a great first week experience?',
          likesCount: 15,
          commentsCount: 5,
          timestamp: '1 day ago',
          tags: ['success-story', 'hotel-industry'],
          isLiked: false
        }
      ]);

      setGroups([
        {
          id: '1',
          name: 'Hotel Management',
          description: 'Learn how to function properly as a hotel staff...',
          image: '/placeholder.svg',
          memberCount: 10000,
          isMember: false
        },
        {
          id: '2',
          name: 'Culinary Finesse',
          description: 'Come learn new recipes or just ask questions...',
          image: '/placeholder.svg',
          memberCount: 10000,
          isMember: true
        },
        {
          id: '3',
          name: 'Customer Service Pros',
          description: 'Share tips and tricks for handling difficult customer service situations.',
          image: '/placeholder.svg',
          memberCount: 8500,
          isMember: false
        },
        {
          id: '4',
          name: 'Career Growth Network',
          description: 'Networking and career advancement opportunities in hospitality.',
          image: '/placeholder.svg',
          memberCount: 12300,
          isMember: false
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === 'latest') return matchesSearch;
    if (activeTab === 'popular') return matchesSearch && post.likesCount >= 10;
    if (activeTab === 'my-posts') return matchesSearch && post.authorName === 'You';
    return matchesSearch;
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

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
      description: "Your post is now live on the forum.",
      duration: 3000,
    });
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map(post => {
        if (post.id === postId) {
          const newLikedStatus = !post.isLiked;
          return { 
            ...post, 
            likesCount: newLikedStatus ? post.likesCount + 1 : post.likesCount - 1,
            isLiked: newLikedStatus
          };
        }
        return post;
      })
    );
  };

  const handlePostClick = (postId: string) => {
    navigate(`/forum/${postId}`);
  };

  const handleJoinGroup = (groupId: string) => {
    setGroups(
      groups.map(group => {
        if (group.id === groupId) {
          const newMemberStatus = !group.isMember;
          const memberCountChange = newMemberStatus ? 1 : -1;
          
          toast({
            title: newMemberStatus ? "Joined group!" : "Left group",
            description: newMemberStatus 
              ? `You are now a member of ${group.name}` 
              : `You are no longer a member of ${group.name}`,
            duration: 3000,
          });
          
          return {
            ...group,
            memberCount: group.memberCount + memberCountChange,
            isMember: newMemberStatus
          };
        }
        return group;
      })
    );
  };

  const handleViewGroup = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <DashboardLayout title="Community Forum">
      <div className="container px-4 py-6 mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search posts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setIsNewPostDialogOpen(true)}
                className="bg-brand-green hover:bg-brand-green-light gap-1"
              >
                <Plus size={16} /> New Post
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-6">
            <div className="md:w-2/3 space-y-6">
              <Tabs defaultValue="latest" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="latest" className="flex-1">Latest</TabsTrigger>
                  <TabsTrigger value="popular" className="flex-1">Popular</TabsTrigger>
                  <TabsTrigger value="my-posts" className="flex-1">My Posts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="latest" className="space-y-4">
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                            <div className="h-16 bg-gray-200 rounded mb-4 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <Card key={post.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePostClick(post.id)}>
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.authorAvatar} alt={`${post.authorName}'s avatar`} />
                            <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center mb-1 justify-between">
                              <h3 className="font-medium text-brand-gray">{post.authorName}</h3>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock size={12} className="mr-1" />
                                <span>{post.timestamp}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{post.content}</p>
                            
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map((tag, index) => (
                                  <span key={index} className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                                    <Tag size={10} className="mr-1" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-6 text-gray-500">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(post.id);
                                }}
                                className={`flex items-center space-x-1 hover:text-brand-green transition-colors ${post.isLiked ? 'text-brand-green' : ''}`}
                              >
                                <HeartIcon size={18} className={post.isLiked ? 'fill-brand-green' : ''} />
                                <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
                              </button>
                              <div className="flex items-center space-x-1">
                                <MessageSquare size={18} />
                                <span>{post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}</span>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const url = `${window.location.origin}/forum/${post.id}`;
                                  navigator.clipboard.writeText(url);
                                  toast({
                                    description: "Link copied to clipboard",
                                    duration: 2000,
                                  });
                                }}
                                className="flex items-center space-x-1 hover:text-brand-green transition-colors"
                              >
                                <Share2 size={18} />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-6 text-center">
                      <p className="text-gray-500 mb-4">No posts found matching your search criteria.</p>
                      <Button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveTab('latest');
                        }}
                        variant="outline"
                      >
                        Clear filters
                      </Button>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="popular" className="space-y-4">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <Card key={post.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePostClick(post.id)}>
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.authorAvatar} alt={`${post.authorName}'s avatar`} />
                            <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center mb-1 justify-between">
                              <h3 className="font-medium text-brand-gray">{post.authorName}</h3>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock size={12} className="mr-1" />
                                <span>{post.timestamp}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{post.content}</p>
                            
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map((tag, index) => (
                                  <span key={index} className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                                    <Tag size={10} className="mr-1" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-6 text-gray-500">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(post.id);
                                }}
                                className={`flex items-center space-x-1 hover:text-brand-green transition-colors ${post.isLiked ? 'text-brand-green' : ''}`}
                              >
                                <HeartIcon size={18} className={post.isLiked ? 'fill-brand-green' : ''} />
                                <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
                              </button>
                              <div className="flex items-center space-x-1">
                                <MessageSquare size={18} />
                                <span>{post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}</span>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const url = `${window.location.origin}/forum/${post.id}`;
                                  navigator.clipboard.writeText(url);
                                  toast({
                                    description: "Link copied to clipboard",
                                    duration: 2000,
                                  });
                                }}
                                className="flex items-center space-x-1 hover:text-brand-green transition-colors"
                              >
                                <Share2 size={18} />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-6 text-center">
                      <p className="text-gray-500">No popular posts found matching your criteria.</p>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="my-posts" className="space-y-4">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <Card key={post.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePostClick(post.id)}>
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.authorAvatar} alt={`${post.authorName}'s avatar`} />
                            <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center mb-1 justify-between">
                              <h3 className="font-medium text-brand-gray">{post.authorName}</h3>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock size={12} className="mr-1" />
                                <span>{post.timestamp}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{post.content}</p>
                            
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map((tag, index) => (
                                  <span key={index} className="inline-flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                                    <Tag size={10} className="mr-1" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-6 text-gray-500">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(post.id);
                                }}
                                className={`flex items-center space-x-1 hover:text-brand-green transition-colors ${post.isLiked ? 'text-brand-green' : ''}`}
                              >
                                <HeartIcon size={18} className={post.isLiked ? 'fill-brand-green' : ''} />
                                <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
                              </button>
                              <div className="flex items-center space-x-1">
                                <MessageSquare size={18} />
                                <span>{post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}</span>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const url = `${window.location.origin}/forum/${post.id}`;
                                  navigator.clipboard.writeText(url);
                                  toast({
                                    description: "Link copied to clipboard",
                                    duration: 2000,
                                  });
                                }}
                                className="flex items-center space-x-1 hover:text-brand-green transition-colors"
                              >
                                <Share2 size={18} />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-6 text-center">
                      <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
                      <Button onClick={() => setIsNewPostDialogOpen(true)} className="bg-brand-green hover:bg-brand-green-light">
                        Create Your First Post
                      </Button>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:w-1/3 mt-6 md:mt-0">
              <Card className="p-4">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-brand-green">Explore Groups</h2>
                </div>
                <div className="space-y-6">
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex">
                        <div className="w-1/3 mr-3">
                          <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="w-2/3">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                          <div className="h-12 bg-gray-200 rounded mb-2 animate-pulse"></div>
                          <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    groups.map(group => (
                      <div key={group.id} className="flex">
                        <div className="w-1/3 mr-3">
                          <img 
                            src={group.image} 
                            alt={group.name} 
                            className="w-full h-24 object-cover rounded-md"
                          />
                        </div>
                        <div className="w-2/3">
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{(group.memberCount/1000).toFixed(0)}k</span>
                              <Users size={14} className="ml-1" />
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-sm px-3 py-1"
                                onClick={() => handleViewGroup(group.id)}
                              >
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                className={`text-sm px-3 py-1 ${
                                  group.isMember 
                                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                                    : 'bg-brand-green hover:bg-brand-green-light text-white'
                                }`}
                                onClick={() => handleJoinGroup(group.id)}
                              >
                                {group.isMember ? 'Leave' : 'Join'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>

      <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts, questions, or experiences with the community.
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
                  placeholder="e.g., advice, career, housing"
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

export default Forum;

