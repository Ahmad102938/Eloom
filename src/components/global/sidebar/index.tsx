"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getUserworkspaces } from "@/action/workspace";
import { WorkspaceProps } from "@/types";
import Model from "../model";
import { PlusCircle } from "lucide-react";
import WorkspaceSearch, { Search } from "../search";

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {
    const router = useRouter()
    const {data, isFetched} = useQueryData(["user-workspaces"], getUserworkspaces)

    const {data: workspace} = data as WorkspaceProps

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`)
    }
    console.log(activeWorkspaceId);

    const currentWorspace = workspace?.workspace.find((s) => s.id === activeWorkspaceId)

    return <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
    <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src={"/eloom.svg"} alt="logo" width={40} height={40} />
        <p className="tect-2xl">Eloom</p>
    </div>
    <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
            <SelectValue placeholder="Select a workspace" />
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
            <SelectGroup>
                <SelectLabel>Workspaces</SelectLabel>
                <Separator/>
                {workspace?.workspace.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id}>{workspace.name}</SelectItem>
                ))}
                {workspace.members.length > 0 && workspace.members.map((workspace) => 
                    workspace.Workspace && (<SelectItem key={workspace.Workspace.id} value={workspace.Workspace.id}>{workspace.Workspace.name}</SelectItem>)
                )}
            </SelectGroup>
        </SelectContent>
    </Select>
    {currentWorspace?.type==="PUBLIC" && workspace?.subscription?.plan==="PRO" && (<Model title="Invite to Workspace" trigger={<span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
        <PlusCircle size={15} className="text-neutral-800/90 fill-neutral-500" />
        <span className="text-neutral-400 font-semibold text-xs">
            Invite to Workspace
        </span>
    </span> }
        description="Invite Your Team to Your WOrkspace"
    >
        {/* <WorkspaceSearch></WorkspaceSearch> */}
        <Search workspaceId={activeWorkspaceId} />
    </Model>)}
    <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
    <nav className = "w-full">
        <ul></ul>
    </nav>
  </div>
}

export default Sidebar