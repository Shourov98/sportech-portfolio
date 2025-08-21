"use client";
import HeroBackground from "./HeroBackground";

export default function HeroSection() {
  return (
    <>
      <section
        className="relative overflow-hidden pt-24 lg:pt-28 pb-24 min-h-[720px]"
        aria-label="Hero"
      >
        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-[860px]">
            <h1
              style={{
                position: "absolute",
                width: 1173,
                height: 150,
                left: 118,
                top: -100,
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: 64,
                lineHeight: "75px",
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
              Technology Serving Sports Innovative
              <br />
              Solutions and Exceptional Experiences
            </h1>

            <p
              style={{
                position: "absolute",
                width: 1104,
                height: 156,
                left: 153,
                top: 93,
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: 26,
                lineHeight: "150%",
                color: "#FFFFFF",
              }}
            >
              Welcome to Sportech, a leading company in delivering advanced
              digital solutions to the sports industry. We develop innovative
              platforms that enhance fan experiences, streamline club
              operations, and unlock new opportunities for sports investment
              through cutting-edge technologies.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: "16px 32px",
                gap: 12,
                position: "absolute",
                width: 274,
                height: 56,
                left: 151,
                top: 281,
                background: "#EDF900",
                borderRadius: 12,
              }}
            >
              <a
                href="#services"
                style={{
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: "22px",
                  color: "#000000",
                  textDecoration: "none",
                }}
              >
                Services & Solutions <span aria-hidden>»»</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <HeroBackground />
    </>
  );
}
