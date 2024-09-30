import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import Pages from ".";
import { userApi } from "../api";
import { requestHandler } from "../utils/requestHandler";
import { useState, useEffect } from "react";
import { Loader } from "rsuite";
import { BASE_URL } from "@/api/config";

export default function Component() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        await requestHandler(
          () => userApi.getUserById(userId),
          setLoading,
          (data) => setUser(data),
          (error) => setError(error),
        );
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <Loader size="md" center />;
  }

  if (error || !user) {
    return <Pages.NotFoundPage />;
  }

  console.log(user);

  return (
    <div className="w-full max-w-4xl pt-20 mx-auto">
      <div className="bg-muted rounded-t-lg p-6 md:p-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 md:h-20 md:w-20 object-cover">
            <AvatarImage
              src={user.profile}
              alt={user.name}
            />
            <AvatarFallback>{user.name.toUpperCase()[0]}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </div>
      <Tabs defaultValue="about" className="border-b">
        <TabsList className="flex">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <div className="grid gap-4 p-4 md:p-6">
            <div>
              <h3 className="text-lg font-medium">About Me</h3>
              <p>
                I am a passionate software engineer with a strong background in
                full-stack development. I have experience working on a variety
                of projects, from small web applications to large-scale
                enterprise systems.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Skills</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>JavaScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>SQL</li>
                <li>Git</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="experience">
          <div className="grid gap-4 p-4 md:p-6">
            <div>
              <h3 className="text-lg font-medium">Work Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Software Engineer</h4>
                  <p className="text-muted-foreground">
                    Acme Inc. - 2019 to present
                  </p>
                  <p>
                    Developed and maintained various web applications using
                    React, Node.js, and SQL. Collaborated with cross-functional
                    teams to deliver high-quality software solutions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Intern</h4>
                  <p className="text-muted-foreground">
                    Widgets Inc. - Summer 2018
                  </p>
                  <p>
                    Gained experience in full-stack development, working on a
                    project that involved building a web application using React
                    and Node.js.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="projects">
          <div className="grid gap-4 p-4 md:p-6">
            <div>
              <h3 className="text-lg font-medium">Personal Projects</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Todo App</h4>
                  <p>
                    Developed a simple todo application using React and local
                    storage. Implemented features such as creating, updating,
                    and deleting tasks.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Weather App</h4>
                  <p>
                    Built a weather application that fetches data from a public
                    API and displays the current weather and forecast for a
                    user's location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
