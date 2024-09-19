import { Card } from "@nextui-org/react";

export default function Footer() {
    return (
        <footer>
                <Card isBlurred className="h-16 flex sm:flex-row items-center justify-center w-full">
                    <p>© 2024 Leandro Viscolungo todos los derechos reservados,&nbsp;</p><p>hecho con ❤</p>
                </Card>
            </footer>
    )
}