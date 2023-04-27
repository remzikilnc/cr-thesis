import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const HeaderMenuItem = styled.li`
  margin:0;
      &:first-child {
         margin-left: 5px;
      }
`;

export const HeaderMenuText = styled(NavLink).attrs((props) => ({
    textcolor: props.textcolor || '#000',
    textactivecolor: props.textactivecolor || '#000',
    color: props.color || '#000',
    activecolor: props.activecolor || '#fff',
}))`
  display:flex;
  align-items:center;
  font-size: 16px;
  font-weight: 600;
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
  padding:0.65rem 2rem;
  background:${(props) => props.color};
  color: ${(props) => props.textcolor};
      &.active {
        color: ${(props) => props.textactivecolor};
        background: ${(props) => props.activecolor};
        font-weight:600;
        border-radius:9999px ;
      }
`;

