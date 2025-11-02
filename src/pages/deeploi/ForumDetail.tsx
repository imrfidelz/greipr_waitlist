
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
  HeartOff, 
  MessageCircle, 
  Share2, 
  Flag, 
  User, 
  Clock, 
  Tag
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

type Comment = {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likesCount: number;
  timestamp: string;
  isLiked: boolean;
};

type Post = {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  tags: string[];
  isLiked: boolean;
};

const ForumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('comments');
  
  // Simulate fetching post data
  useEffect(() => {
    // In a real app, you would fetch from an API
    setTimeout(() => {
      const mockPost: Post = {
        id: id || '1',
        authorName: 'Grace Marlins',
        authorAvatar: '/placeholder.svg',
        content: 'How do you handle situations where customers are very rude to staffs? I have been insulted at work and it almost cost me my job, why cant customers just be nice?',
        likesCount: 42,
        commentsCount: 18,
        timestamp: '2 hours ago',
        tags: ['customer-service', 'workplace-challenges', 'advice'],
        isLiked: false
      };
      
      const mockComments: Comment[] = [
        {
          id: '1',
          authorName: 'John Doe',
          authorAvatar: '/placeholder.svg',
          content: 'I totally understand your frustration. I once had a customer who screamed at me for something that wasn\'t even my fault. The best approach is to remain calm and professional.',
          likesCount: 8,
          timestamp: '45 minutes ago',
          isLiked: false
        },
        {
          id: '2',
          authorName: 'Sarah Johnson',
          authorAvatar: '/placeholder.svg',
          content: 'Document everything and report to your manager immediately. No one deserves to be treated that way at work.',
          likesCount: 15,
          timestamp: '1 hour ago',
          isLiked: true
        },
        {
          id: '3',
          authorName: 'Michael Chen',
          authorAvatar: '/placeholder.svg',
          content: 'Try the LEAP method - Listen, Empathize, Apologize (if appropriate), and Problem-solve. Works wonders even with the rudest customers.',
          likesCount: 22,
          timestamp: '1.5 hours ago',
          isLiked: false
        }
      ];
      
      setPost(mockPost);
      setComments(mockComments);
      setIsLoading(false);
    }, 1000);
  }, [id]);
  
  const handleBack = () => {
    navigate('/forum');
  };
  
  const handlePostLike = () => {
    if (!post) return;
    
    const newLikeStatus = !post.isLiked;
    setPost({
      ...post,
      likesCount: newLikeStatus ? post.likesCount + 1 : post.likesCount - 1,
      isLiked: newLikeStatus
    });
    
    toast({
      description: newLikeStatus ? "Post liked" : "Post unliked",
      duration: 2000,
    });
  };
  
  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newLikeStatus = !comment.isLiked;
        return {
          ...comment,
          likesCount: newLikeStatus ? comment.likesCount + 1 : comment.likesCount - 1,
          isLiked: newLikeStatus
        };
      }
      return comment;
    }));
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !post) return;
    
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      authorName: 'You',
      authorAvatar: '/placeholder.svg',
      content: newComment,
      likesCount: 0,
      timestamp: 'Just now',
      isLiked: false
    };
    
    setComments([newCommentObj, ...comments]);
    setPost({
      ...post,
      commentsCount: post.commentsCount + 1
    });
    setNewComment('');
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added to the discussion",
      duration: 3000,
    });
  };
  
  const handleShare = () => {
    // Copy the post URL to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    
    toast({
      title: "Link copied",
      description: "Post URL has been copied to clipboard",
      duration: 2000,
    });
  };
  
  const handleReport = () => {
    toast({
      title: "Post reported",
      description: "Thank you for helping keep our community safe",
      duration: 3000,
    });
  };
  
  if (isLoading) {
    return (
      <DashboardLayout title="Forum Post">
        <div className="mx-auto max-w-3xl px-8 py-8">
            <div className="flex items-center space-x-2 mb-6">
              <Button variant="outline" size="sm" onClick={handleBack}>
                <ArrowLeft size={16} className="mr-2" /> Back to Forum
              </Button>
            </div>
            <Card className="p-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-24 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </Card>
          </div>
      </DashboardLayout>
    );
  }
  
  if (!post) {
    return (
      <DashboardLayout title="Forum Post">
        <div className="mx-auto max-w-3xl px-8 py-8">
            <div className="flex items-center space-x-2 mb-6">
              <Button variant="outline" size="sm" onClick={handleBack}>
                <ArrowLeft size={16} className="mr-2" /> Back to Forum
              </Button>
            </div>
            <Card className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Post Not Found</h2>
              <p className="text-gray-500 mb-4">The post you're looking for doesn't exist or has been removed.</p>
              <Button onClick={handleBack}>Return to Forum</Button>
            </Card>
          </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Forum Post">
      <div className="mx-auto max-w-3xl px-4 md:px-8 py-8">
          <div className="flex items-center space-x-2 mb-6">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft size={16} className="mr-2" /> Back to Forum
            </Button>
          </div>
          
          {/* Main Post */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                  <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-lg">{post.authorName}</h3>
                    <div className="flex items-center text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span className="text-xs">{post.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg mb-4">{post.content}</p>
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="flex items-center">
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-6 text-gray-500">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center space-x-1 ${post.isLiked ? 'text-brand-green' : ''}`}
                      onClick={handlePostLike}
                    >
                      {post.isLiked ? <Heart className="fill-brand-green text-brand-green" size={16} /> : <Heart size={16} />}
                      <span>{post.likesCount} {post.likesCount === 1 ? 'Like' : 'Likes'}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center space-x-1"
                      onClick={() => document.getElementById('comment-input')?.focus()}
                    >
                      <MessageCircle size={16} />
                      <span>{post.commentsCount} {post.commentsCount === 1 ? 'Comment' : 'Comments'}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center space-x-1"
                      onClick={handleShare}
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center space-x-1 text-destructive"
                      onClick={handleReport}
                    >
                      <Flag size={16} />
                      <span>Report</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs for Comments and Related */}
          <Tabs defaultValue="comments" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="comments" className="flex-1">
                Comments ({post.commentsCount})
              </TabsTrigger>
              <TabsTrigger value="related" className="flex-1">
                Related Posts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="comments" className="space-y-6 mt-6">
              {/* Comment Input */}
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder.svg" alt="Your avatar" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          id="comment-input"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write your comment..."
                          className="w-full mb-2"
                        />
                        <div className="flex justify-end">
                          <Button 
                            type="submit" 
                            className="bg-brand-green hover:bg-brand-green-light"
                            disabled={!newComment.trim()}
                          >
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              {/* Comments List */}
              {comments.length > 0 ? (
                comments.map(comment => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="flex space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                          <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{comment.authorName}</h4>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{comment.content}</p>
                          <div className="flex space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`${comment.isLiked ? 'text-brand-green' : 'text-gray-500'}`}
                              onClick={() => handleCommentLike(comment.id)}
                            >
                              {comment.isLiked ? <Heart className="fill-brand-green text-brand-green" size={14} /> : <Heart size={14} />}
                              <span className="ml-1">{comment.likesCount}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-500">
                              <MessageCircle size={14} />
                              <span className="ml-1">Reply</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-gray-500">Be the first to comment on this post!</p>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="related" className="space-y-4 mt-6">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium mb-1">James Davis</h4>
                    <p className="text-gray-700 mb-2">Tips for dealing with difficult customers - my 10 years of experience in hospitality</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>32 likes</span>
                      <span className="mx-2">•</span>
                      <span>8 comments</span>
                      <span className="mx-2">•</span>
                      <span>1 day ago</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium mb-1">Anna Thompson</h4>
                    <p className="text-gray-700 mb-2">How our restaurant implemented a customer behavior policy that protects staff</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>48 likes</span>
                      <span className="mx-2">•</span>
                      <span>15 comments</span>
                      <span className="mx-2">•</span>
                      <span>3 days ago</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>RL</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium mb-1">Robert Lee</h4>
                    <p className="text-gray-700 mb-2">Mental health after customer incidents - how to recover and stay positive</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>63 likes</span>
                      <span className="mx-2">•</span>
                      <span>21 comments</span>
                      <span className="mx-2">•</span>
                      <span>5 days ago</span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </DashboardLayout>
  );
};

export default ForumDetail;
