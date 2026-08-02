import { Nav } from "@/components/Nav";
import { CursorTrail } from "@/components/CursorTrail";
import { Hero } from "@/components/Hero";
import { Works } from "@/components/Works";
import { Approach } from "@/components/Approach";
import { Services } from "@/components/Services";
import { Contacts } from "@/components/Contacts";
import { PageLoader } from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CursorTrail />
      <Nav />
      <main>
        <Hero />
        <Works />
        <Approach />
        <Services />
        <Contacts />
      </main>
    </>
  );
}
