import { searchUsers } from "@/action/user";
import { useEffect, useState } from "react"
import { useQueryData } from "./useQueryData";

export const useSearch = (key: string, type: 'USERS') => {
    const [query, setQuery] = useState('');
    const [debounce, setDebounce] = useState('');
    const [onUsers, setOnUsers] = useState<{
        id: string;
        subscription: {
            plan: "PRO" | "FREE"
        } | null
        firstname: string | null;
        lastname: string | null
        image: string | null
        email: string | null
    }[] | undefined >(undefined)

    const onsearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebounce(query)
        }, 1000)
        return () => clearTimeout(delayInputTimeoutId)
    }, [query])

    const {refetch, isFetching} = useQueryData([key, debounce], async ({queryKey}) => {
        if(type === 'USERS') {
            const workspace = await searchUsers(queryKey[1] as string)
            if(workspace.status === 200) setOnUsers(workspace.data)
        }
    }, false)

    useEffect(() => {
        if(debounce) refetch()
        if(!debounce) setOnUsers(undefined)
        return () => { debounce }
    }, [debounce])

    return {onsearchQuery, query, isFetching, onUsers}
}