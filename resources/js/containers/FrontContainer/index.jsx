import React from 'react';
import {Container} from "@/containers/FrontContainer/styles";
import {Outlet} from "react-router-dom";

function FrontContainer({ children }) {
    return (
        <Container className="container">
                { children }
                <Outlet></Outlet>
        </Container>
    );
}

export default FrontContainer;
