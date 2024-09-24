import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function EventForm({ event, onSubmit, onClose }) {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [note, setNote] = useState(event?.note || "");
  const [location, setLocation] = useState(event?.location || "");
  const [date, setDate] = useState(event?.date || "");
  const [time, setTime] = useState(event?.time || "");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("note", note);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("time", time);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event Description"
      />
      <Input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
      />
      <Input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
      <Input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
        required
        type="date"
      />
      <Input
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time"
        required
        type="time"
      />
      <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <div className="flex justify-between">
        <Button type="submit">{event ? "Update Event" : "Create Event"}</Button>
        <Button type="button" onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default EventForm;
