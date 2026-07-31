"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/user-columns";
import { useUsers } from "@/hooks/useUsers";
import { UserDialog } from "@/components/users/UserDialog";
import { DataPagination } from "@/components/common/DataPagination";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useUsers(page, search);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">
            Manage application users.
          </p>
        </div>

        <UserDialog mode="create" />
      </div>

      <Input
        placeholder="Search user..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
      />

      {data && (
        <DataPagination
          page={page}
          limit={data.limit}
          total={data.total}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}