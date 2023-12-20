import React from "react";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import { Element, animateScroll as scroll } from "react-scroll";
import tinh from "../../../static/images/members/tinh.jpg";
import hau from "../../../static/images/members/hau.jpg";
import hoai from "../../../static/images/members/hoai.jpg";
import kiet from "../../../static/images/members/kiet.jpg";
import nam from "../../../static/images/members/nam.jpg";
import chatgpt from "../../../static/images/members/chatgpt.jpg";
const TeamMember = ({ name, position, bio, image }) => (
  <a href="#fbname" className="flex flex-col items-center mb-8">
    <img
      src={image}
      alt={name}
      className="w-32 h-32 object-cover rounded-full mb-4"
    />
    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
      {name}
    </h2>
    <p className="text-sm text-gray-600 dark:text-gray-400">{position}</p>
    <p className="text-gray-700 dark:text-gray-300 mt-2">{bio}</p>
  </a>
);

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Nông Ngọc Hoài",
      position: "Team Leader",
      bio: "Identify and understand user and business requirements. Work with customers to ensure that requirements are correctly and fully understood.",
      image: hoai,
    },
    {
      name: "Trương Văn Tình",
      position: "Developer",
      bio: "Design the system architecture and ensure it meets performance and scalability requirements. Choose appropriate technologies for the project.",
      image: tinh,
    },

    {
      name: "Nguyễn Minh Hậu",
      position: "Developer",
      bio: "Write code based on design and requirements.Perform unit testing to ensure the correctness of the source code.",
      image: hau,
    },
    {
      name: "Lê Anh Kiệt",
      position: "Developer",
      bio: "Create and execute test scripts to ensure software quality. Monitor and report on defects and quality issues.",
      image: kiet,
    },
    {
      name: "Ngô Quốc Nam",
      position: "Developer",
      bio: "Identify business requirements and ensure the product meets the needs. Provide feedback and support during the development process.",
      image: nam,
    },
    {
      name: "CHAT GPT",
      position: "Fullstack Developer",
      bio: "Virtual assistants help get things done",
      image: chatgpt,
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <section className="container mx-auto p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <Parallax
              bgImage="https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg"
              strength={500}
              style={{
                width: "100%",
                height: "400px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="w-full h-full rounded-lg shadow-lg"
                style={{
                  backgroundImage:
                    "url(https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Parallax>
          </div>
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              Welcome to <br />{" "}
              <span className="text-blue-500">ONLINE MOBILE STORE</span>
            </h1>
            <p className="text-lg leading-7 text-gray-700 dark:text-gray-300">
              At Online Mobile Store, we take pride in being the leading online
              shopping destination for tech enthusiasts and mobile lovers. With
              a diverse catalog, top-notch quality, and excellent customer
              service, we commit to providing a unique and engaging shopping
              experience for our customers.
            </p>
            <p className="text-lg leading-7 text-gray-700 dark:text-gray-300 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex items-center mt-6">
              <Link
                to="/products"
                className="inline-block px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 mr-4"
              >
                Explore Products
              </Link>
              <a
                href="#contactus"
                className="inline-block px-6 py-3 text-gray-800 border border-gray-800 rounded-md hover:text-white hover:bg-gray-800 dark:hover:bg-gray-700"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div id="contactus" className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
