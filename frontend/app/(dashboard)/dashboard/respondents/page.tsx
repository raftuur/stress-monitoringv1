"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/table/DataTable";

import { columns } from "@/components/respondents/respondent-columns";
import { useRespondents } from "@/hooks/useRespondents";
import { RespondentDialog } from "@/components/respondents/RespondentDialog";

export default function RespondentsPage() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
  } = useRespondents(
    1,
    search
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search respondent..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="max-w-sm"
        />

        <RespondentDialog mode="create" />
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        loading={isLoading}
      />
    </div>
  );
}