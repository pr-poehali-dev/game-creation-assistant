import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  type: 'user' | 'system' | 'team';
  avatar?: string;
}

interface GameChatProps {
  gameId: string;
  currentUser: string;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

const GameChat: React.FC<GameChatProps> = ({ 
  gameId, 
  currentUser, 
  isMinimized = false, 
  onToggleMinimize 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      username: 'system',
      message: 'Добро пожаловать в игру! Соблюдайте правила и играйте честно.',
      timestamp: new Date(Date.now() - 300000),
      type: 'system'
    },
    {
      id: '2',
      username: 'iris',
      message: 'Привет всем! Кто хочет играть в команде?',
      timestamp: new Date(Date.now() - 120000),
      type: 'user',
      avatar: '👩‍💻'
    },
    {
      id: '3',
      username: 'noobgamer2024',
      message: 'Я за! Как объединиться?',
      timestamp: new Date(Date.now() - 60000),
      type: 'user',
      avatar: '🎮'
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        username: currentUser,
        message: currentMessage.trim(),
        timestamp: new Date(),
        type: 'user',
        avatar: '🚀'
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-blue-900/30 border-l-4 border-blue-500';
      case 'team':
        return 'bg-green-900/30 border-l-4 border-green-500';
      default:
        return 'bg-gray-700/30';
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleMinimize}
          className="bg-primary hover:bg-primary/80 text-white"
        >
          <Icon name="MessageCircle" size={20} className="mr-2" />
          Чат ({messages.length})
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 z-50">
      <Card className="bg-gray-800/95 border-gray-700 h-full flex flex-col backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm flex items-center">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Игровой чат
            </CardTitle>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={onToggleMinimize}
                className="h-6 w-6 p-0 hover:bg-gray-600"
              >
                <Icon name="Minimize2" size={12} />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Badge variant="secondary" className="text-xs">
              <Icon name="Users" size={10} className="mr-1" />
              3 онлайн
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-3">
          {/* Список сообщений */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg text-sm ${getMessageStyle(msg.type)}`}
              >
                <div className="flex items-start space-x-2">
                  {msg.type === 'user' && (
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                      {msg.avatar || '👤'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${
                        msg.type === 'system' ? 'text-blue-400' :
                        msg.username === currentUser ? 'text-green-400' : 'text-white'
                      }`}>
                        {msg.type === 'system' ? 'Система' : msg.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 break-words">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода */}
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите сообщение..."
              className="bg-gray-700 border-gray-600 text-white text-sm"
              maxLength={200}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim()}
              size="sm"
              className="px-3"
            >
              <Icon name="Send" size={14} />
            </Button>
          </div>

          {/* Быстрые команды */}
          <div className="flex space-x-1 mt-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs px-2 py-1 h-6"
              onClick={() => setCurrentMessage('GG!')}
            >
              GG!
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs px-2 py-1 h-6"
              onClick={() => setCurrentMessage('Хорошая игра!')}
            >
              👍
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs px-2 py-1 h-6"
              onClick={() => setCurrentMessage('/team')}
            >
              Команда
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameChat;