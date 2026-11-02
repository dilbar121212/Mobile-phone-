import React from 'react';

interface SpecimenIllustrationProps {
  specimenKey?: 'monstera' | 'ficus' | 'calathea' | 'strelitzia';
  customImageUrl?: string;
  alt: string;
  className?: string;
}

export const SPECIMEN_SVG_MARKUP: Record<'monstera' | 'ficus' | 'calathea' | 'strelitzia', string> = {
  monstera: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="#F2EDE2"/>
    <circle cx="420" cy="270" r="210" fill="#E6DEC8" opacity="0.65"/>
    <line x1="60" y1="520" x2="740" y2="520" stroke="#C7BFA8" stroke-width="1.5"/>
    <!-- Terracotta Planter -->
    <polygon points="320,410 480,410 455,520 345,520" fill="#9A4B26" stroke="#5C2B14" stroke-width="2"/>
    <rect x="310" y="392" width="180" height="20" rx="3" fill="#AE5932" stroke="#5C2B14" stroke-width="2"/>
    <!-- Stems -->
    <path d="M400,392 Q370,310 290,230" fill="none" stroke="#1E4620" stroke-width="7" stroke-linecap="round"/>
    <path d="M405,392 Q435,280 500,190" fill="none" stroke="#14532D" stroke-width="8" stroke-linecap="round"/>
    <path d="M395,392 Q395,300 390,150" fill="none" stroke="#1B4D2E" stroke-width="6" stroke-linecap="round"/>
    <!-- Left Fenestrated Monstera Leaf -->
    <path d="M290,230 C210,210 175,270 195,330 C210,355 260,360 300,335 C330,315 335,260 290,230 Z" fill="#1B5E3A" stroke="#0F3822" stroke-width="2.5"/>
    <ellipse cx="235" cy="265" rx="18" ry="7" transform="rotate(-25 235 265)" fill="#F2EDE2"/>
    <ellipse cx="255" cy="300" rx="22" ry="8" transform="rotate(-20 255 300)" fill="#F2EDE2"/>
    <path d="M290,230 L220,315" stroke="#4D8B64" stroke-width="2"/>
    <!-- Center Dominant Fenestrated Leaf -->
    <path d="M390,150 C310,95 270,180 315,265 C340,305 385,320 400,310 C425,320 465,295 480,250 C505,170 465,95 390,150 Z" fill="#14532D" stroke="#0B2E19" stroke-width="3"/>
    <ellipse cx="348" cy="185" rx="26" ry="8" transform="rotate(20 348 185)" fill="#E6DEC8"/>
    <ellipse cx="345" cy="225" rx="28" ry="9" transform="rotate(15 345 225)" fill="#E6DEC8"/>
    <ellipse cx="358" cy="265" rx="20" ry="7" transform="rotate(10 358 265)" fill="#E6DEC8"/>
    <ellipse cx="435" cy="185" rx="26" ry="8" transform="rotate(-20 435 185)" fill="#E6DEC8"/>
    <ellipse cx="438" cy="225" rx="28" ry="9" transform="rotate(-15 438 225)" fill="#E6DEC8"/>
    <ellipse cx="425" cy="265" rx="20" ry="7" transform="rotate(-10 425 265)" fill="#E6DEC8"/>
    <line x1="392" y1="150" x2="396" y2="305" stroke="#53946C" stroke-width="3"/>
    <!-- Right Leaf -->
    <path d="M500,190 C575,155 630,220 595,295 C570,340 510,345 480,310 C455,280 460,215 500,190 Z" fill="#236B43" stroke="#0F3822" stroke-width="2.5"/>
    <ellipse cx="550" cy="230" rx="22" ry="7" transform="rotate(25 550 230)" fill="#F2EDE2"/>
    <ellipse cx="535" cy="268" rx="24" ry="8" transform="rotate(20 535 268)" fill="#F2EDE2"/>
    <path d="M500,190 L565,295" stroke="#68A880" stroke-width="2.5"/>
    <text x="65" y="555" font-family="Georgia, serif" font-size="16" font-style="italic" fill="#57534E">Fig. I — Monstera deliciosa (Araceae), Fenestrated Mature Lamina</text>
  </svg>`,

  ficus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="#F4F0E6"/>
    <circle cx="400" cy="260" r="200" fill="#E8E1D1" opacity="0.7"/>
    <line x1="60" y1="520" x2="740" y2="520" stroke="#C7BFA8" stroke-width="1.5"/>
    <!-- Limestone Planter -->
    <polygon points="330,405 470,405 452,520 348,520" fill="#D6CFC0" stroke="#78716C" stroke-width="2"/>
    <line x1="400" y1="405" x2="400" y2="170" stroke="#5C4028" stroke-width="9" stroke-linecap="round"/>
    <!-- Fiddle-shaped panduriform leaves -->
    <path d="M400,290 C330,280 300,240 325,210 C340,192 320,165 280,175 C235,188 220,245 265,280 C290,298 345,320 400,290 Z" fill="#1E5631" stroke="#0F331B" stroke-width="2.5"/>
    <path d="M400,290 L265,220" stroke="#8CC084" stroke-width="2.5"/>
    <path d="M330,255 L310,220 M330,255 L295,265 M360,270 L345,240" stroke="#8CC084" stroke-width="1.5"/>
    <!-- Upper Center Leaf -->
    <path d="M400,210 C350,185 355,145 370,125 C382,108 355,75 400,70 C445,75 418,108 430,125 C445,145 450,185 400,210 Z" fill="#14532D" stroke="#0B2E19" stroke-width="2.5"/>
    <line x1="400" y1="210" x2="400" y2="82" stroke="#A3D99B" stroke-width="2.5"/>
    <path d="M400,170 L372,150 M400,170 L428,150 M400,135 L368,112 M400,135 L432,112" stroke="#A3D99B" stroke-width="1.8"/>
    <!-- Right Panduriform Leaf -->
    <path d="M400,275 C470,265 500,225 475,195 C460,178 480,150 520,160 C565,172 580,230 535,265 C510,285 455,305 400,275 Z" fill="#26633B" stroke="#0F331B" stroke-width="2.5"/>
    <path d="M400,275 L535,205" stroke="#A3D99B" stroke-width="2.5"/>
    <path d="M465,242 L485,208 M465,242 L500,252 M435,257 L452,225" stroke="#A3D99B" stroke-width="1.5"/>
    <text x="65" y="555" font-family="Georgia, serif" font-size="16" font-style="italic" fill="#57534E">Fig. II — Ficus lyrata (Moraceae), Panduriform Prominent Venation</text>
  </svg>`,

  calathea: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="#F1EDE4"/>
    <circle cx="400" cy="275" r="205" fill="#E3DDD0" opacity="0.7"/>
    <line x1="60" y1="520" x2="740" y2="520" stroke="#C7BFA8" stroke-width="1.5"/>
    <!-- Ceramic Bowl Planter -->
    <path d="M310,420 L490,420 Q475,520 440,520 L360,520 Q325,520 310,420 Z" fill="#8C583A" stroke="#4A2E1B" stroke-width="2"/>
    <!-- Broad Orbicular Striated Leaves -->
    <g transform="translate(290, 250) rotate(-22)">
      <ellipse cx="0" cy="0" rx="85" ry="105" fill="#1B5E3A" stroke="#0F3822" stroke-width="2.5"/>
      <path d="M0,-95 L0,95" stroke="#A7D7B8" stroke-width="3"/>
      <path d="M0,-60 Q45,-75 75,-45 M0,-25 Q55,-40 82,-10 M0,15 Q55,0 80,30 M0,50 Q45,35 68,65" fill="none" stroke="#95C9A7" stroke-width="6" stroke-linecap="round"/>
      <path d="M0,-60 Q-45,-75 -75,-45 M0,-25 Q-55,-40 -82,-10 M0,15 Q-55,0 -80,30 M0,50 Q-45,35 -68,65" fill="none" stroke="#95C9A7" stroke-width="6" stroke-linecap="round"/>
    </g>
    <g transform="translate(505, 255) rotate(24)">
      <ellipse cx="0" cy="0" rx="85" ry="105" fill="#216842" stroke="#0F3822" stroke-width="2.5"/>
      <path d="M0,-95 L0,95" stroke="#B5E0C3" stroke-width="3"/>
      <path d="M0,-60 Q45,-75 75,-45 M0,-25 Q55,-40 82,-10 M0,15 Q55,0 80,30 M0,50 Q45,35 68,65" fill="none" stroke="#9FD2B0" stroke-width="6" stroke-linecap="round"/>
      <path d="M0,-60 Q-45,-75 -75,-45 M0,-25 Q-55,-40 -82,-10 M0,15 Q-55,0 -80,30 M0,50 Q-45,35 -68,65" fill="none" stroke="#9FD2B0" stroke-width="6" stroke-linecap="round"/>
    </g>
    <g transform="translate(400, 210)">
      <ellipse cx="0" cy="0" rx="92" ry="115" fill="#14532D" stroke="#0A2916" stroke-width="3"/>
      <path d="M0,-105 L0,105" stroke="#C2E7CE" stroke-width="3.5"/>
      <path d="M0,-70 Q50,-85 80,-50 M0,-30 Q60,-45 88,-12 M0,10 Q60,-5 86,28 M0,50 Q50,35 72,68" fill="none" stroke="#A7D7B8" stroke-width="7" stroke-linecap="round"/>
      <path d="M0,-70 Q-50,-85 -80,-50 M0,-30 Q-60,-45 -88,-12 M0,10 Q-60,-5 -86,28 M0,50 Q-50,35 -72,68" fill="none" stroke="#A7D7B8" stroke-width="7" stroke-linecap="round"/>
    </g>
    <path d="M350,335 L385,420 M400,325 L400,420 M455,340 L415,420" stroke="#2D4F38" stroke-width="6" stroke-linecap="round"/>
    <text x="65" y="555" font-family="Georgia, serif" font-size="16" font-style="italic" fill="#57534E">Fig. III — Goeppertia orbifolia (Marantaceae), Silver-Banded Parallel Venation</text>
  </svg>`,

  strelitzia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="#F3EFE6"/>
    <circle cx="400" cy="265" r="210" fill="#E6DFCF" opacity="0.65"/>
    <line x1="60" y1="520" x2="740" y2="520" stroke="#C7BFA8" stroke-width="1.5"/>
    <!-- Architectural Cylinder Planter -->
    <rect x="340" y="395" width="120" height="125" rx="4" fill="#C9C0B1" stroke="#6B6356" stroke-width="2"/>
    <!-- Stems -->
    <path d="M395,395 Q360,290 265,175" fill="none" stroke="#205735" stroke-width="8" stroke-linecap="round"/>
    <path d="M400,395 Q402,260 400,95" fill="none" stroke="#14532D" stroke-width="9" stroke-linecap="round"/>
    <path d="M405,395 Q445,285 535,170" fill="none" stroke="#205735" stroke-width="8" stroke-linecap="round"/>
    <!-- Left Paddle Leaf -->
    <path d="M335,265 C270,250 215,190 225,135 C235,105 280,120 315,175 C345,220 350,255 335,265 Z" fill="#1F633B" stroke="#0F3822" stroke-width="2.5"/>
    <!-- Center Tall Paddle Leaf -->
    <path d="M400,260 C355,215 352,115 385,68 C400,50 400,50 415,68 C448,115 445,215 400,260 Z" fill="#14532D" stroke="#0A2916" stroke-width="2.5"/>
    <line x1="400" y1="62" x2="400" y2="260" stroke="#74B48B" stroke-width="2.5"/>
    <!-- Right Paddle Leaf -->
    <path d="M465,265 C530,250 585,190 575,135 C565,105 520,120 485,175 C455,220 450,255 465,265 Z" fill="#256E43" stroke="#0F3822" stroke-width="2.5"/>
    <text x="65" y="555" font-family="Georgia, serif" font-size="16" font-style="italic" fill="#57534E">Fig. IV — Strelitzia nicolai (Strelitziaceae), Distichous Oblong Lamina</text>
  </svg>`,
};

export async function renderSpecimenSvgToPngBase64(
  specimenKey: 'monstera' | 'ficus' | 'calathea' | 'strelitzia'
): Promise<{ base64: string; mimeType: string }> {
  const svgString = SPECIMEN_SVG_MARKUP[specimenKey];
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Could not initialize canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0, 800, 600);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL('image/png');
      resolve({
        base64: dataUrl,
        mimeType: 'image/png',
      });
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

export const SpecimenIllustration: React.FC<SpecimenIllustrationProps> = ({
  specimenKey = 'monstera',
  customImageUrl,
  alt,
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false);

  if (customImageUrl && !imgError) {
    return (
      <div className={`relative overflow-hidden bg-[#F2EDE2] ${className}`}>
        <img
          src={customImageUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const svgMarkup = SPECIMEN_SVG_MARKUP[specimenKey] || SPECIMEN_SVG_MARKUP.monstera;
  const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`;

  return (
    <div className={`relative overflow-hidden bg-[#F2EDE2] ${className}`}>
      <img
        src={encodedSvg}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
