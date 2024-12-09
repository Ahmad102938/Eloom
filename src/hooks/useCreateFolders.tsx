import { createFolder } from "@/action/workspace"
import { useMutationData } from "./useMutationData"

export const useCreateFolders = (workspaceId: string) => {
    const {mutate} = useMutationData(['create-folder'], () => createFolder(workspaceId), "workspace-folders")

    const onCreateNewFolder = () => mutate({name:'untitled', id: 'optimistic-id'})

    return {onCreateNewFolder}
}