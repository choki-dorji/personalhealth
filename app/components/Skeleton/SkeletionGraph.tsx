import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function SkeletionGraph() {
  return (
    <Card className="space-y-4 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-[58vh] rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}
