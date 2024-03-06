"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/use-current-user';

export const UserAvatar = () => {
  const  user = useCurrentUser();
  return (
    <Avatar className='h-8 w-8'>
      <AvatarImage src={user?.image!} />
      <AvatarFallback>
        {user?.email?.charAt(0)}
        {user?.name?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
