import { Card, CardBody } from "@nextui-org/react";

export default function Contact() {

    return (
        <div id="contact" className="h-screen relative">
            <h4 className="pt-8 pb-12 text-accent text-center text-3xl">
                Contacto
            </h4>

            <img src="/map.png" alt="" className="h-1/2"/>
            <Card className="card w-1/3 h-15" style={{ position: "absolute", top: "50%", left: "33%" }}>
                    Contacto
            </Card>
        </div>
    )
}