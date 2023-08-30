import React from "react";
import { Card, CardHeader, Skeleton } from "@nextui-org/react";

export default function SkeletionAlarm() {
  return (
    <Card className="space-y-4 p-4 max-w-[360px]" radius="lg">
      <CardHeader></CardHeader>
      <Skeleton className="rounded-lg">
        <div className="h-[70vh] rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}
