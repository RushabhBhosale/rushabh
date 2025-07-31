"use client";

import Image from "next/image";

export default function CustomImage({
  src,
  alt,
  width = 800,
  height = 450,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`rounded-xl border shadow ${className}`}
      />
      <p className="text-center text-sm mt-2 text-muted-foreground">{alt}</p>
    </div>
  );
}
