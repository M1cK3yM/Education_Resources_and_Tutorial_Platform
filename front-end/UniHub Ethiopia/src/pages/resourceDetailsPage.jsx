import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaTelegramPlane,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useAuthDialog } from "@/context/AuthDialogContext";
import axios from "axios";
import ResourceCard from "@/components/ResourceCard";

function ResourceDetailsPage() {
  const { resourceId } = useParams();
  const [resource, setResource] = useState(null);
  const [resources, setResources] = useState([]);
  const { isAuthenticated } = useAuth();
  const { toggleLogin } = useAuthDialog();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/resources/${resourceId}`
        );
        const data = await response.json();
        setResource(data);
        const responses = await axios.get(
          "http://localhost:3000/api/resources"
        );
        setResources(responses.data);
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    };

    fetchResource();
  }, [resourceId]);

  if (!resource) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handelDownload = (url) => {
    console.log("Is user Authenticated : ", isAuthenticated());

    if (!isAuthenticated()) {
      toggleLogin();
    } else {
      window.location.href = url;
    }
  };

  const handlePreview = (url) => {
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
      url
    )}`;
    window.open(viewerUrl, "_blank");
  };

  return (
    <div className="text-foreground font-sans">
      <main className="container mx-auto mt-40 px-4 md:px-0">
        <div className="flex justify-around border w-4/5 items-center mx-auto">
          <img
            src={resource.resource}
            alt={resource.title}
            className="w-auto h-[200px] object-cover rounded mr-10"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
            <p className="text-lg mb-4">{resource.description}</p>
            <div className="flex">
              <Button
                onClick={() => handlePreview(resource.resource)}
                className="mr-4"
              >
                Preview
              </Button>
              <Button onClick={() => handelDownload(resource.resource)}>
                Download
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-around my-10">
          <div>
            {resources.map((resource) => (
              <ResourceCard
                key={resource._id}
                title={resource.title}
                description={resource.description}
                resourceUrl={resource.resource}
                size={resource.size}
                coverImage={resource.coverImage}
                numberOfPages={resource.numberOfPages}
                resource={resource}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResourceDetailsPage;
