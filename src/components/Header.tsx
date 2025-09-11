'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Container, Nav } from "react-bootstrap";

export function Header() {
    const pathname = usePathname();

    return (
        <>
        {
            pathname !== '/' &&
            <Navbar className="bg-body-tertiary flex-col flex-1">
                <Container>
                    <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/produtos">Lista de Produtos</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Link href="/produtos">Produtos (Next Link)</Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        }
        </>
    );
}