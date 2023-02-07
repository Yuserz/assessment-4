import React from "react";

export default function Message() {
    const messages = [
    {
        id: 1,
        sender: 'John Doe',
        message: 'Hi, how are you doing today?',
        timestamp: '2021-01-01 12:00:00'
    },
    {
        id: 2,
        sender: 'Jane Doe',
        message: 'I am doing well, thanks for asking. How about you?',
        timestamp: '2021-01-01 12:05:00'
    },
    {
        id: 3,
        sender: 'John Doe',
        message: 'I am doing good too. Let\'s catch up soon.',
        timestamp: '2021-01-01 12:10:00'
    },
    {
        id: 4,
        sender: 'Bob Smith',
        message: 'Hey, did you guys hear about the latest tech news?',
        timestamp: '2021-01-01 12:15:00'
    },
    {
        id: 5,
        sender: 'John Doe',
        message: 'Nahhh',
        timestamp: '2021-01-01 12:00:00'
    }
    ];

  return (
    <div className={`h-full  ${messages.length === 5 ? "overflow-auto" : []}`}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 whitespace-nowrap decoration-none w-full flex ${message.sender === "John Doe" ? "justify-end"  : []}`}
        >
          <div className={`w-fit p-4 py-6 rounded-3xl flex flex-col ${message.sender === "John Doe" ? "bg-violet-200 shadow-sm border border-gray/80 justify-self-end"  : "bg-white shadow-sm border border-gray/80 justify-self-end"}`}>
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
}
