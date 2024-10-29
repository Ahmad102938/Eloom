"use client"
import { getUserworkspaces } from "@/action/workspace";
import { Button } from "@/components/ui/button";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";
import Model from "../model";

type Props = {}

const CreateWorkspace = (props: Props) => {
    const {data} = useQueryData(["user-workspaces"], getUserworkspaces)
    const {data: plan} = data as {
        status: number
        data: {
            subscription: {
                plan: "PRO"| "FREE"
            } | null
        }
    }

    if(plan.subscription?.plan === "FREE") return (
        <></>
    );
    if(plan.subscription?.plan === "PRO") return (
        <Model
            title="Create Workspace"
            description="Create a new workspace to start uploading videos. You are assigned a workspace, you can share videos with yourself in private."
            trigger={<Button></Button>}
        >
            
        </Model>
    );
};

export default CreateWorkspace;
