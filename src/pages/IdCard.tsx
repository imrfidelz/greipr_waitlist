
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Barcode } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_USERS = {
  "james-gordon-123": {
    id: "james-gordon-123",
    name: "James Gordon",
    title: "Kitchen Assistant",
    avatar: "/lovable-uploads/0d41e9be-6f02-4111-b099-c5debea9ed50.png",
  },
  // Add more mock users as needed
};

const IdCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In production, fetch real user data by id
  const user = (id && MOCK_USERS[id]) ? MOCK_USERS[id] : {
    id: "unknown",
    name: "Unknown User",
    title: "Unknown Role",
    avatar: "",
  };

  const handleBarcodeClick = () => {
    navigate(`/public-profile/${user.id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-sm rounded-3xl shadow-xl border-2 border-brand-green relative overflow-hidden bg-white">
        <div className="bg-brand-green w-full h-24 rounded-b-full absolute top-0 left-0" />
        <CardContent className="relative z-10 flex flex-col items-center pt-20 pb-8">
          <Avatar className="w-20 h-20 shadow-lg border-4 border-white -mt-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name ? user.name[0] : "U"}</AvatarFallback>
          </Avatar>
          <h2 className="mt-3 font-bold text-xl text-gray-900">{user.name}</h2>
          <p className="text-gray-500 font-medium">{user.title}</p>
          <div className="mt-8 mb-4 w-full flex justify-center">
            <Button
              variant="ghost"
              className="p-0 flex flex-col items-center group"
              tabIndex={0}
              aria-label={`Show barcode for ${user.name}'s public profile`}
              onClick={handleBarcodeClick}
            >
              <Barcode size={64} className="text-gray-700 group-hover:text-brand-green transition-colors" />
              <span className="text-xs text-gray-500 mt-1">Scan or Click</span>
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center">
            This barcode leads directly to {user.name.split(" ")[0]}'s profile.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdCard;
