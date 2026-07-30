import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Works } from "@/components/Works";
import { Services } from "@/components/Services";
import { Contacts } from "@/components/Contacts";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Works />
        <Services />
        <Contacts />
      </main>
    </>
  );
}
