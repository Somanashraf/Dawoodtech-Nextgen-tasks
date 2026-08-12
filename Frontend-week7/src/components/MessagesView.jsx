import React, { useState } from 'react';
import { Send, Search, CheckCheck, Paperclip, Smile } from 'lucide-react';

export const MessagesView = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [inputText, setInputText] = useState('');

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Frontend Dev',
      avatar: 'SC',
      online: true,
      lastMessage: 'I reviewed the Tailwind v4 migration pull request!',
      time: '10:42 AM',
      unread: 2,
      messages: [
        { id: 1, sender: 'them', text: 'Hey Soman! Did you check the new Tailwind CSS v4 custom variant setup?', time: '10:35 AM' },
        { id: 2, sender: 'me', text: 'Yes, adding @custom-variant dark solved the class-based dark mode toggle perfectly!', time: '10:38 AM' },
        { id: 3, sender: 'them', text: 'I reviewed the Tailwind v4 migration pull request! Looks ready to merge.', time: '10:42 AM' },
      ]
    },
    {
      id: 2,
      name: 'Alex Rivera',
      role: 'Backend Lead',
      avatar: 'AR',
      online: false,
      lastMessage: 'The WebSocket stream endpoint is ready for integration.',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', text: 'The WebSocket stream endpoint is ready for integration.', time: 'Yesterday' }
      ]
    },
    {
      id: 3,
      name: 'David Kim',
      role: 'DevOps Specialist',
      avatar: 'DK',
      online: true,
      lastMessage: 'SSL certificates renewed for staging cluster.',
      time: 'Aug 10',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', text: 'SSL certificates renewed for staging cluster.', time: 'Aug 10' }
      ]
    }
  ]);

  const activeConv = conversations.find(c => c.id === activeConversation) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConversation) {
        return {
          ...c,
          lastMessage: inputText,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row overflow-hidden animate-fade-in">
      {/* Conversations List Panel */}
      <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white text-base font-outfit">Team Messages</h2>
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-1.5 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveConversation(c.id)}
              className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors ${
                activeConversation === c.id 
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/60' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="relative shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs">
                  {c.avatar}
                </div>
                {c.online && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate">{c.name}</span>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{c.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Conversation Chat Window */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              {activeConv.avatar}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{activeConv.name}</h3>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Active Now</p>
            </div>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {activeConv.messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2.5 text-xs shadow-xs ${
                m.sender === 'me'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
              }`}>
                <p>{m.text}</p>
                <span className={`text-[9px] mt-1 block text-right ${m.sender === 'me' ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Write a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
