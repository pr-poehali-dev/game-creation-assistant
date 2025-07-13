import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [gameDescription, setGameDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const popularGames = [
    {
      id: 1,
      title: "Космический Захватчик",
      author: "GameMaster",
      players: 87,
      description: "2D космическая стрелялка",
    },
    {
      id: 2,
      title: "Пиксельный Мир",
      author: "CraftLover",
      players: 143,
      description: "3D песочница для строительства",
    },
    {
      id: 3,
      title: "Гонки Будущего",
      author: "SpeedRacer",
      players: 64,
      description: "Футуристические гонки",
    },
  ];

  const handleCreateGame = () => {
    setIsCreating(true);
    // Имитация создания игры
    setTimeout(() => {
      setIsCreating(false);
      alert("Игра создается! Скоро будет готова 🎮");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Навигация */}
      <nav className="bg-secondary/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Gamepad2" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-white">pomndop & iris</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
              <Button variant="outline" size="sm">
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Главный контент */}
      <div className="container mx-auto px-4 py-8">
        {/* Героблок */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-6">
            Создавай игры с помощью
            <span className="text-primary block">
              Искусственного Интеллекта
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Опиши свою игру текстом — ИИ создаст полноценную 2D или 3D игру с
            картами, валютой, мультиплеером и сюжетом
          </p>
        </div>

        {/* Основные разделы */}
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="create" className="text-base">
              <Icon name="Plus" size={20} className="mr-2" />
              Создать игру
            </TabsTrigger>
            <TabsTrigger value="games" className="text-base">
              <Icon name="Library" size={20} className="mr-2" />
              Игры других игроков
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-base">
              <Icon name="User" size={20} className="mr-2" />
              Мой профиль
            </TabsTrigger>
          </TabsList>

          {/* Создание игры */}
          <TabsContent value="create">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  <Icon
                    name="Sparkles"
                    size={24}
                    className="inline mr-2 text-primary"
                  />
                  Создай свою игру
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Опиши игру которую хочешь создать. ИИ сгенерирует код, графику
                  и механики
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white font-medium mb-2 block">
                    Название игры
                  </label>
                  <Input
                    placeholder="Введи название своей игры..."
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">
                    Описание игры
                  </label>
                  <Textarea
                    placeholder="Опиши свою игру: жанр, игровой процесс, цель, персонажей...\n\nПример: Создай 2D платформер про космонавта который собирает кристаллы на разных планетах. Должны быть препятствия, враги-роботы и бонусы скорости."
                    value={gameDescription}
                    onChange={(e) => setGameDescription(e.target.value)}
                    className="min-h-32 bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Тип игры
                    </label>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        2D
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        3D
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">
                      Дополнительные функции
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Валюта
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Мультиплеер
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-white"
                      >
                        Сюжет
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateGame}
                  disabled={isCreating || !gameDescription}
                  className="w-full h-12 text-lg"
                >
                  {isCreating ? (
                    <>
                      <Icon
                        name="Loader2"
                        size={20}
                        className="mr-2 animate-spin"
                      />
                      Создание игры...
                    </>
                  ) : (
                    <>
                      <Icon name="Wand2" size={20} className="mr-2" />
                      Создать игру с ИИ
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Игры других игроков */}
          <TabsContent value="games">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  Игры сообщества
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="TrendingUp" size={16} className="mr-2" />
                    Популярные
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Clock" size={16} className="mr-2" />
                    Новые
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Crown" size={16} className="mr-2" />
                    Создателя
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularGames.map((game) => (
                  <Card
                    key={game.id}
                    className="bg-gray-800/50 border-gray-700 hover:border-primary/50 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white">
                          {game.title}
                        </CardTitle>
                        <Badge variant="secondary">
                          <Icon name="Users" size={12} className="mr-1" />
                          {game.players}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-300">
                        by {game.author}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-4">{game.description}</p>
                      <Button className="w-full">
                        <Icon name="Play" size={16} className="mr-2" />
                        Играть
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Профиль */}
          <TabsContent value="profile">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  <Icon
                    name="User"
                    size={24}
                    className="inline mr-2 text-primary"
                  />
                  Профиль разработчика
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Управляй своими играми и публикациями
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12">
                  <Icon
                    name="UserPlus"
                    size={48}
                    className="mx-auto text-gray-500 mb-4"
                  />
                  <h3 className="text-xl text-white mb-2">Войди в аккаунт</h3>
                  <p className="text-gray-400 mb-6">
                    Чтобы создавать и публиковать игры
                  </p>
                  <div className="space-y-3 max-w-sm mx-auto">
                    <Button className="w-full">
                      <Icon name="LogIn" size={16} className="mr-2" />
                      Войти
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Регистрация
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Футер */}
      <footer className="bg-secondary/30 border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">pomndop & iris — создавай игры с ИИ</p>
            <p className="text-sm">
              Превращай идеи в игры за минуты, не в месяцы
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
