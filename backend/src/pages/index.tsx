import Image from "next/image";

function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <a href="https://www.netlify.com">
        <Image
          src="/netlify.svg"
          alt="Netlify logo"
          width="500px"
          height="500px"
        />
      </a>
    </div>
  );
}

export default HomePage;
