
import { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Video,
  Phone,
  MoreVertical,
  Image,
  Paperclip,
  Smile
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/deeploi/DashboardLayout';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [messageText, setMessageText] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      // In a real app, this would update state or call an API
      setMessageText('');
    }
  };

  // Mock data for chats
  const chats = [
    {
      id: "1",
      name: "Cuisine Palace",
      lastMessage: "Thanks for your application for the Senior Chef position.",
      time: "10:45 AM",
      unread: 2,
      avatar: "/lovable-uploads/60246116-1823-4009-939d-620e4a6c7f12.png"
    },
    {
      id: "2",
      name: "Five Star Dining",
      lastMessage: "We would like to schedule an interview with you next week.",
      time: "Yesterday",
      unread: 0,
      avatar: "/lovable-uploads/bd43b7d1-6621-4952-9d72-b463780fe40e.png"
    },
    {
      id: "3",
      name: "Gourmet Foods Ltd",
      lastMessage: "Your application has been received. We'll be in touch soon.",
      time: "Monday",
      unread: 0,
      avatar: "/lovable-uploads/bd43b7d1-6621-4952-9d72-b463780fe40e.png"
    }
  ];

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock data for messages in the selected chat
  const messages = [
    {
      id: "1",
      senderId: "company",
      text: "Hello! Thank you for applying to the Senior Chef position at Cuisine Palace.",
      time: "10:30 AM",
      status: "read",
    },
    {
      id: "2",
      senderId: "company",
      text: "We've reviewed your application and would like to invite you for an interview.",
      time: "10:32 AM",
      status: "read",
    },
    {
      id: "3",
      senderId: "user",
      text: "Thank you for considering my application. I'm very interested in the position.",
      time: "10:35 AM",
      status: "sent",
    },
    {
      id: "4",
      senderId: "company",
      text: "Great! Are you available this Friday at 2 PM for a video interview?",
      time: "10:40 AM",
      status: "read",
    },
    {
      id: "5",
      senderId: "user",
      text: "Yes, Friday at 2 PM works perfectly for me. Should I prepare anything specific for the interview?",
      time: "10:43 AM",
      status: "sent",
    },
    {
      id: "6",
      senderId: "company",
      text: "Please be ready to discuss your previous experience and perhaps a few of your signature dishes. We're looking forward to speaking with you!",
      time: "10:45 AM",
      status: "delivered",
    }
  ];

  // Find the selected chat
  const currentChat = chats.find(chat => chat.id === selectedChat);

  return (
    <DashboardLayout title="Messages">
      <div className="flex h-full overflow-hidden">
          {/* Conversation List Sidebar */}
          <div className="w-full md:w-1/3 bg-white border-r min-h-screen">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-brand-green" />
                  <h1 className="text-xl font-bold">Chat</h1>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <div 
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${selectedChat === chat.id ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="relative">
                      <img 
                        src={chat.avatar} 
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {chat.unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-green text-white text-xs font-medium rounded-full flex items-center justify-center">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
                
                {filteredChats.length === 0 && (
                  <div className="py-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No conversations found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Chat Window */}
          <div className="hidden md:flex flex-col w-2/3 h-screen bg-gray-50">
            {selectedChat && currentChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-white p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={currentChat.avatar} 
                      alt={currentChat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold">{currentChat.name}</h2>
                      <p className="text-xs text-green-600">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Video className="w-5 h-5 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </Button>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.senderId === 'user' 
                            ? 'bg-brand-green text-white rounded-tr-none' 
                            : 'bg-white text-gray-800 rounded-tl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <div className={`text-xs mt-1 flex justify-end ${
                          message.senderId === 'user' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="bg-white p-4 border-t">
                  <form onSubmit={sendMessage} className="flex items-center gap-2">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                    >
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                    >
                      <Image className="w-5 h-5 text-gray-500" />
                    </Button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 py-2 px-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-brand-green"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                    >
                      <Smile className="w-5 h-5 text-gray-500" />
                    </Button>
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="rounded-full bg-brand-green hover:bg-brand-green-light"
                      disabled={!messageText.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
                  <p className="text-gray-500">Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile: Select a chat message */}
          {!selectedChat && (
            <div className="md:hidden flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your messages</h3>
                <p className="text-gray-500 mb-6">Select a conversation to view messages</p>
              </div>
            </div>
          )}
        </div>
    </DashboardLayout>
  );
};

export default Messages;
