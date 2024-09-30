import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function NewsForm({ news, onSubmit, onClose }) {
  const [title, setTitle] = useState(news?.title || "");
  const [content, setContent] = useState(news?.content || "");
  const [author, setAuthor] = useState(news?.author || "");
  const [status, setStatus] = useState(news?.status || "");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("status", status);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="News Title"
        required
      />
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="News content"
      />
      <Input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="author"
      />
      <Input
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="status"
        required
      />
      <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <div className="flex justify-between">
        <Button type="submit">{news ? "Update News" : "Create News"}</Button>
        <Button type="button" onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default NewsForm;
