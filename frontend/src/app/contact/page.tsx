"use client";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const contactDetails = [
    {
        icon: <FaMapMarkerAlt className=" w-6 h-6 lg:w-10 lg:h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        text: "Khouribga | Oued Zem",
        description: "Morocco",
    },
    {
        icon: <FaPhoneAlt className=" w-6 h-6 lg:w-10 lg:h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        text: "(+212) 693 768 664",
        description: "(+212) 708 029 985",
    },
    {
        icon: <FaEnvelope className=" w-6 h-6 lg:w-10 lg:h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        text: "hamzabadrbus@gmail.com.com",
        description: "hamza1937badr@gmail.com",
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        message: "",
        agree: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        const checked = type === "checkbox" ? (event.target as HTMLInputElement).checked : undefined;
        setFormData((prev) => ({ ...prev, [name]: checked ?? value }));
    };

    return (
        <div className="">
            {/* Contact Details */}

            <div className=" justify-center max-w-6xl mx-auto  py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2   p-6 rounded-lg duration-300">
                {contactDetails.map((feature, index) => (
                    <div key={index} className="   flex flex-col justify-center items-center  space-x-2 lg:space-y-4 p-4 group  ">
                        <div className=" w-14 lg:w-20 aspect-square rounded-full flex justify-center items-center border bg-white group-hover:bg-store-footer-hover duration-300">
                            {feature.icon}
                        </div>
                        <div className="text-center">
                            <h3 className=" text-medium lg:text-lg font-semibold">{feature.text}</h3>
                            <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-gray-100 py-24 w-full justify-center px-2">

                <div className=" rounded-lg w-full mx-auto max-w-6xl ">
                    <h2 className="text-2xl font-semibold text-center mb-4">Keep in Touch with Us</h2>
                    <form className="space-y-4 ">
                        <div className=" flex flex-col lg:flex-row space-x-0 space-y-5 lg:space-y-0 lg:space-x-10">
                            <div className=" space-y-4">

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md"
                                />
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Your mobile number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md"
                                />
                            </div>
                            <textarea
                                name="message"
                                placeholder="Your message here..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full p-3 border rounded-md"
                            />

                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">
                                    I accept the <a href="#" className="text-blue-500 hover:underline">terms & conditions</a> and understand that my data will be held securely in accordance with the privacy policy.
                                </span>
                            </label>
                            <button
                                type="submit"
                                className=" active:opacity-60 transition-all duration-200 w-max   font-semibold hover:bg-store-footer-hover/10 active:opacity-60 duration-200 text-store-footer-hover border border-store-footer-hover px-7 py-2 rounded-md transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7359.649560406716!2d-6.915118593645208!3d32.882456871733936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sma!4v1741570448069!5m2!1sen!2sma" className="w-full h-full"
                    loading="lazy" ></iframe>
            </div>
        </div>
    );
}
