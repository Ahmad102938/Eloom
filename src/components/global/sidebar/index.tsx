"use client"
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getUserNotifications, getUserworkspaces } from "@/action/workspace";
import { NotificationsProps, WorkspaceProps } from "@/types";
import Model from "../model";
import { Menu, PlusCircle } from "lucide-react";
import WorkspaceSearch, { Search } from "../search";
import { MENU_ITEMS } from "@/constants";
import { SidebarItems } from "./sidebar-items";
import { WorkspacePlaceholder } from "./workspace-placeholder";
import GlobalCard from "@/components/global/global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../info-bar";

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {
    const router = useRouter()
    const pathname = usePathname();
    const {data, isFetched} = useQueryData(["user-workspaces"], getUserworkspaces)

    const {data: notifications} = useQueryData(["user-notifications"], getUserNotifications)

    const {data: workspace} = data as WorkspaceProps
    const {data: count} = notifications as NotificationsProps

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`)
    }
    console.log(activeWorkspaceId);

    const currentWorspace = workspace?.workspace.find((s) => s.id === activeWorkspaceId)

    const menuItems = MENU_ITEMS(activeWorkspaceId);


    const SidebarSection = ( <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
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
        <ul>{menuItems.map((item) => (
            <SidebarItems
                href={item.href}
                icon={item.icon}
                selected={pathname === item.href}
                title={item.title}
                key={item.title}
                notifications={
                    (item.title ==='notifications' && 
                        count._count &&
                        count._count.notification) || 0
                }
            />
        ))}</ul>
    </nav>
    <Separator className="w-4/5"/>
    <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>
    {
        workspace.workspace.length === 1 && workspace.members.length===0 && (<div className="w-full mt-[-10px]">
        <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan==='FREE' ? 'Upgrage to create Workspaces' : 'No Workspaces'}
        </p>
        </div>
    )}
    <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
            {workspace.workspace.length > 0 && workspace.workspace.map((item) => (
                item.type==="PERSONAL" && (
                <SidebarItems
                    href={`/dashboard/${item.id}`}
                    selected={pathname===`/dshboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    key={item.name}
                    icon={<WorkspacePlaceholder>{item.name.charAt(0)}</WorkspacePlaceholder>}
                />
                )
            ))}
            {
                workspace.members.length > 0 && workspace.members.map((item) => (
                    <SidebarItems
                    href={`/dashboard/${item.Workspace.id}`}
                    selected={pathname===`/dshboard/${item.Workspace.id}`}
                    title={item.Workspace.name}
                    notifications={0}
                    key={item.Workspace.name}
                    icon={<WorkspacePlaceholder>{item.Workspace.name.charAt(0)}</WorkspacePlaceholder>}
                />
                ))
            }
            
        </ul>
    </nav>
    <Separator className="w-4/5"/>
    {workspace.subscription?.plan==='FREE' && (<GlobalCard
        title="Upgrade to PRO"
        description="Unlock AI features like transcription, AI summery, and ,more."
    >
        <Button className="text-sm w-full mt-2">
            <Loader color="#000" state={false}>Upgrade</Loader>
        </Button>
    </GlobalCard>)}
  </div>
    )

    return <div className="full">
        <InfoBar />
        {/* for mobile and desktop */}
        <div className="md:hidden fixed my-4">
            <Sheet>
                <SheetTrigger asChild className="ml-2">
                    <Button variant="ghost" className="mt-[2px]">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent side={'left'} className="p-0 w-fit h-full">
                    {SidebarSection}
                </SheetContent>
            </Sheet>
        </div>
        <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
}

export default Sidebar
