import styled, {css} from "styled-components"
import {NavLink} from "react-router-dom";

export const NavbarVertical = styled.nav`
    width:100%;
    display:flex;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    justify-content:space-between;
    height:fit-content;
    background: ${props => props.bg};
    border-bottom:1px solid ${props => props.border};

  }
`;

export const VerticalMenu = styled.div`
    display: flex;
    flex-wrap: nowrap;
    padding:10px 0 10px 0;
    min-height:75px;
  }
`;
export const MobileMenu = styled.div`
    position: relative;
    cursor: pointer;
  }
`;

export const SoftText = styled.span`
    font-size: 16px;
    font-weight:normal;
    color: ${props => props.softTextColor ?? '#AEAEAE' }
  }
`;


