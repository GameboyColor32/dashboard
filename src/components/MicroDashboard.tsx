import React, { useState } from 'react';
import { TicketAnalysis } from '../types';
import { convertToChatView, formatDate, getScoreColor, getScoreBackgroundColor } from '../utils/dataLoader';
import { ChevronDown, ChevronUp, User, Bot } from 'lucide-react';

interface MicroDashboardProps {
  analysis: TicketAnalysis;
}

const MicroDashboard: React.FC<MicroDashboardProps> = ({ analysis }) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

  const ticketChats = analysis.tickets.map(convertToChatView);

  const toggleMessageExpansion = (messageId: string) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId);
    } else {
      newExpanded.add(messageId);
    }
    setExpandedMessages(newExpanded);
  };

  const selectedChat = ticketChats.find(chat => chat.id === selectedTicket);

  return (
    <div className="space-y-6">
      {/* Ticket Selection */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Select Ticket for Analysis</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ticketChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedTicket(chat.id)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  selectedTicket === chat.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <h4 className="font-medium text-gray-900 mb-2">{chat.title}</h4>
                <p className="text-sm text-gray-600 mb-2">ID: {chat.id}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {chat.messages.length} messages
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(chat.header.creation_date)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Analysis */}
      {selectedChat && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Chat Analysis</h3>
            <p className="text-sm text-gray-600 mt-1">{selectedChat.title}</p>
          </div>
          
          <div className="p-6">
            {/* Ticket Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="font-medium">Status:</span> {selectedChat.header.status}</p>
                  <p><span className="font-medium">Priority:</span> {selectedChat.header.priority}</p>
                  <p><span className="font-medium">Assigned to:</span> {selectedChat.header.assigned_to}</p>
                </div>
                <div>
                  <p><span className="font-medium">Topic:</span> {selectedChat.details.topic}</p>
                  <p><span className="font-medium">Language:</span> {selectedChat.details.language}</p>
                  <p><span className="font-medium">Time spent:</span> {selectedChat.details.total_time_spent} min</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {selectedChat.messages.map((message) => (
                <div key={message.id} className="border rounded-lg overflow-hidden">
                  {/* Message Header */}
                  <div className={`px-4 py-3 flex items-center justify-between ${
                    message.isAgent ? 'bg-blue-50' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      {message.isAgent ? (
                        <Bot className="h-5 w-5 text-blue-600" />
                      ) : (
                        <User className="h-5 w-5 text-gray-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{message.sender}</p>
                        <p className="text-sm text-gray-600">{formatDate(message.date)}</p>
                      </div>
                    </div>
                    
                    {message.evaluation && (
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBackgroundColor(message.evaluation.score)} ${getScoreColor(message.evaluation.score)}`}>
                          {message.evaluation.score}/100
                        </span>
                        <button
                          onClick={() => toggleMessageExpansion(message.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {expandedMessages.has(message.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="px-4 py-3">
                    <div className="whitespace-pre-wrap text-gray-900">{message.content}</div>
                  </div>

                  {/* Evaluation Details */}
                  {message.evaluation && expandedMessages.has(message.id) && (
                    <div className="border-t bg-gray-50 px-4 py-3">
                      <h4 className="font-medium text-gray-900 mb-3">Evaluation Details</h4>
                      <div className="space-y-2">
                        {message.evaluation.evaluations.map((evaluation, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              evaluation.answer === 'Oui' ? 'bg-red-100 text-red-800' :
                              evaluation.answer === 'Non' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {evaluation.answer}
                            </span>
                            <span className="text-sm text-gray-700 flex-1">
                              {evaluation.justification}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MicroDashboard; 