
import { Calendar, Clock, MapPin, User, Check, AlertCircle, XCircle, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface InterviewItemProps {
  id: string;
  company: string;
  position: string;
  date: string;
  time: string;
  interviewer: string;
  location: "Virtual (Zoom)" | "Virtual (Google Meet)" | "Virtual (Teams)" | "Virtual (Other)" | "In-person";
  address?: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  feedback?: string;
}

const InterviewItem = ({
  id,
  company,
  position,
  date,
  time,
  interviewer,
  location,
  address,
  status,
  feedback
}: InterviewItemProps) => {
  // Status color and label
  const statusConfig = {
    scheduled: { color: "bg-yellow-100 text-yellow-700", icon: <AlertCircle className="w-4 h-4" />, label: "Scheduled" },
    confirmed: { color: "bg-green-100 text-green-700", icon: <Check className="w-4 h-4" />, label: "Confirmed" },
    completed: { color: "bg-blue-100 text-blue-700", icon: <Check className="w-4 h-4" />, label: "Completed" },
    cancelled: { color: "bg-red-100 text-red-700", icon: <XCircle className="w-4 h-4" />, label: "Cancelled" }
  };

  const isVirtual = location.startsWith("Virtual");
  const isPast = status === "completed" || status === "cancelled";

  return (
    <div className={`border rounded-lg overflow-hidden ${isPast ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{position}</h3>
            <p className="text-brand-green">{company}</p>
          </div>
          <div className={`${statusConfig[status].color} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
            {statusConfig[status].icon}
            {statusConfig[status].label}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4 text-gray-500" />
            <span>{interviewer}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            {isVirtual ? (
              <Video className="w-4 h-4 text-gray-500" />
            ) : (
              <MapPin className="w-4 h-4 text-gray-500" />
            )}
            <span>{location}</span>
          </div>
        </div>

        {address && (
          <div className="mt-2 pl-6 text-gray-600">
            <span>{address}</span>
          </div>
        )}

        {feedback && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium mb-1">Feedback:</p>
            <p className="text-sm text-gray-600">{feedback}</p>
          </div>
        )}
      </div>

      {!isPast && (
        <div className="px-5 py-3 bg-gray-50 flex justify-end gap-3">
          {status === "scheduled" && (
            <Button variant="outline" size="sm">
              Confirm
            </Button>
          )}
          <Link to={`/interview/${id}`}>
            <Button 
              variant={status === "confirmed" ? "default" : "outline"} 
              size="sm"
              className={status === "confirmed" ? "bg-brand-green hover:bg-brand-green-light" : ""}
            >
              {status === "confirmed" ? "Take Interview" : "View Details"}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default InterviewItem;
