import React from "react";
import { onAuthenticateUser } from "@/action/user";
import { redirect } from "next/navigation";
import { verifyAccessToWorkspace, getWorkspaceFolders, getAllUserVideos, getUserworkspaces, getUserNotifications } from "@/action/workspace";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";
import GlobalHeader from "@/components/global/global-header";

type Props = {
    params: {
        workspaceId: string
    }
    children: React.ReactNode
}

const Layout = async ({params: {workspaceId}, children}: Props) => {
    const auth = await onAuthenticateUser();
    if(!auth.user?.workspace.length) redirect('/auth/sign-in');
    if(!auth.user.workspace.length) redirect ('/auth/sign-in');
    const hasAccess = await verifyAccessToWorkspace(workspaceId);

    if(hasAccess.status !== 200) redirect(`${auth.user?.workspace[0].id}`);

    if(!hasAccess.data?.workspace) return null;

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey: ["workspace-folders"],
        queryFn: () => getWorkspaceFolders(workspaceId),
    });

    await query.prefetchQuery({
        queryKey: ["user-videos"],
        queryFn: () => getAllUserVideos(workspaceId),
    });

    await query.prefetchQuery({
        queryKey: ["user-workspaces"],
        queryFn: () => getUserworkspaces(),
    });

    await query.prefetchQuery({
        queryKey: ["user-notifications"],
        queryFn: () => getUserNotifications(),
    });

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex w-screen h-screen">
                <Sidebar activeWorkspaceId = {workspaceId} />
                <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
                    <GlobalHeader workspace={hasAccess.data?.workspace} />
                    <div className="mt-4">{children}</div>
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Layout