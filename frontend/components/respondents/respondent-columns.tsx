"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Respondent } from "@/types/respondent";

export const columns: ColumnDef<Respondent>[] = [
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];