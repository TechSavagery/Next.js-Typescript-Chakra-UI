import useSWR from "swr";
import fetcher from "../lib/fetch";

export function useCurrentUser() {
  const { data, mutate } = useSWR("/api/user", fetcher);
  const userData = data?.user;
  return [userData, { mutate }];
}

export function useUser(id: string) {
  const { data } = useSWR(`/api/user/${id}`, fetcher, {
    revalidateOnFocus: false,
  });
  return data;
}
