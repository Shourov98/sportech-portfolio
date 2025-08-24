{
  /* Marquee row: WHITE cards in a seamless loop
            <div
              className={`relative ${
                startMarquee ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              <div className="mt-0 h-[140px] sm:h-[160px] lg:h-[180px] overflow-hidden">
                <div className="marquee-mask pointer-events-none absolute inset-y-0 left-0 right-0" />
                <div className="marquee-track flex w-[200%] gap-4 sm:gap-6">
                  {marqueeLogos.map((p, idx) => (
                    <div
                      key={`${p.name || p}-${idx}`}
                      className="relative h-[140px] sm:h-[160px] lg:h-[180px] w-[220px] sm:w-[260px] lg:w-[280px] shrink-0 rounded-2xl bg-white ring-1 ring-black/10 shadow-sm"
                    >
                      <Image
                        src={p.src || `/partners/${p}`}
                        alt={p.name || p}
                        fill
                        className="object-contain p-6 mix-blend-normal"
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, 220px"
                        priority={idx < 6}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div> */
}
