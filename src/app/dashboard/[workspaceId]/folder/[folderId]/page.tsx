import { getAllUserVideos, getFolderInfo } from '@/action/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params: {
        folderId: string
        workspaceId: string
    }
}

const Page = async ({params:{folderId, workspaceId}}: Props) => {
    const query = new QueryClient()
    await query.prefetchQuery({
        queryKey: ['folder-videos'],
        queryFn: () =>getAllUserVideos(folderId),
    })

    await query.prefetchQuery({
        queryKey: ['folder-info'],
        queryFn: () => getFolderInfo(folderId)
    })

    return <HydrationBoundary state={dehydrate(query)}>
        <FolderInfo folderId={folderId} />
    </HydrationBoundary>
}

export default Page