import { Card } from "@nextui-org/react";

export default function Footer() {
    return (
        <footer>
                <Card isBlurred className="h-16 flex sm:flex-row items-center justify-center w-full">
                    <p>Copyright © 2024 Leandro Viscolungo, &nbsp;</p><p>hecho con ❤</p>
                </Card>
            </footer>
    )
}