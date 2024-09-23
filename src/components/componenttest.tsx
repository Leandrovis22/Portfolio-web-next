import React from 'react';

const AspectRatioBox = ({ children, className, justifyClass }) => (
  <div className={`relative w-full h-full ${className}`}>
    <div className="absolute inset-0">
      <div className={`w-full h-full flex items-center ${justifyClass}`}>
        <div 
          className="bg-blue-500 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            maxWidth: 'calc((100vh - 2rem) * 346 / 400)',
            maxHeight: 'calc((100vw - 4rem) * 400 / 346 / 3)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  </div>
);

const ThreeColumnLayout = () => {
  return (
    <div className="h-screen w-full bg-gray-100 p-4">
      <div className="h-full w-full flex gap-4">
        <AspectRatioBox className="flex-1" justifyClass="justify-end">
          <p className="text-white text-center p-4">
            Contenido con relación<br />de aspecto 400:346
          </p>
        </AspectRatioBox>
        <AspectRatioBox className="flex-1" justifyClass="justify-center">
          <p className="text-white text-center p-4">
            Contenido con relación<br />de aspecto 400:346
          </p>
        </AspectRatioBox>
        <AspectRatioBox className="flex-1" justifyClass="justify-start">
          <p className="text-white text-center p-4">
            Contenido con relación<br />de aspecto 400:346
          </p>
        </AspectRatioBox>
      </div>
    </div>
  );
};

export default ThreeColumnLayout;
