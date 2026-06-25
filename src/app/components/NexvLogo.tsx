import React from "react";
import Image from "next/image";

interface NexvLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number; // specifies size of the icon portion (default 40)
}

export default function NexvLogo({ className = "", iconOnly = false, size = 175 }: NexvLogoProps) {
  return (
    <div id="nexv-logo-root" className={`flex items-center gap-3 select-none ${className}`}>
      {/* Logo Image */}
      <Image
        src="/logoNexv.png"
        alt="NEXV Logo"
        width={size}
        height={size}
        className="flex-shrink-0"
        />
    </div>
  );
}
