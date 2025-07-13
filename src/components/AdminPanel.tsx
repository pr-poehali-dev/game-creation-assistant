import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface User {
  username: string;
  password: string;
  banned: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

interface AdminPanelProps {
  isVisible: boolean;
}

const AdminPanel = ({ isVisible }: AdminPanelProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      loadUsers();
      loadPosts();
    }
  }, [isVisible]);

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
  };

  const loadPosts = () => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
  };

  const banUser = (username: string) => {
    const updatedUsers = users.map(user => 
      user.username === username ? { ...user, banned: true } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const unbanUser = (username: string) => {
    const updatedUsers = users.map(user => 
      user.username === username ? { ...user, banned: false } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const createPost = () => {
    if (!newPost.title || !newPost.content) return;
    
    setIsPosting(true);
    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      timestamp: Date.now()
    };

    setTimeout(() => {
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setNewPost({ title: '', content: '' });
      setIsPosting(false);
    }, 1000);
  };

  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-red-900/20 border-red-500/50 mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Icon name="Crown" size={24} className="mr-2 text-yellow-400" />
          Панель администратора
        </CardTitle>
        <CardDescription className="text-gray-300">
          Управление пользователями и публикация постов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="users">
              <Icon name="Users" size={16} className="mr-2" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="posts">
              <Icon name="FileText" size={16} className="mr-2" />
              Посты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="grid gap-4">
              {users.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Нет зарегистрированных пользователей</p>
              ) : (
                users.map((user) => (
                  <div key={user.username} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Icon name="User" size={20} className="text-gray-400" />
                      <span className="text-white font-medium">{user.username}</span>
                      {user.banned && (
                        <Badge variant="destructive">
                          <Icon name="Ban" size={12} className="mr-1" />
                          Заблокирован
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {user.banned ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => unbanUser(user.username)}
                        >
                          <Icon name="UserCheck" size={14} className="mr-1" />
                          Разблокировать
                        </Button>
                      ) : (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => banUser(user.username)}
                        >
                          <Icon name="Ban" size={14} className="mr-1" />
                          Заблокировать
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            {/* Создание нового поста */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  <Icon name="Plus" size={20} className="inline mr-2" />
                  Создать пост
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Заголовок</label>
                  <Input
                    placeholder="Введи заголовок поста..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-white font-medium mb-2 block">Содержание</label>
                  <Textarea
                    placeholder="Напиши содержание поста..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white min-h-24"
                  />
                </div>
                <Button 
                  onClick={createPost}
                  disabled={isPosting || !newPost.title || !newPost.content}
                  className="w-full"
                >
                  {isPosting ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Публикация...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={16} className="mr-2" />
                      Опубликовать пост
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Список постов */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Опубликованные посты</h3>
              {posts.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Нет опубликованных постов</p>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white">{post.title}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deletePost(post.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      <CardDescription className="text-gray-400">
                        {new Date(post.timestamp).toLocaleString('ru-RU')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{post.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;