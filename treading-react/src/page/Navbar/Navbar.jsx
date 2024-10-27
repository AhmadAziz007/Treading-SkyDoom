import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Sidebar from "./Sidebar"
import { useSelector } from "react-redux"
import { store } from "../../State/Store"

const Navbar = () => {
  const { auth } = useSelector(store => store)
  return (
    <div className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">

      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="round-full h-11 w-11">
              <DragHandleHorizontalIcon className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-72 border-r-0 flex flex-col justify-center" side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-1">
                  <Avatar>
                    <AvatarImage src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035" />
                  </Avatar>
                  <div>
                    <span className="font-bold text-orange-700">Skydoom</span>
                    <span>Tread</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-30 space-y-5">
              <div>
                <span className="w-8">
                  <Sidebar />
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="text-2xl flex justify-center items-center gap-1">
          <div>
            <span className="font-bold text-orange-700">Skydoom</span>
            <span>Tread</span>
          </div>
        </div>
        <div className="p-0 ml-9">
          <Button variant="outline" className="flex items-center gap-3">
            <MagnifyingGlassIcon />
            <span>Search</span>
          </Button>
        </div>
      </div>
      <div>
        <Avatar>
          <AvatarFallback>
            {auth.user?.fullName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default Navbar