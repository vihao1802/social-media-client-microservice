"use client";
import RightContentMessages from "@/components/messages/RightContentMessages";
import "react-chat-elements/dist/main.css";
import { useEffect, useState } from "react";
import { Friends } from "@/types";

const listFriends: Friends[] = [
  {
    id: 1,
    name: "Alice Johnson",
    text: "Hey, long time no see!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    title: "Project Manager",
    subtitle: "Let's catch up soon.",
    date: new Date("2020-09-20T14:30:00"),
  },
  {
    id: 2,
    name: "Bob Williams",
    text: "Don't forget the meeting tomorrow.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    title: "Software Engineer",
    subtitle: "Meeting at 10:00 AM.",
    date: new Date("2023-09-21T09:45:00"),
  },
  {
    id: 3,
    name: "Catherine Lee",
    text: "Can you review my code?",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    title: "Frontend Developer",
    subtitle: "Need feedback on the UI.",
    date: new Date("2023-09-19T11:20:00"),
  },
  {
    id: 4,
    name: "Daniel Kim",
    text: "Happy Birthday!",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    title: "Data Analyst",
    subtitle: "Wishing you a great day!",
    date: new Date("2023-09-18T08:00:00"),
  },
  {
    id: 5,
    name: "Ella Parker",
    text: "Let's go for lunch.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    title: "Product Designer",
    subtitle: "How about sushi?",
    date: new Date("2023-09-17T12:15:00"),
  },
  {
    id: 6,
    name: "Frank Harris",
    text: "I'll send the report by EOD.",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    title: "Marketing Specialist",
    subtitle: "Almost done with the report.",
    date: new Date("2023-09-16T15:45:00"),
  },
  {
    id: 7,
    name: "Grace Adams",
    text: "Can we reschedule the call?",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    title: "Sales Manager",
    subtitle: "Let me know your availability.",
    date: new Date("2023-09-15T10:30:00"),
  },
  {
    id: 8,
    name: "Harry Brown",
    text: "The project deadline is next week.",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    title: "Backend Developer",
    subtitle: "We need to finalize the API.",
    date: new Date("2023-09-14T13:00:00"),
  },
  {
    id: 9,
    name: "Isabella Davis",
    text: "I'll be on vacation next week.",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    title: "HR Manager",
    subtitle: "Please contact John for any HR-related queries.",
    date: new Date("2023-09-13T16:00:00"),
  },
  {
    id: 10,
    name: "Jack Miller",
    text: "Can you join the team meeting?",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    title: "DevOps Engineer",
    subtitle: "We need to discuss infrastructure updates.",
    date: new Date("2023-09-12T11:30:00"),
  },
];

const MessagesContent = ({ params: { id } }: { params: { id: string } }) => {
  const [chatFriendItem, setChatFriendItem] = useState<Friends | null>(null);

  useEffect(() => {
    listFriends.map((item) => {
      if (item.id.toString() === id) setChatFriendItem(item);
    });
  }, []);

  return <RightContentMessages chatFriendItem={chatFriendItem} />;
};

export default MessagesContent;
