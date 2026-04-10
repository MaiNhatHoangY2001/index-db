"use client";

import { LogData, useLogStore } from "@/store/logStore";
import { format } from "date-fns";
import { JetBrains_Mono } from "next/font/google";
import { ScrollArea } from "../ui/scroll-area";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

function RightSidebar() {
  const logs = useLogStore((s) => s.logs);

  const getColor = (log: LogData) => {
    switch (log.level) {
      case "WARN":
        return "text-yellow-500";
      case "ERR":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <aside className="w-130 border p-4 flex flex-col bg-background rounded-sm">
      <div className="px-4 py-3 text-xs text-muted-foreground flex justify-between border-b">
        <span className="font-semibold uppercase">Execution Logs</span>
        <span className="font-normal">Clear</span>
      </div>
      <ScrollArea
        className={
          "h-[calc(100vh-50px)] w-full overflow-auto " + jetbrainsMono.className
        }
      >
        <div className="p-4 text-sm">
          {logs.map((log, index) => (
            <p key={index} className={"mt-2 leading-7 " + getColor(log)}>
              <span className="text-muted-foreground">
                {format(log.time, "HH:mm:ss")}
              </span>{" "}
              [{log.level}] {log.label}
            </p>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}

export default RightSidebar;
