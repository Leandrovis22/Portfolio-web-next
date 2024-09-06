"use client";

import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import ThemeButton from "./ThemeButton";
import Image from "next/image";

export default function Navbarcomponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const menuItems = [
    { name: "Sobre mí", id: "about" },
    { name: "Habilidades", id: "skills" },
    { name: "Certificaciones", id: "certifications" },
    { name: "Proyectos", id: "projects" },
    { name: "Contacto", id: "contact" },
  ];

  // Función para detectar la sección activa basándose en el scroll
  const handleScroll = () => {
    const sections = menuItems.map(item => document.getElementById(item.id));
    const scrollY = window.scrollY + window.innerHeight / 2;

    const currentSection = sections.find(section => {
      if (section) {
        const { offsetTop, offsetHeight } = section;
        return scrollY >= offsetTop && scrollY < offsetTop + offsetHeight;
      }
      return false;
    });

    if (currentSection) {
      setActiveSection(currentSection.id);
    }
  };

  useEffect(() => {
    // Detectar la sección activa al hacer scroll
    window.addEventListener("scroll", handleScroll);

    // Detectar la sección activa al cargar la página
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuItems]);

  return (
    <Navbar isBlurred={true} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <Image src="/LV logo.png" alt="Logo" width={40} height={40} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              href={`#${item.id}`}
              className={`${activeSection === item.id ? "text-accentlight dark:text-accentdark border-b-2 border-accentlight dark:border-accentdark" : ""} capitalize font-medium hover:text-accentlight dark:hover:text-accentdark transition-all`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeButton />
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color="foreground"
              className={`${activeSection === item.id ? "text-accent border-b-2 border-accent" : ""} w-full justify-end flex`}
              href={`#${item.id}`}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="justify-end flex">
          <ThemeButton />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
