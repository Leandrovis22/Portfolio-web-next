import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { IoIosMail } from 'react-icons/io';

interface EmailCopyButtonProps {
  emailId: string;
}

const EmailCopyButton: React.FC<EmailCopyButtonProps> = ({ emailId }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    fetchEmail();
  }, [emailId]);

  const fetchEmail = async () => {
    try {
      const response = await fetch(`/api/get-email?id=${emailId}`);
      const data = await response.json();
      setEmail(data.email);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const EmailSVG = () => (
    <svg width="200" height="30" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="15" fill="currentColor" fontSize="14">
        {email.split('').map((char, index) => (
          <tspan key={index} dx={index ? "0.8em" : "0"}>
            {char}
          </tspan>
        ))}
      </text>
    </svg>
  );

  return (
    <Button
      radius='full'
      aria-label='Correo'
      variant="ghost"
      size="lg"
      className="size-[5rem] flex items-center gap-2 w-fit min-w-[60px] min-h-[60px]"
      onClick={handleCopy}
    >
      <div className="size-[2.6rem] items-center content-center justify-center flex"><IoIosMail className="size-[2.4rem]" /></div>{copied ? '¡Copiado!' : <EmailSVG />}
    </Button>
  );
};

export default EmailCopyButton;