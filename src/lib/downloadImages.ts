// src/lib/downloadImages.ts
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import crypto from 'crypto';

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');

// Asegúrate de que el directorio de imágenes exista
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

export async function downloadImage(url: string): Promise<string> {
  const hash = crypto.createHash('md5').update(url).digest('hex');
  const ext = path.extname(url.split('?')[0]) || '.jpg';
  const filename = `${hash}${ext}`;
  const filePath = path.join(IMAGE_DIR, filename);

  if (!fs.existsSync(filePath)) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const buffer = await response.buffer();
    fs.writeFileSync(filePath, buffer);
  }

  return `/images/${filename}`; // Devuelve la ruta relativa a la carpeta public
}