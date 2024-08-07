import { formatDistance, parseISO } from "date-fns";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

export const getToday = function (options = {}) {
  const today = new Date();
  //Это необходимо для сравнения с created_at из Supabase
  //Эта строка устонавливает дату как КОНЕЦ дня, когда мы сравниваем ее с более ранними датами
  if (options?.end)
    //Установить на последнюю секунду дня
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );
