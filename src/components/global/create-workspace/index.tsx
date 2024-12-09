"use client"
import { getUserworkspaces } from "@/action/workspace";
import { Button } from "@/components/ui/button";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";
import Model from "../model";
import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import WorkspaceForm from "@/components/forms/workspace-form";

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
            trigger={<Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
                <FolderPlusDuotine/>
                Create a Workspace
            </Button>}
        >
            <WorkspaceForm />
        </Model>
    );
};

export default CreateWorkspace;
