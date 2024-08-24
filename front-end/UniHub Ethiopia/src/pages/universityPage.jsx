function UniversityPage() {
  return (
    <div className="pt-16 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="px-4 md:px-0">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Welcome to Our University
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">About the University</h2>
              <p>
                Our university is a leading institution of higher education,
                offering a wide range of academic programs and opportunities for
                personal and professional growth.
              </p>
              <p className="mt-4">
                With a rich history and a commitment to excellence, we strive to
                provide our students with a transformative educational
                experience that prepares them for success in a rapidly changing
                world.
              </p>
            </div>
            <div className="bg-gray-800 shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Academic Programs</h2>
              <ul className="list-disc pl-6">
                <li>Bachelor's Degree Programs</li>
                <li>Master's Degree Programs</li>
                <li>Doctoral Programs</li>
                <li>Certificate Programs</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-800 shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Campus Life</h2>
            <p>
              Our vibrant campus offers a wide range of extracurricular
              activities, student organizations, and recreational facilities to
              enhance the overall university experience.
            </p>
          </div>
          <div className="bg-gray-800 shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Admissions</h2>
            <p>
              We welcome applications from students around the world. Our
              admissions process is designed to identify and select talented
              individuals who have the potential to thrive in our academic
              environment.
            </p>
            <a
              href="/admissions"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
            >
              Learn More About Admissions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityPage;