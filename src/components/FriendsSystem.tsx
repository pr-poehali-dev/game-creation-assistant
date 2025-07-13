import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Friend {
  id: string;
  username: string;
  status: 'online' | 'offline' | 'in-game';
  game?: string;
  avatar?: string;
}

interface FriendRequest {
  id: string;
  from: string;
  avatar?: string;
}

interface FriendsSystemProps {
  currentUser: string;
}

const FriendsSystem: React.FC<FriendsSystemProps> = ({ currentUser }) => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', username: 'iris', status: 'online', avatar: '👩‍💻' },
    { id: '2', username: 'noobgamer2024', status: 'in-game', game: 'Space Adventure', avatar: '🎮' },
    { id: '3', username: 'coder_alex', status: 'offline', avatar: '💻' },
  ]);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    { id: '1', from: 'new_player123', avatar: '🐱' },
    { id: '2', from: 'game_master', avatar: '👑' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find(req => req.id === requestId);
    if (request) {
      const newFriend: Friend = {
        id: Date.now().toString(),
        username: request.from,
        status: 'online',
        avatar: request.avatar,
      };
      setFriends([...friends, newFriend]);
      setFriendRequests(friendRequests.filter(req => req.id !== requestId));
    }
  };

  const handleDeclineRequest = (requestId: string) => {
    setFriendRequests(friendRequests.filter(req => req.id !== requestId));
  };

  const handleRemoveFriend = (friendId: string) => {
    setFriends(friends.filter(friend => friend.id !== friendId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'in-game': return 'bg-blue-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'in-game': return 'В игре';
      case 'offline': return 'Не в сети';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Icon name="Users" size={20} className="mr-2" />
            Друзья
          </CardTitle>
          <div className="flex space-x-2">
            <Input
              placeholder="Найти друзей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button variant="outline">
              <Icon name="Search" size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="friends" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="friends" className="text-white">
                Друзья ({friends.length})
              </TabsTrigger>
              <TabsTrigger value="requests" className="text-white">
                Заявки ({friendRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="mt-4">
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
                          {friend.avatar || '👤'}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-700 ${getStatusColor(friend.status)}`}></div>
                      </div>
                      <div>
                        <p className="text-white font-medium">{friend.username}</p>
                        <p className="text-sm text-gray-400">
                          {getStatusText(friend.status)}
                          {friend.status === 'in-game' && friend.game && (
                            <span> • {friend.game}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {friend.status === 'in-game' && (
                        <Button size="sm" variant="outline">
                          <Icon name="Gamepad2" size={14} className="mr-1" />
                          Присоединиться
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Icon name="MessageCircle" size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveFriend(friend.id)}
                      >
                        <Icon name="UserMinus" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
                {friends.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Icon name="Users" size={48} className="mx-auto mb-2 opacity-50" />
                    <p>У вас пока нет друзей</p>
                    <p className="text-sm">Найдите игроков и отправьте им заявки!</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="mt-4">
              <div className="space-y-3">
                {friendRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
                        {request.avatar || '👤'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{request.from}</p>
                        <p className="text-sm text-gray-400">Хочет добавить в друзья</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Icon name="Check" size={14} className="mr-1" />
                        Принять
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        <Icon name="X" size={14} className="mr-1" />
                        Отклонить
                      </Button>
                    </div>
                  </div>
                ))}
                {friendRequests.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Icon name="Inbox" size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Нет новых заявок в друзья</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendsSystem;