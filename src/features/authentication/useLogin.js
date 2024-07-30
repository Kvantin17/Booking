import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // благодаря setQueriesData мы можем засовывать вручную те или иные данные в кэш React Query
      // В данном случае мы засовывваем в кэш 'user' данные чтоб лишний раз не сработал запрос в хуке useUser
      queryClient.setQueryData(["user"], user.user);
      // replace нужен чтоб нельзя было вернуться на страницу нажимая кнопку назад в браузере
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("error", err);
      toast.error("Email or Password are incorrect");
    },
  });

  return { login, isLoading };
}
