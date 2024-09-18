import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotate: -10 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.4,
      duration: 0.8,
      type: "spring",
      stiffness: 60,
      damping: 10,
    },
  }),
};

function AboutPage() {
  return (
    <div className="container mt-10 mx-auto py-16 w-4/5">
      <h1 className="text-4xl font-bold mb-8">About Our Platform</h1>

      {/* Mission Statement */}
      <motion.div
        className="mb-12"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p>
          Our mission is to empower students by providing easy access to
          academic resources, detailed university information, and real-time
          updates on events and news. We strive to make university life more
          manageable and accessible for students across Ethiopia.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Comprehensive Information */}
        <motion.div
          className="bg-transparent shadow-2xl rounded-lg p-6"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="text-2xl font-bold mb-4">
            Comprehensive University Information
          </h2>
          <p className="mb-4">
            Our platform provides an extensive database of universities across
            Ethiopia, offering insights into their academic programs, history,
            campus facilities, and more. Whether you’re a prospective student or
            just curious, you can find everything from campus locations to
            faculty details here.
          </p>
        </motion.div>

        {/* Course Materials and Resources */}
        <motion.div
          className="bg-transparent shadow-2xl rounded-lg p-6"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="text-2xl font-bold mb-4">
            Access to Course Materials and Resources
          </h2>
          <p className="mb-4">
            We offer a central repository where students can easily download and
            access course materials, lecture notes, and other academic
            resources. Stay organized and up-to-date with essential learning
            tools right at your fingertips.
          </p>
        </motion.div>

        {/* Events and News */}
        <motion.div
          className="bg-transparent shadow-2xl rounded-lg p-6"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="text-2xl font-bold mb-4">
            University Events and News
          </h2>
          <p className="mb-4">
            Stay informed about the latest events happening across universities.
            From academic conferences to cultural festivals, we provide
            up-to-date information about what's happening on campuses.
            Additionally, our platform aggregates news from various
            universities, so you never miss important announcements.
          </p>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          className="bg-transparent shadow-2xl rounded-lg p-6"
          custom={5}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="text-2xl font-bold mb-4">Our Vision for the Future</h2>
          <p className="mb-4">
            We envision a future where all students have seamless access to the
            resources they need to succeed academically. By continuously
            expanding our database and features, we aim to become the leading
            platform for students seeking university-related information and
            support.
          </p>
        </motion.div>

        {/* Future Plans */}
        <motion.div
          className="bg-transparent shadow-2xl rounded-lg p-6"
          custom={6}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="text-2xl font-bold mb-4">Future Plans</h2>
          <p className="mb-4">
            Our future updates will include features like study guides,
            peer-to-peer student forums, and collaboration tools. We also aim to
            partner with more universities to ensure that the content on our
            platform remains relevant and beneficial to students.
          </p>
        </motion.div>
      </div>

      {/* Contact Information */}
      <motion.div
        className="mt-12"
        custom={7}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p>
          We value your feedback and are here to support you. If you have any
          questions or suggestions, feel free to reach out to us at{" "}
          <a
            href="mailto:support@universityplatform.com"
            className="text-blue-500"
          >
            support@universityplatform.com
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}

export default AboutPage;
