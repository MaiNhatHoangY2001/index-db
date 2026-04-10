"use client";

import { useCustomerActions } from "@/hooks/useCustomerActions";
import { useUIStore } from "@/hooks/useUIStore";
import { Button } from "../ui/button";

export default function LeftSidebar() {
  const {
    isLoadEnabled,
    isQueryEnabled,
    isClearEnabled,
    afterLoad,
    afterQuery,
    afterClear,
  } = useUIStore();

  const { loadDB, queryDB, clearDB } = useCustomerActions();

  const handleLoad = async () => {
    await loadDB();
    afterLoad();
  };

  const handleQuery = async () => {
    await queryDB();
    afterQuery();
  };

  const handleClear = async () => {
    await clearDB();
    afterClear();
  };

  return (
    <div className="w-68 flex flex-col justify-between ">
      <div className="w-full border rounded-sm flex flex-col gap-2 p-4 bg-background">
        <span className="font-semibold text-muted-foreground text-xs">
          CONTROLS
        </span>
        <Button onClick={handleLoad} disabled={!isLoadEnabled}>
          Load DB
        </Button>
        <Button onClick={handleQuery} disabled={!isQueryEnabled}>
          Query DB
        </Button>
        <Button
          variant={"destructive"}
          onClick={handleClear}
          disabled={!isClearEnabled}
        >
          Clear DB
        </Button>
      </div>
      {/* <div className="border-l-3 border-l-destructive rounded-lg">
        <div className="p-4 bg-background flex flex-col gap-4 border rounded-sm">
          <span className="text-muted-foreground text-xs font-semibold">
            STATUS
          </span>
          <div className="flex gap-3 items-center">
            <Link2Off className="text-destructive" />
            <div className="flex flex-col gap-1 text-foreground">
              <span className="font-semibold text-sm">Disconnected</span>
              <span className="font-medium text-xs">
                No active connection found
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
