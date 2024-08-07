import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  //1. Подгрузить пользователя

  const { user, isLoading, isAuthenticated } = useUser();

  //2.Если не авторизированный пользователь то отправлять в /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3. Показывать спинер во время загрузкт

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4.Если авторизированный то отправлять в /dashboard

  if (isAuthenticated) return children;

  return null;
};

export default ProtectedRoute;
