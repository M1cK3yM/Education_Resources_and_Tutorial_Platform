import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Card } from "@/components/ui/card";
import Typewriter from "typewriter-effect";

const Homepage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <main className="flex min-h-screen flex-col items-center pt-20 w-full">
      <section className="flex mt-10 pt-16 w-full flex-col items-center">
        <h1
          className=" text-6xl font-bold block md:flex"
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
        <form
          onSubmit={handleSubmit}
          className="flex pt-5 mt-8 w-3/4 lg:w-2/5 items-center h-16 min-w-80"
        >
          <Input
            className="h-12"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          />
          <Button className="ms-2 h-12" type="submit">
            Search
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Homepage;
