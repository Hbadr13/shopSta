import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/redux-hooks";

const features = [
    {
        icon: <FiMail className="w-10 h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        title: "hamzabadrbus@gmail.com",
        href: "mailto:hamzabadrbus@gmail.com",
    },
    {
        icon: <FiPhoneCall className="w-10 h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        title: "+212 693 768664",
        href: "tel:+212693768664",
    },
    {
        icon: <FiMapPin className="w-10 h-10 text-store-footer-hover group-hover:text-white duration-300" />,
        title: "Khouribga, Morocco",
        href: "https://www.google.com/maps?q=Khouribga,Morocco",
    },
];

const links = [
    {
        title: "Information",
        items: [
            { name: "About us", href: "/about-us" },
            { name: "Contact us", href: "/contact" },
            { name: "FAQs", href: "/faqs" },
            { name: "Privacy policy", href: "/privacy-policy" },
        ],
    },
    {
        title: "My Account",
        items: [
            { name: "My account", href: "/account" },
            { name: "My address", href: "/account/addresses" },
            { name: "My wishlist", href: "/account/wishlist" },
            { name: "Order history", href: "/orders" },
        ],
    },
];

const Contact = () => (
    <div className="justify-items-center w-full px-10 sm:px-0">
        <div className="overflow-hidden w-full sm:w-auto py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 p-2 md:p-6 rounded-lg duration-300">
            {features.map((feature, index) => (
                <Link href={feature.href} key={index} className="flex flex-col items-center space-y-4 p-4 group rounded-xl">
                    <div className="w-16 md:w-20 aspect-square rounded-full flex justify-center items-center border bg-white group-hover:bg-store-footer-hover duration-300">
                        {feature.icon}
                    </div>
                    <h3 className="text-sm md:text-lg font-semibold w-max">{feature.title}</h3>
                </Link>
            ))}
        </div>
    </div>
);

const Footer = () => {
    const { windowWidth } = useAppSelector((state) => state.windowPropsSlice)
    const pathname = usePathname()
    if (pathname.startsWith('/auth') && windowWidth > 1024)
        return
    return (
        <footer className="bg-store-gray-100 overflow-hidden">
            <div className="py-10 px-4 md:px-6 xl:px-16 mt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-8 ">
                    <div>
                        <div>
                            <span className="text-3xl font-bold">Shop</span>
                            <span className="text-3xl font-bold text-store-footer-hover">Sta</span>
                        </div>
                        <p className="mt-2 text-gray-400">
                            ShopSta offers a wide range of quality products at great prices, with fast delivery and excellent customer service.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <FaFacebook className="text-xl hover:text-blue-500 cursor-pointer" />
                            <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
                            <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
                            <FaLinkedin className="text-xl hover:text-blue-600 cursor-pointer" />
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-2 gap-4">
                        {links.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-store-footer-hover text-xl">{section.title}</h3>
                                <ul className="text-gray-400 mt-2 space-y-1">
                                    {section.items.map((item, idx) => (
                                        <li key={idx}>
                                            <Link href={item.href} className="hover:text-store-footer-hover duration-300">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-store-footer-hover text-xl">Join Newsletter</h3>
                        <p className="text-gray-400 mt-2">
                            Subscribe to get special offers, free gifts, and once-in-a-lifetime deals!
                        </p>
                        <div className="flex mt-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className=" w-20 p-3 outline-none flex-grow border text-black"
                            />
                            <button className="active:opacity-60 transition-all bg-store-footer-hover text-white px-4 py-2 rounded-r-md hover:bg-store-secondary duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Contact />
            <div className="text-center text-gray-500 py-6 text-sm border-t">
                &copy; {new Date().getFullYear()} ShopSta. All rights reserved.
            </div>
        </footer>
    );
}
export default Footer;
