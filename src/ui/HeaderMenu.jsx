import { HiOutlineUser } from "react-icons/hi2";
import LogOut from "../features/authentication/LogOut";
import ButtonIcon from "./ButtonIcon";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <LogOut />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
