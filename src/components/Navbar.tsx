"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link as ReactScrollLink } from "react-scroll";
import ThemeButton from "./ThemeButton";
import Image from "next/image";

export default function Navbarcomponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const menuItems = [
    { name: "Sobre mí", id: "about" },
    { name: "Habilidades", id: "skills" }, // 4rem offset
    { name: "Certificaciones", id: "certifications", offset: -39 }, // 4rem offset
    { name: "Proyectos", id: "projects", offset: -39 }, // 4rem offset
    { name: "Contacto", id: "contact", offset: -39 },
  ];

  const handleScroll = () => {
    const sections = menuItems.map((item) => document.getElementById(item.id));
    const scrollY = window.scrollY + window.innerHeight / 2;

    const currentSection = sections.find((section) => {
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
    window.addEventListener("scroll", handleScroll);
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
            <ReactScrollLink
              to={item.id}
              spy={true}
              smooth={true}
              offset={item.offset || 0} // Aplica el offset si está definido
              duration={50}
              className={`${
                activeSection === item.id
                  ? "text-accent border-b-2 border-accent"
                  : ""
              } capitalize font-medium hover:text-accent transition-all cursor-pointer`}
            >
              {item.name}
            </ReactScrollLink>
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
            <ReactScrollLink
              to={item.id}
              spy={true}
              smooth={true}
              offset={item.offset || 0} // Aplica el offset si está definido
              duration={50}
              className={`${
                activeSection === item.id
                  ? "text-accent border-b-2 border-accent"
                  : ""
              } w-full justify-end flex cursor-pointer`}
              onClick={() => setIsMenuOpen(false)} // Close menu after click
            >
              {item.name}
            </ReactScrollLink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="justify-end flex">
          <ThemeButton />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
