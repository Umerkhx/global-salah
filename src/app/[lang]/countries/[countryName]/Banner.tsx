import Image from "next/image"

interface BannerProps {
  image: string
}

export function Banner({ image }: BannerProps) {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <Image
        src={image || "/banner-countries.webp"}
        alt="Country banner"
        fill
        className="object-cover "
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
    </div>
  )
}