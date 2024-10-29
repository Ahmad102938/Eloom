import CreateWorkspace from "@/components/global/create-workspace";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  params: {
    workspaceId: string
  }
};

const DashboardPage = ({params}: Props) => {
  return (
    <div>
      <Tabs
          defaultValue="videos"
          className="mt-6"
        >
          <div className="flex w-full justify-between items-center">
            <TabsList className="bg-transparent gap-2 pl-0">
              <TabsTrigger
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
                value="videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
              >
                Archive
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-x-3">
              <CreateWorkspace />
              {/* <CreateForlders workspaceId={workspaceId} /> */}
            </div>
          </div>
        </Tabs>
    </div>
  )
};

export default DashboardPage;
