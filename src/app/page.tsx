import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Works } from "@/components/Works";
import { Clients } from "@/components/Clients";
import { Services } from "@/components/Services";
import { Contacts } from "@/components/Contacts";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Works />
        <Clients />
        <Services />
        <Contacts />
      </main>
    </>
  );
}
