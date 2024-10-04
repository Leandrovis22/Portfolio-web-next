import { useEffect, useState } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface Props {
  onVerify: (token: string) => void;
}

function ReCaptchaContent({ onVerify }: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const handleReCaptchaVerify = async () => {
      try {
        if (!executeRecaptcha) {
          console.log('executeRecaptcha not available yet');
          return;
        }

        console.log('Executing reCAPTCHA...');
        const token = await executeRecaptcha();
        console.log('Token generated');
        onVerify(token);
      } catch (error) {
        console.error('Error executing reCAPTCHA:', error);
      }
    };

    // Pequeño delay para asegurarnos de que reCAPTCHA esté completamente cargado
    const timeoutId = setTimeout(() => {
      handleReCaptchaVerify();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [executeRecaptcha, onVerify]);

  return null;
}

export default function GoogleReCaptchaWrapper({ onVerify }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable is not set');
    return null;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <ReCaptchaContent onVerify={onVerify} />
    </GoogleReCaptchaProvider>
  );
}