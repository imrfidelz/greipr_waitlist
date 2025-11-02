import { useState, useEffect } from 'react';
import Navbar from '@/components/sheared/Navbar';
import Footer from '@/components/sheared/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  Filter,
  Search,
  Play,
  Download,
  Share2,
  Heart,
  CheckCircle,
  Zap,
  Trophy,
  Coffee,
  Briefcase,
  Sparkles
} from 'lucide-react';

const Events = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedEvents, setLikedEvents] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const eventCategories = [
    { id: 'all', name: 'All Events', icon: Star, count: 8 },
    { id: 'career', name: 'Career', icon: Briefcase, count: 3 },
    { id: 'workshop', name: 'Workshops', icon: Coffee, count: 2 },
    { id: 'summit', name: 'Summits', icon: Trophy, count: 2 },
    { id: 'networking', name: 'Networking', icon: Users, count: 1 }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "AI in Hospitality Summit 2025",
      date: "November 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Eko Convention Center, Lagos",
      description: "Explore how artificial intelligence is revolutionizing the hospitality industry with cutting-edge insights and practical applications.",
      image: "/placeholder.svg",
      category: "summit",
      price: "Free",
      attendees: 250,
      featured: true,
      status: "early-bird",
      tags: ["AI", "Innovation", "Technology"],
      speakers: ["Dr. Sarah Johnson", "Mark Thompson", "Aisha Okafor"]
    },
    {
      id: 2,
      title: "Digital HR Transformation Workshop",
      date: "December 8, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Radisson Blu, Victoria Island",
      description: "Master digital HR tools and strategies to streamline your organization's human resource management processes.",
      image: "/placeholder.svg",
      category: "workshop",
      price: "₦25,000",
      attendees: 80,
      featured: false,
      status: "registration-open",
      tags: ["HR", "Digital", "Management"],
      speakers: ["Jane Wilson", "David Chen"]
    },
    {
      id: 3,
      title: "Future of Work Career Fair",
      date: "January 20, 2026",
      time: "10:00 AM - 6:00 PM",
      location: "Landmark Center, Victoria Island",
      description: "Connect with leading employers and discover exciting career opportunities in the future workplace ecosystem.",
      image: "/placeholder.svg",
      category: "career",
      price: "Free",
      attendees: 500,
      featured: true,
      status: "coming-soon",
      tags: ["Career", "Jobs", "Networking"],
      speakers: ["Multiple Employers"]
    },
    {
      id: 4,
      title: "Customer Experience Excellence Training",
      date: "February 14, 2026",
      time: "9:00 AM - 3:00 PM",
      location: "Four Points by Sheraton, Lagos",
      description: "Elevate your customer service skills and learn innovative approaches to delivering exceptional customer experiences.",
      image: "/placeholder.svg",
      category: "workshop",
      price: "₦35,000",
      attendees: 60,
      featured: false,
      status: "registration-open",
      tags: ["Customer Service", "Training", "Excellence"],
      speakers: ["Emma Rodriguez", "Michael Adebayo"]
    },
    {
      id: 5,
      title: "GREiPR Networking Mixer",
      date: "March 10, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Sky Lounge, Ikoyi",
      description: "An exclusive networking event for professionals in HR, hospitality, and technology sectors.",
      image: "/placeholder.svg",
      category: "networking",
      price: "₦15,000",
      attendees: 120,
      featured: false,
      status: "vip-only",
      tags: ["Networking", "Professionals", "Mixer"],
      speakers: ["Industry Leaders"]
    }
  ];

  const pastEvents = [
    {
      id: 6,
      title: "Remote Work Strategies Summit",
      date: "September 15, 2025",
      location: "Transcorp Hilton, Abuja",
      image: "/placeholder.svg",
      attendees: 300,
      rating: 4.8,
      highlights: "Recorded sessions available"
    },
    {
      id: 7,
      title: "Leadership in Digital Age Workshop",
      date: "August 20, 2025",
      location: "Sheraton Hotel, Lagos",
      image: "/placeholder.svg",
      attendees: 150,
      rating: 4.9,
      highlights: "Certificate provided"
    },
    {
      id: 8,
      title: "Hospitality Innovation Conference",
      date: "July 12, 2025",
      location: "Eko Convention Center, Lagos",
      image: "/placeholder.svg",
      attendees: 400,
      rating: 4.7,
      highlights: "Resources available"
    }
  ];

  const filteredEvents = upcomingEvents.filter(event => {
    const matchesCategory = activeFilter === 'all' || event.category === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (eventId: number) => {
    setLikedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'early-bird': { label: 'Early Bird', color: 'bg-yellow-500' },
      'registration-open': { label: 'Open', color: 'bg-green-500' },
      'coming-soon': { label: 'Coming Soon', color: 'bg-blue-500' },
      'vip-only': { label: 'VIP Only', color: 'bg-purple-500' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} text-white hover:opacity-90`}>
        {config.label}
      </Badge>
    );
  };

  const getTimeUntilEvent = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffTime = event.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) {
      return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} away`;
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} away`;
    } else {
      return 'Event passed';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-emerald-500 to-teal-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
              <h1 className="text-white text-6xl font-bold drop-shadow-lg">
                Our Events
              </h1>
              <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-white/90 text-xl max-w-3xl mx-auto drop-shadow mb-8 leading-relaxed">
              Join us for transformative experiences that shape the future of work. 
              Connect, learn, and grow with industry leaders and innovators.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-3xl font-bold text-white">{upcomingEvents.length}</div>
                <div className="text-white/80 text-sm">Upcoming Events</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-white/80 text-sm">Expected Attendees</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-white/80 text-sm">Industry Speakers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto mb-16 animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events, topics, or speakers..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-brand-green focus:outline-none transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category Filters */}
              <div className="flex gap-3 flex-wrap">
                {eventCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeFilter === category.id
                        ? 'bg-brand-green text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-brand-green to-emerald-600 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-emerald-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't miss these exciting opportunities to advance your career and expand your network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group animate-fade-in-up hover:-translate-y-2 ${
                  event.featured ? 'ring-2 ring-brand-green/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(event.status)}
                  </div>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(event.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-200 ${
                        likedEvents.includes(event.id) 
                          ? 'text-red-500 fill-red-500 scale-110' 
                          : 'text-white hover:text-red-300'
                      }`} 
                    />
                  </button>
                  
                  {/* Featured Badge */}
                  {event.featured && (
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-yellow-500 text-black font-bold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  {/* Price */}
                  <div className="absolute bottom-4 right-4 bg-brand-green text-white px-3 py-1 rounded-full text-sm font-bold">
                    {event.price}
                  </div>
                </div>
                
                {/* Event Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold group-hover:text-brand-green transition-colors duration-300 leading-tight">
                      {event.title}
                    </h3>
                  </div>
                  
                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-4 h-4 text-brand-green" />
                      <span className="text-sm">{event.date}</span>
                      <Badge variant="outline" className="text-xs">
                        {getTimeUntilEvent(event.date)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-4 h-4 text-brand-green" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-4 h-4 text-brand-green" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <Users className="w-4 h-4 text-brand-green" />
                      <span className="text-sm">{event.attendees} attendees expected</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Speakers */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 mb-2">Speakers:</p>
                    <p className="text-sm font-medium text-gray-700">
                      {event.speakers.join(', ')}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-brand-green to-emerald-600 text-white hover:from-emerald-600 hover:to-brand-green shadow-lg hover:shadow-xl transition-all duration-300 group/btn">
                      <span>Register Now</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
        
        {/* Past Events */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
              Past Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Catch up on what you missed and access valuable resources from our previous events.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div 
                key={event.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold">{event.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 group-hover:text-brand-green transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-blue-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{event.highlights}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-brand-green text-brand-green hover:bg-brand-green hover:text-white group/btn">
                      <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
                      View Recap
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-100">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-4xl mx-auto mt-20 animate-fade-in-up">
          <div className="bg-gradient-to-r from-brand-green to-emerald-600 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
            
            <div className="relative z-10 text-center">
              <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-4xl font-bold mb-6">Never Miss an Event</h2>
              <p className="text-xl mb-8 text-white/90">
                Subscribe to our newsletter and be the first to know about upcoming events, early bird discounts, and exclusive content.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <Button className="bg-white text-brand-green hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm text-white/70 mt-4">
                Join 5,000+ professionals already subscribed
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Events;
