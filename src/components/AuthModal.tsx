import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, isAdmin: boolean) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Аккаунт создателя
  const ADMIN_CREDENTIALS = {
    username: 'pomndop',
    password: '1002266'
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    // Проверка аккаунта создателя
    if (loginData.username === ADMIN_CREDENTIALS.username && loginData.password === ADMIN_CREDENTIALS.password) {
      setTimeout(() => {
        onLogin(loginData.username, true);
        onClose();
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Проверка обычных пользователей (симуляция)
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = savedUsers.find((u: any) => u.username === loginData.username && u.password === loginData.password);

    setTimeout(() => {
      if (user) {
        onLogin(loginData.username, false);
        onClose();
      } else {
        setError('Неверный никнейм или пароль');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Пароли не совпадают');
      setIsLoading(false);
      return;
    }

    if (registerData.username.length < 3) {
      setError('Никнейм должен быть не менее 3 символов');
      setIsLoading(false);
      return;
    }

    if (registerData.username === ADMIN_CREDENTIALS.username) {
      setError('Этот никнейм зарезервирован');
      setIsLoading(false);
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = savedUsers.find((u: any) => u.username === registerData.username);

    setTimeout(() => {
      if (userExists) {
        setError('Пользователь с таким никнеймом уже существует');
      } else {
        const newUser = { username: registerData.username, password: registerData.password, banned: false };
        savedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(savedUsers));
        onLogin(registerData.username, false);
        onClose();
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            <Icon name="User" size={20} className="inline mr-2 text-primary" />
            Вход в аккаунт
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Войди или создай аккаунт для создания игр
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-username" className="text-white">Никнейм</Label>
              <Input
                id="login-username"
                placeholder="Введи свой никнейм"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-white">Пароль</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Введи пароль"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button 
              onClick={handleLogin} 
              disabled={isLoading || !loginData.username || !loginData.password}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Войти
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-username" className="text-white">Никнейм</Label>
              <Input
                id="register-username"
                placeholder="Придумай никнейм"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password" className="text-white">Пароль</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="Придумай пароль"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white">Повтори пароль</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Повтори пароль"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button 
              onClick={handleRegister} 
              disabled={isLoading || !registerData.username || !registerData.password || !registerData.confirmPassword}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Создание...
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Создать аккаунт
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;