import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
import Typewriter from "typewriter-effect";

const Homepage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center pt-20 w-full">
      <section className="flex pt-16 w-full flex-col items-center">
        <h1
          className=" text-5xl lg:text-6xl sm:text-2xl md:text-4xl font-bold flex"
          style={{ fontFamily: "Montserrat" }}
        >
          Search For{" "}
          <span className="ps-5 text-purple-700">
            <Typewriter
              options={{
                strings: ["PDF/ PPT", "Modules", "Tutorials", "Chapters"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </h1>

        <div className="flex pt-5 mt-16 w-2/5 items-center h-36">
          <Input className="h-10" type="text" placeholder="Search" />
          <Button className="ms-2 h-12" type="submit">
            Search
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
