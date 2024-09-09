// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ResourceCard from "@/components/resourceCard";
// import { generateThumbnail } from "@/utils/pdfUtils";

// const ResourcesPage = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/resources");
//         setResources(response.data);

//         const thumbnailUrl = await generateThumbnail(response.data.resource);
//         setThumbnail(thumbnailUrl);
//         console.log(thumbnailUrl);
//       } catch (err) {
//         setError("Failed to fetch resources");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );

//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div>
//       <div className="relative h-64 md:h-96 lg:h-[500px] shadow-2xl rounded-3xl">
//         <div className="absolute inset-0 flex items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
//           <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
//             Explore Your Favorite Resources
//           </h1>
//         </div>
//       </div>
//       {resources.length === 0 ? (
//         <div className="flex flex-col  items-center justify-center h-screen">
//           <h1 className="text-4xl font-bold mb-4 text-foreground">
//             😔Oops! You Caught us With no Resources
//           </h1>
//           <p className="text-foreground text-2xl">
//             Sorry, we will add new Books Soon or Not .
//           </p>
//           <div className="mt-4 text-center text-lg ">
//             <p className="text-gray-600 mb-6"> You might want to explore:</p>
//             <a href="/" className=" p-2 hover:underline">
//               <Button>Home</Button>
//             </a>
//             <a href="/events" className=" p-2 hover:underline ml-2">
//               <Button>Events</Button>
//             </a>
//             <a href="/contact" className=" p-2 hover:underline ml-2">
//               <Button>Contact </Button>
//             </a>
//           </div>
//         </div>
//       ) : (
//         <div className="mx-40">
//           {resources.map((resource) => (
//             <ResourceCard
//               key={resource._id}
//               title={resource.title}
//               description={resource.description}
//               resourceUrl={resource.resource}
//               size={resource.size}
//               coverImage={thumbnail}
//               numberOfPages={resource.numberOfPages}
//               resource={resource}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResourcesPage;

// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ResourceCard from "@/components/resourceCard";
// import { generateThumbnail } from "@/utils/pdfUtils";

// const ResourcesPage = () => {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/resources");
//         const resourceData = response.data;
//         setResources(resourceData);

//         // Generate thumbnails for each resource
//         const updatedResources = await Promise.all(
//           resourceData.map(async (resource) => {
//             const thumbnailUrl = await generateThumbnail(resource.resource);
//             return { ...resource, thumbnailUrl };
//           })
//         );
//         setResources(updatedResources);
//       } catch (err) {
//         setError("Failed to fetch resources");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );

//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div>
//       <div className="relative h-64 md:h-96 lg:h-[500px] shadow-2xl rounded-3xl">
//         <div className="absolute inset-0 flex items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
//           <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
//             Explore Your Favorite Resources
//           </h1>
//         </div>
//       </div>
//       {resources.length === 0 ? (
//         <div className="flex flex-col  items-center justify-center h-screen">
//           <h1 className="text-4xl font-bold mb-4 text-foreground">
//             😔Oops! You Caught us With no Resources
//           </h1>
//           <p className="text-foreground text-2xl">
//             Sorry, we will add new Books Soon or Not .
//           </p>
//           <div className="mt-4 text-center text-lg ">
//             <p className="text-gray-600 mb-6"> You might want to explore:</p>
//             <a href="/" className=" p-2 hover:underline">
//               <Button>Home</Button>
//             </a>
//             <a href="/events" className=" p-2 hover:underline ml-2">
//               <Button>Events</Button>
//             </a>
//             <a href="/contact" className=" p-2 hover:underline ml-2">
//               <Button>Contact </Button>
//             </a>
//           </div>
//         </div>
//       ) : (
//         <div className="mx-40">
//           {resources.map((resource) => (
//             <ResourceCard
//               key={resource._id}
//               title={resource.title}
//               description={resource.description}
//               resourceUrl={resource.resource}
//               size={resource.size}
//               coverImage={resource.thumbnailUrl} // Use the generated thumbnail
//               numberOfPages={resource.numberOfPages}
//               resource={resource}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResourcesPage;

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import ResourceCard from "@/components/resourceCard";

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/resources");
        const resourceData = response.data;

        setResources(resourceData);
        console.log(resourceData);
      } catch (err) {
        setError("Failed to fetch resources");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div>
      <div className="relative h-64 md:h-96 lg:h-[500px] shadow-2xl rounded-3xl">
        <div className="absolute inset-0 flex items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
            Explore Your Favorite Resources
          </h1>
        </div>
      </div>
      {resources.length === 0 ? (
        <div className="flex flex-col  items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            😔Oops! You Caught us With no Resources
          </h1>
          <p className="text-foreground text-2xl">
            Sorry, we will add new Books Soon or Not .
          </p>
          <div className="mt-4 text-center text-lg ">
            <p className="text-gray-600 mb-6"> You might want to explore:</p>
            <a href="/" className=" p-2 hover:underline">
              <Button>Home</Button>
            </a>
            <a href="/events" className=" p-2 hover:underline ml-2">
              <Button>Events</Button>
            </a>
            <a href="/contact" className=" p-2 hover:underline ml-2">
              <Button>Contact </Button>
            </a>
          </div>
        </div>
      ) : (
        <div className="mx-40">
          {resources.map((resource) => (
            <ResourceCard
              key={resource._id}
              title={resource.title}
              description={resource.description}
              size={resource.size}
              numberOfPages={resource.numberOfPages}
              resource={resource}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
