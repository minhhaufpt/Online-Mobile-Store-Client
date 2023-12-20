import React, { useEffect, useState } from "react";
import { accountService } from "../../apiServices/accountService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SetProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };
  const [account, setAccount] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const formattedBirthDay = birthDay
    ? new Date(birthDay).toISOString().split("T")[0]
    : "";
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/set-profile",
        {
          userId,
          fullName,
          phoneNumber,
          address,
          birthDay,
          email,
          avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setError(null);
        toast.success("Profile updated successfully");
        console.log("Profile updated successfully:", response.data);
      } else {
        toast.error("Profile update failed");
        setError("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Xử lý lỗi, hiển thị thông báo, vv.
    }
  };

  const fetchAccount = async () => {
    try {
      const data = await accountService(userId);
      setAccount(data);
      if (Object.keys(data).length !== 0) {
        setFullName(data.fullName);
        setAddress(data.address);
        setEmail(data.email);
        setBirthDay(data.birthDay);
        setPhoneNumber(data.phoneNumber);
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    } else {
      fetchAccount();
    }
  }, [userId, navigate]);

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl px-4 mx-auto ">
        <div className="p-8 px-4 bg-white dark:bg-gray-900">
          <div className="grid grid-cols-1 lg:grid-cols-[30%,1fr] gap-6">
            <div className="text-center">
              <h2 className="px-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-300">
                Your Image
              </h2>
              {selectedFile ? (
                <div className="text-center my-5">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: "100%" }}
                      className="m-auto"
                    />
                  )}
                </div>
              ) : (
                <div className="text-center">
                  {" "}
                  <img
                    src={account?.avatar}
                    alt=""
                    className="px-4 dark:text-gray-400 m-auto"
                  />
                </div>
              )}
            </div>
            <div>
              <form onSubmit={handleSubmit} method="post">
                <div className="px-4 mb-6">
                  <label className="block mb-2 text-sm font-medium dark:text-gray-400 text-left">
                    {" "}
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500 dark:border-gray-800 dark:bg-gray-800"
                    type="text"
                    name="fullName"
                    placeholder="Enter a name"
                    value={fullName || ""}
                  />
                </div>
                <div className="flex flex-wrap items-center">
                  <div className="w-full px-4 mb-6 lg:w-2/4">
                    <label className="block mb-2 text-sm font-medium dark:text-gray-400 text-left">
                      {" "}
                      Birthday
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="date"
                        onChange={(e) => setBirthDay(e.target.value)}
                        className="border  rounded text-gray-900 sm:text-sm focus:outline-none dark:text-gray-400 dark:placeholder-gray-500 block w-full pl-10 p-2.5 dark:bg-gray-800 dark:border-gray-800 "
                        name="birthDay"
                        placeholder="Select date"
                        value={birthDay || ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300  text-left"
                    htmlFor="file_input"
                  >
                    Address
                  </label>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500 dark:border-gray-800 dark:bg-gray-800"
                    type="text"
                    name="address"
                    placeholder="Enter a name"
                    value={address || ""}
                  />
                </div>
                <div className="px-4 mb-6">
                  <label className="block mb-2 text-sm font-medium dark:text-gray-400  text-left">
                    {" "}
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500 dark:border-gray-800 dark:bg-gray-800  text-left"
                    type="text"
                    name="email"
                    placeholder="Redirect"
                    value={email || ""}
                  />
                </div>
                <div className="px-4 mb-6">
                  <label className="block mb-2 text-sm font-medium dark:text-gray-400  text-left">
                    {" "}
                    Phone number
                  </label>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500 dark:border-gray-800 dark:bg-gray-800  text-left"
                    type="text"
                    name="phoneNumber"
                    placeholder="Redirect"
                    value={phoneNumber || ""}
                  />
                </div>
                <div className="px-4 mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400  text-left">
                    {" "}
                    Photo
                  </label>
                  <div className="flex items-center mt-1">
                    <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full mx-5">
                      <svg
                        className="w-full h-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                    </span>
                    <div>
                      <input type="file" onChange={handleFileChange} />
                    </div>
                  </div>
                </div>

                <div className="px-4 ">
                  <div className="flex ">
                    <button
                      type="submit"
                      className="inline-block px-6 py-2.5 bg-blue-500  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg "
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetProfile;
