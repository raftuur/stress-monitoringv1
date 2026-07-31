import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRespondents, createRespondent, updateRespondent } from "@/services/respondent.service";
import { CreateRespondentRequest } from "@/types/respondent";

export function useRespondents(
  page = 1,
  search = ""
) {
  return useQuery({
    queryKey: ["respondents", page, search],
    queryFn: () =>
      getRespondents(
        page,
        10,
        search
      ),
  });
}

export function useCreateRespondent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRespondentRequest) =>
      createRespondent(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["respondents"],
      });
    },
  });
}

// TAMBAHKAN INI
export function useUpdateRespondent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CreateRespondentRequest;
    }) => updateRespondent(id, payload),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["respondents"],
      });
    },
  });
}