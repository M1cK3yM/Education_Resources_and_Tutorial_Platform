// function NewsPage() {
//   return (
//     <div className="pt-16">
//       <h1>News</h1>
//     </div>
//   );
// }

// export default NewsPage;


import NewsCard from "../components/NewsCard";

function NewsPage() {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px]"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/3b/56/76/3b5676f14eb784319baeec29ef0c30d9.jpg')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            News and Updates
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Stay informed with the latest news and updates
          </p>
        </div>
      </div>

      <NewsCard
        title="Breaking News:"
        date="August 15, 2024"
        description=""
        imageUrl="/src/assets/images/nasa-Q1p7bh3SHj8-unsplash.jpg"
        detailsUrl="/news/1"
      />
      <NewsCard
        title="The University of Gondar offers an astonishing academic undergraduate and postgraduate programs in different subject’s areas."
        date="August 10, 2024"
        description=""
        imageUrl="/src/assets/images/clark-van-der-beken-9siFVc3Xxss-unsplash.jpg"
        detailsUrl="/news/2"
      />
      <NewsCard
        title=""
        date="August 5, 2024"
        description=""
        imageUrl="/src/assets/images/national-cancer-institute-eTHgLgK0Mzw-unsplash.jpg"
        detailsUrl="/news/3"
      />
    </div>
  );
}

export default NewsPage;