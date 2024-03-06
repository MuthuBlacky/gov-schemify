"use client"
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar } from "@radix-ui/react-avatar";
import { ChevronsLeftRight } from "lucide-react";
import Link from "next/link";

const UserItem = ()=>{
    const user = useCurrentUser();
   return <div>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role="button" className="w-full flex items-center text-sm p-3 hover:bg-primary/5">
            <div className="flex gap-x-2 items-center max-w-[150px]">
                <Avatar className="w-5 h-5">
                        <AvatarImage src={user?.image!} />
                </Avatar>
                <span className="line-clamp-1">{user?.name}</span>
            </div> 
            <ChevronsLeftRight className="ml-3 rotate-90 text-muted-foreground w-4 h-4"/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80"
        align="start"
        alignOffset={11}
        forceMount>
        <DropdownMenuLabel>
            <span className="text-muted-foreground font-medium text-xs">{user?.email}</span>
        </DropdownMenuLabel>
            <DropdownMenuItem>
                <div className="flex items-center p-3">
                    <div className="flex items-center gap-x-2">
                        <Avatar className="w-8 h-8 rounded-md bg-secondary p-1">
                            <AvatarImage src={user?.image!} />
                        </Avatar>
                        <div
                        className="font-sm line-clamp-1"
                        >{user?.name}&apos;s schemify</div>
                    </div>
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full flex items-center justify-center cursor-pointer text-muted-foreground">
              <Link href={'/api/auth/signout'}>
                Log out
              </Link>
            </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   </div>
}
export default UserItem;

// "use client";

// import { ChevronsLeftRight } from "lucide-react";
// import { useUser, SignOutButton } from "@clerk/clerk-react";

// import {
//   Avatar,
//   AvatarImage
// } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export const UserItem = () => {
//   const { user } = useUser();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
//           <div className="gap-x-2 flex items-center max-w-[150px]">
//             <Avatar className="h-5 w-5">
//               <AvatarImage src={user?.imageUrl} />
//             </Avatar>
//             <span className="text-start font-medium line-clamp-1">
//               {user?.fullName}&apos;s Jotion
//             </span>
//           </div>
//           <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         className="w-80"
//         align="start"
//         alignOffset={11}
//         forceMount
//       >
//         <div className="flex flex-col space-y-4 p-2">
//           <p className="text-xs font-medium leading-none text-muted-foreground">
//             {user?.emailAddresses[0].emailAddress}
//           </p>
//           <div className="flex items-center gap-x-2">
//             <div className="rounded-md bg-secondary p-1"> 
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src={user?.imageUrl} />
//               </Avatar>
//             </div>
//             <div className="space-y-1">
//              <p className="text-sm line-clamp-1">
//                 {user?.fullName}&apos;s Jotion
//               </p>
//             </div>
//           </div>
//         </div>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
//           <SignOutButton>
//             Log out
//           </SignOutButton>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
// export default UserItem;