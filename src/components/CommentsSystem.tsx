import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  avatar?: string;
  replies?: Comment[];
}

interface CommentsSystemProps {
  postId: string;
  currentUser: string;
  canComment?: boolean;
}

const CommentsSystem: React.FC<CommentsSystemProps> = ({ 
  postId, 
  currentUser, 
  canComment = true 
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'iris',
      content: 'Отличный пост! Очень полезная информация для новичков в разработке игр.',
      timestamp: new Date(Date.now() - 3600000),
      likes: 5,
      isLiked: false,
      avatar: '👩‍💻',
      replies: [
        {
          id: '1-1',
          username: 'noobgamer2024',
          content: 'Согласен! Особенно понравился раздел про геймплей.',
          timestamp: new Date(Date.now() - 3000000),
          likes: 2,
          isLiked: true,
          avatar: '🎮'
        }
      ]
    },
    {
      id: '2',
      username: 'coder_alex',
      content: 'Можете добавить примеры кода? Было бы очень круто!',
      timestamp: new Date(Date.now() - 1800000),
      likes: 3,
      isLiked: false,
      avatar: '💻'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: currentUser,
        content: newComment.trim(),
        timestamp: new Date(),
        likes: 0,
        isLiked: false,
        avatar: '🚀',
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId: string) => {
    if (replyText.trim()) {
      const reply: Comment = {
        id: `${commentId}-${Date.now()}`,
        username: currentUser,
        content: replyText.trim(),
        timestamp: new Date(),
        likes: 0,
        isLiked: false,
        avatar: '🚀'
      };

      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      }));

      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    setComments(comments.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked
              };
            }
            return reply;
          })
        };
      } else if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} ч назад`;
    return `${days} дн назад`;
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean; parentId?: string }> = ({ 
    comment, 
    isReply = false, 
    parentId 
  }) => (
    <div className={`${isReply ? 'ml-8 border-l-2 border-gray-600 pl-4' : ''}`}>
      <div className="flex space-x-3 p-3 bg-gray-700/30 rounded-lg">
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
          {comment.avatar || '👤'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-white">{comment.username}</span>
            <span className="text-xs text-gray-400">{formatTime(comment.timestamp)}</span>
          </div>
          <p className="text-gray-300 text-sm mb-2">{comment.content}</p>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleLike(comment.id, isReply, parentId)}
              className={`h-6 px-2 text-xs ${
                comment.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Icon name="Heart" size={12} className={`mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
              {comment.likes}
            </Button>
            {!isReply && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="h-6 px-2 text-xs text-gray-400 hover:text-white"
              >
                <Icon name="MessageCircle" size={12} className="mr-1" />
                Ответить
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Форма ответа */}
      {replyingTo === comment.id && (
        <div className="mt-3 ml-8">
          <div className="flex space-x-2">
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Напишите ответ..."
              className="bg-gray-700 border-gray-600 text-white text-sm resize-none"
              rows={2}
            />
            <div className="flex flex-col space-y-1">
              <Button
                size="sm"
                onClick={() => handleAddReply(comment.id)}
                disabled={!replyText.trim()}
              >
                <Icon name="Send" size={12} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setReplyingTo(null)}
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Ответы */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply={true} 
              parentId={comment.id} 
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2" />
          Комментарии ({comments.reduce((total, comment) => total + 1 + (comment.replies?.length || 0), 0)})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Форма добавления комментария */}
        {canComment && (
          <div className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Поделитесь своими мыслями..."
              className="bg-gray-700 border-gray-600 text-white resize-none"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">
                {newComment.length}/500 символов
              </div>
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                size="sm"
              >
                <Icon name="Send" size={14} className="mr-2" />
                Опубликовать
              </Button>
            </div>
          </div>
        )}

        {/* Список комментариев */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          {comments.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Пока нет комментариев</p>
              <p className="text-sm">Станьте первым, кто оставит комментарий!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsSystem;