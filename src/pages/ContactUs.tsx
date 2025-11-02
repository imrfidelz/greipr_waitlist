import { useState, useEffect } from 'react';
import Navbar from '@/components/sheared/Navbar';
import Footer from '@/components/sheared/Footer';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, Globe, MessageSquare, User, Building, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          company: '',
          phone: ''
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      primary: "info@greiprgroup.com",
      secondary: "support@greiprgroup.com",
      action: "mailto:info@greiprgroup.com",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      primary: "+234 800 123 4567",
      secondary: "+234 900 987 6543",
      action: "tel:+2348001234567",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come to our office",
      primary: "123 Business Avenue",
      secondary: "Victoria Island, Lagos, Nigeria",
      action: "https://maps.google.com",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM", active: true },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM", active: false },
    { day: "Sunday", hours: "Closed", active: false }
  ];

  const formFields = [
    { 
      name: 'name', 
      type: 'text', 
      placeholder: 'Your Full Name', 
      icon: User,
      required: true 
    },
    { 
      name: 'email', 
      type: 'email', 
      placeholder: 'your.email@example.com', 
      icon: Mail,
      required: true 
    },
    { 
      name: 'company', 
      type: 'text', 
      placeholder: 'Company Name (Optional)', 
      icon: Building,
      required: false 
    },
    { 
      name: 'phone', 
      type: 'tel', 
      placeholder: 'Phone Number (Optional)', 
      icon: Phone,
      required: false 
    },
    { 
      name: 'subject', 
      type: 'text', 
      placeholder: 'Subject of your inquiry', 
      icon: MessageSquare,
      required: true 
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-green-light to-emerald-500"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-white text-6xl font-bold mb-4 drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto drop-shadow">
              We're here to help you build the future of work. Let's start a conversation.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Globe className="w-5 h-5" />
                <span>Global Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Contact Methods Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 -mt-20 relative z-10">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer overflow-hidden animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => window.open(method.action, '_blank')}
              >
                <div className={`h-2 bg-gradient-to-r ${method.color} group-hover:h-4 transition-all duration-300`}></div>
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <method.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-green transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="font-semibold text-gray-800">{method.primary}</p>
                  <p className="text-gray-600">{method.secondary}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 animate-fade-in-up border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-brand-green to-emerald-600 bg-clip-text text-transparent">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                {/* Success/Error Alerts */}
                {submitStatus === 'success' && (
                  <Alert className="mb-6 bg-green-50 border-green-200 animate-fade-in">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Message sent successfully! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}

                {submitStatus === 'error' && (
                  <Alert className="mb-6 bg-red-50 border-red-200 animate-fade-in">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      There was an error sending your message. Please try again.
                    </AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Fields */}
                  {formFields.map((field, index) => (
                    <div key={field.name} className={`animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <field.icon className={`w-5 h-5 transition-colors duration-200 ${
                            focusedField === field.name ? 'text-brand-green' : 'text-gray-400'
                          }`} />
                        </div>
                        <input 
                          type={field.type}
                          placeholder={field.placeholder}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${
                            errors[field.name] 
                              ? 'border-red-300 focus:border-red-500' 
                              : focusedField === field.name
                                ? 'border-brand-green focus:border-brand-green'
                                : 'border-gray-200 focus:border-brand-green hover:border-gray-300'
                          }`}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField(null)}
                          required={field.required}
                        />
                        {errors[field.name] && (
                          <p className="text-red-500 text-sm mt-2 animate-fade-in flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Message Field */}
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="relative">
                      <div className="absolute left-4 top-4 z-10">
                        <MessageSquare className={`w-5 h-5 transition-colors duration-200 ${
                          focusedField === 'message' ? 'text-brand-green' : 'text-gray-400'
                        }`} />
                      </div>
                      <textarea 
                        placeholder="Tell us about your project or inquiry..."
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 min-h-[150px] resize-none ${
                          errors.message 
                            ? 'border-red-300 focus:border-red-500' 
                            : focusedField === 'message'
                              ? 'border-brand-green focus:border-brand-green'
                              : 'border-gray-200 focus:border-brand-green hover:border-gray-300'
                        }`}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-2 animate-fade-in flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-brand-green to-emerald-600 text-white hover:from-brand-green-light hover:to-emerald-500 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group ${
                        isSubmitting ? 'animate-pulse' : 'hover:scale-105'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-8">
              
              {/* Office Hours */}
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up border border-gray-100 hover:shadow-2xl transition-all duration-500" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Clock className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Office Hours</h3>
                </div>
                
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 ${
                        schedule.active 
                          ? 'bg-green-50 border-l-4 border-green-500' 
                          : 'bg-gray-50 border-l-4 border-gray-300'
                      }`}
                    >
                      <span className="font-medium text-gray-800">{schedule.day}</span>
                      <span className={`font-semibold ${
                        schedule.active ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> We typically respond to emails within 2-4 hours during business hours.
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up border border-gray-100 hover:shadow-2xl transition-all duration-500" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                    onClick={() => window.open('https://calendly.com/greipr', '_blank')}
                  >
                    <Calendar className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Schedule a Meeting
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white py-4 rounded-xl transition-all duration-300 hover:scale-105 group"
                    onClick={() => window.open('/support', '_blank')}
                  >
                    <MessageSquare className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                    Visit Support Center
                  </Button>
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up border border-gray-100 hover:shadow-2xl transition-all duration-500" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-2xl font-bold mb-6">Find Us</h3>
                <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 cursor-pointer group">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-brand-green mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-gray-600 font-medium">Click to view on Google Maps</p>
                    <p className="text-sm text-gray-500 mt-1">123 Business Avenue, Victoria Island</p>
                  </div>
                </div>
              </div>
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

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in-up 0.3s ease-out forwards;
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
