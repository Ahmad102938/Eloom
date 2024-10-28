import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

type Props = {}

export const InfoBar = ({}: Props) => {
    return (
        <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
            <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg">
        <Search
          size={25}
          className="text-[#707070]"
        />
        <Input
          className="bg-transparent border-none !placeholder-neutral-500"
          placeholder="Search for people, projects, tags & folders"
        />
      </div>
        </header>
    )
}

export default InfoBar