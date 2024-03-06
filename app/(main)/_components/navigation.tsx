import { ChevronsLeft, MenuIcon, Sidebar } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState ,ElementRef, useEffect} from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";
import UserItem from "./user-item";

const Navigation = ()=>{
   const pathname = usePathname();
   const isMobile = useMediaQuery("(max-width: 768px)");
   const [isCollapsed,setIsCollapsed] = useState(isMobile);
   const sideBarRef = useRef<ElementRef<"aside">>(null);
   const navBarRef = useRef<ElementRef<"div">>(null);
   const isResizingRef = useRef(false);
   const [isResetting,setIsResetting] = useState(false);
   
   useEffect(()=>{
    if(isMobile){collapse();}else{resetting();}
   },[isMobile]);
   
   useEffect(()=>{
    if(isMobile) collapse;
   },[pathname,isMobile]);

   const resetting = ()=>{
    setIsCollapsed(false)
    setIsResetting(true);

    if(sideBarRef.current && navBarRef.current){
      sideBarRef.current.style.width = isMobile ? "100%" : "240px";
      navBarRef.current.style.setProperty("width",isMobile ? "0" : "calc(100%-240px)");
      navBarRef.current.style.setProperty("left",isMobile ? "100%" : "240px");
    }
    setTimeout(() => {
      setIsResetting(false);
    },300);
   }
   const collapse = ()=>{
     setIsCollapsed(true);
     setIsResetting(true);
     if(sideBarRef.current && navBarRef.current){
      sideBarRef.current.style.width = "0";
      navBarRef.current.style.setProperty("width", "100%");
      navBarRef.current.style.setProperty("left", "0");
     }
     setTimeout(() => {
      setIsResetting(false);
     }, 300);
   }

   const handleMouseDown = (e : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
     e.preventDefault();
     e.stopPropagation();
     isResizingRef.current = true;
     document.addEventListener("mousemove",handleMouseMove);
     document.addEventListener("mouseup",handleMouseUp);
   }
   function handleMouseMove(e: MouseEvent){
   if (!isResizingRef.current) return;
    var newWidth = e.clientX;
    if(newWidth < 240){
      newWidth = 240;
    }
    if(newWidth > 480){
      newWidth = 480;
    }
    if(sideBarRef.current && navBarRef.current){
      sideBarRef.current!.style.width = `${newWidth}px`;
      navBarRef.current!.style.setProperty("left",`${newWidth}px`);
      navBarRef.current!.style.setProperty("width",`calc(100% - ${newWidth}px)`);
    }
   }
   function handleMouseUp(){
     isResizingRef.current = false;
     document.removeEventListener("mousemove",handleMouseMove);
     document.removeEventListener("mouseup",handleMouseUp);
   }
    return <>
      <aside
       ref = {sideBarRef}
       className={cn("group/sidebar w-60 h-full bg-secondary flex flex-col overflow-y-auto relative top-0",
       isResetting && "transition-all ease-in-out duration-300" ,isMobile && "w-0"
       )}>   
          <div 
          onClick={collapse}
          role="button"
            className={cn("text-muted-foreground rounded-sm w-6 h-6 hover:bg-neutral-300 dark:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100",
              isMobile && "opacity-100"
            )}>
            <ChevronsLeft className="w-6 h-6"/></div>  
           <div>
               <UserItem />
           </div>
          <div
          onClick={resetting}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="cursor-ew-resize w-1 transition h-full bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 absolute right-0 top-0">
          </div>
      </aside>
      <div
      ref={navBarRef} 
      className={cn("absolute top-0 left-60 z-[99999] w-[calc(100%-240px)] h-full",
      isMobile && "left-0 w-full",isResetting && "transition-all ease-in-out duration-300")}>
        <nav className="px-3 py-2 w-full">
          {isCollapsed && <MenuIcon onClick={resetting} role="button" className="text-muted-foreground w-6"/>}
        </nav>
      </div>
    </>

}
export default Navigation;