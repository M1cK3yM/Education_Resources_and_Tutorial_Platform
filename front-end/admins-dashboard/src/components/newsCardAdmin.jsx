const NewsCardAdmin = ({ title, date, note, imageUrl, children }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={imageUrl}
        alt={title}
        className="h-40 w-full object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-4">{title}</h2>
      <p className="text-gray-500">{date}</p>
      {/* <p className="text-gray-700">{note}</p> */}
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default NewsCardAdmin;
