// lib/downloadImages.ts

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import crypto from 'crypto';

const IMAGE_DIR = path.join(process.cwd(), 'public/images'); // Directorio donde guardar las imágenes

if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// Función para generar un hash a partir de la URL
function generateFileName(url: string): string {
  const hash = crypto.createHash('md5').update(url).digest('hex'); // Crea un hash MD5 de la URL
  return `${hash}`; // Retorna solo el hash como nombre de archivo
}

export async function downloadImage(url: string): Promise<string> {
  const cleanFilename = generateFileName(url); // Generar nombre de archivo basado en hash

  // Obtener la extensión correcta
  const ext = path.extname(url.split('?')[0]) || '.jpg'; // Obtener la extensión desde la URL
  const filePath = path.join(IMAGE_DIR, `${cleanFilename}${ext}`); // Guardar con la extensión correcta

  // Verificar si la imagen ya existe
  if (fs.existsSync(filePath)) {
    return `/images/${cleanFilename}${ext}`; // Retorna la URL relativa si ya existe
  }

  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`Error downloading image: ${res.statusText}, URL: ${url}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  
  return `/images/${cleanFilename}${ext}`; // Retorna la URL relativa a la carpeta public
}
