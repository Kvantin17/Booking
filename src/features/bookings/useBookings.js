import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const QueryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  //фильтер
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // cсортировка
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Пагинация
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //Query запрос
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // вставив сюда filter и sortBy мы сообщаем React Query сделать новый заброс, так как он будет под новым именем, React Query будет хранить в кеше все варианты фильтра и сортировки
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // pre-fetching данных
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    QueryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    QueryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
