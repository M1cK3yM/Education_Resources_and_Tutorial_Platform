import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function UniversityForm({ university, onSubmit, onClose }) {
  const [name, setName] = useState(university?.name || "");
  const [description, setDescription] = useState(university?.description || "");
  const [founded, setFounded] = useState(university?.founded || "");
  const [location, setLocation] = useState(university?.location || "");
  const [type, setType] = useState(university?.type || "");
  const [resource, setResource] = useState(university?.resource || "");
  const [logo, setLogo] = useState(university?.logo || "");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("founded", founded);
    formData.append("location", location);
    formData.append("type", type);
    formData.append("resource", resource);
    if (logo) formData.append("logo", logo);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="University name"
        required
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="University Description"
      />
      <Input
        value={founded}
        onChange={(e) => setFounded(e.target.value)}
        placeholder="founded"
      />
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
      <Input
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="type"
        required
        type="type"
      />
      <Input
        value={resource}
        onChange={(e) => setResource(e.target.value)}
        placeholder="resource"
        required
        type="resource"
      />
      <Input
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
        placeholder="logo"
        required
        type="logo"
      />
      {/* <Input type="file" onChange={(e) => setImage(e.target.files[0])} /> */}
      <div className="flex justify-between">
        <Button type="submit">
          {university ? "Update University" : "Create University"}
        </Button>
        <Button type="button" onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default UniversityForm;
