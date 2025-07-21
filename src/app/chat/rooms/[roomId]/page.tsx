import ChatRoomClient from "@/components/ChatRoomClient";

export function generateStaticParams() {
  return [
    { roomId: "1" },
    { roomId: "2" },
    { roomId: "3" }
  ];
}

export default function ChatRoom({ params }: { params: { roomId: string } }) {
  const getRoomName = (id: string) => {
    switch (id) {
      case "1":
        return "//SIGHTINGS";
      case "2":
        return "//CONVERSIONS";
      case "3":
        return "//ACCESS_LOG";
      default:
        return "//UNKNOWN";
    }
  };
  const roomName = getRoomName(params.roomId);
  return <ChatRoomClient roomName={roomName} />;
}
