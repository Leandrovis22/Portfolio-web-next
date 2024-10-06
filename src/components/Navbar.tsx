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
  const [windowWidth, setWindowWidth] = useState(0);

  const menuItems = [
    { name: "Sobre mí", id: "about" },
    { name: "Habilidades", id: "skills" },
    { name: "Certificaciones", id: "certifications", needsOffset: true },
    { name: "Proyectos", id: "projects", needsOffset: true },
    { name: "Contacto", id: "contact", needsOffset: true },
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
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getOffset = (item: typeof menuItems[0]) => {
    if (item.needsOffset) {
      return windowWidth > 839 ? -39 : -60;
    }
    return 0;
  };

  const handleItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar 
      isMenuOpen={isMenuOpen} 
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={true}
    >
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
              offset={getOffset(item)}
              duration={50}
              className={`${
                activeSection === item.id
                  ? "text-accent border-b-2 border-accent"
                  : ""
              } capitalize text-lg font-medium hover:text-accent transition-all cursor-pointer`}
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
              offset={getOffset(item)}
              duration={50}
              onClick={handleItemClick}
              className={`${
                activeSection === item.id
                  ? "text-accent border-b-2 border-accent"
                  : ""
              } w-full justify-end flex cursor-pointer`}
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