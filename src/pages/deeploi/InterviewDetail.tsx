
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, MapPin, Building, Video, FileText, Send, CheckSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  question: string;
  answer: string;
}

const InterviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [remainingTime, setRemainingTime] = useState(3600); // 60 minutes in seconds
  const [interview, setInterview] = useState({
    id: "",
    company: "",
    position: "",
    date: "",
    time: "",
    interviewer: "",
    location: "",
    address: "",
    status: ""
  });

  // Load interview details
  useEffect(() => {
    // In a real app, we would fetch this data from the API
    const mockInterview = {
      id: id || "1",
      company: "Cuisine Palace",
      position: "Senior Chef",
      date: "May 15, 2025",
      time: "10:00 AM",
      interviewer: "Sarah Johnson",
      location: "Virtual (Zoom)",
      address: "",
      status: "confirmed"
    };

    const mockQuestions = [
      { id: "q1", question: "Tell us about your experience as a chef and the types of cuisines you specialize in.", answer: "" },
      { id: "q2", question: "Describe a challenging situation you faced in a kitchen and how you handled it.", answer: "" },
      { id: "q3", question: "What is your approach to menu planning and development?", answer: "" },
      { id: "q4", question: "How do you ensure food quality and consistency in a busy kitchen environment?", answer: "" },
      { id: "q5", question: "What leadership skills would you bring to our kitchen team?", answer: "" }
    ];

    setInterview(mockInterview);
    setQuestions(mockQuestions);
  }, [id]);

  useEffect(() => {
    // Timer for the interview
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (answer: string) => {
    setQuestions(prev => 
      prev.map((q, idx) => 
        idx === currentQuestionIndex ? { ...q, answer } : q
      )
    );
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitInterview = () => {
    // In a real app, we would submit the answers to the API
    console.log("Submitting interview answers:", questions);
    
    // Navigate back to interviews page
    navigate("/interviews");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const allQuestionsAnswered = questions.every(q => q.answer.trim() !== "");

  return (
    <DashboardLayout title="Interview">
      <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => navigate("/interviews")}
              className="flex items-center text-gray-600 hover:text-brand-green transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Interviews</span>
            </button>
            
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className={`font-medium ${remainingTime < 300 ? 'text-red-500' : 'text-gray-600'}`}>
                {formatTime(remainingTime)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Building className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">{interview.position}</h1>
                  <p className="text-brand-green">{interview.company}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{interview.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{interview.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{interview.interviewer}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  {interview.location.startsWith("Virtual") ? (
                    <Video className="w-4 h-4 text-gray-500" />
                  ) : (
                    <MapPin className="w-4 h-4 text-gray-500" />
                  )}
                  <span>{interview.location}</span>
                </div>
              </div>
              
              {interview.address && (
                <div className="mt-2 pl-6 text-gray-600">
                  <span>{interview.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-green" />
                <h2 className="text-lg font-semibold">Interview Questions</h2>
              </div>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {currentQuestion && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              <Textarea
                value={currentQuestion.answer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-32 mb-4"
              />
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button onClick={goToNextQuestion}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    className="bg-brand-green hover:bg-brand-green-light flex items-center gap-2"
                    onClick={submitInterview}
                    disabled={!allQuestionsAnswered}
                  >
                    <Send className="w-4 h-4" />
                    Submit Interview
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`flex items-center justify-center w-full md:w-10 h-10 rounded-full font-medium text-sm 
                    ${currentQuestionIndex === idx 
                      ? 'bg-brand-green text-white' 
                      : q.answer.trim() !== '' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {q.answer.trim() !== '' && currentQuestionIndex !== idx ? (
                    <CheckSquare className="w-4 h-4" />
                  ) : (
                    idx + 1
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-800 mb-2">Interview Tips</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Be specific in your answers and provide concrete examples.</li>
              <li>• Take your time to think before answering complex questions.</li>
              <li>• Highlight your achievements and how they relate to the position.</li>
              <li>• Show enthusiasm for the role and company.</li>
            </ul>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default InterviewDetail;
