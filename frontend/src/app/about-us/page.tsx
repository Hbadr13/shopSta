"use client";

import { Button } from "@/components/ui/button";
import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiMail, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const teamMembers = [
    {
        name: "Hamza Badr",
        role: "Founder & CEO",
        imgSrc: "/hbadr.png",
        email: "hamzabadrbus@gmail.com",
        linkedin: "https://www.linkedin.com/in/hamza-badr",
    },
];

const features = [
    {
        title: "Wide Selection",
        description: "Explore a vast collection of high-quality products tailored to your needs.",
        icon: <FiShoppingCart className="text-4xl text-blue-600 mx-auto" />,
    },
    {
        title: "Customer-Centric",
        description: "We prioritize your satisfaction with exceptional customer service.",
        icon: <FiHeart className="text-4xl text-red-600 mx-auto" />,
    },
    {
        title: "Fast Shipping",
        description: "Enjoy quick and reliable delivery services.",
        icon: <FiTruck className="text-4xl text-green-600 mx-auto" />,
    },
    {
        title: "Secure Payments",
        description: "Shop with confidence using our secure payment options.",
        icon: <FiShield className="text-4xl text-purple-600 mx-auto" />,
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const TeamMemberCard = ({ name, role, imgSrc, email, linkedin }: (typeof teamMembers)[0]) => (
    <motion.div
        variants={fadeInUp}
        className="text-center w-full max-w-xl p-6 bg-white rounded-lg shadow border hover:shadow-lg transition-shadow"
    >
        <Image src={imgSrc} alt={name} width={200} height={200} className="w-48 h-48 rounded-full mx-auto" />
        <h3 className="mt-4 text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{role}</p>
        {(email || linkedin) && (
            <div className="mt-4 flex justify-center space-x-4">
                {email && (
                    <a href={`mailto:${email}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                        <FiMail className="text-2xl" />
                    </a>
                )}
                {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                        <FiLinkedin className="text-2xl" />
                    </a>
                )}
            </div>
        )}
    </motion.div>
);

const FeatureCard = ({ title, description, icon }: (typeof features)[0]) => (
    <motion.div variants={fadeInUp} className="text-center p-6 bg-white rounded-lg shadow hover:shadow transition-shadow">
        {icon}
        <h3 className="mt-4 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
    </motion.div>
);

export default function AboutUsPage() {
    const route = useRouter()
    return (
        <div className="">
            {/* Hero Section */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.8 }}
                className="text-center py-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
            >
                <h1 className="text-4xl font-bold">Welcome to Shopsta</h1>
                <p className="mt-4 text-lg text-gray-600">Your one-stop destination for high-quality products and exceptional customer service.</p>
                <Button onClick={() => route.push('/products/all/best-seller')} className="active:opacity-70 transition-all duration-200 mt-6 bg-black text-white h-12 rounded-full px-8">
                    <FiShoppingCart className="mr-2" /> Shop Now
                </Button>
            </motion.div>

            {/* Our Story */}
            <div className="max-w-7xl mx-auto px-4 py-8">

                <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.8 }} className="mt-16">
                    <h2 className="text-3xl font-bold text-center">Our Story</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }}>
                            <p className="text-gray-600">
                                At Shopsta, we believe in providing our customers with the best shopping experience. Founded in 2023 by Hamza Badr, our mission is to
                                offer high-quality products at affordable prices while maintaining a strong commitment to sustainability and ethical practices.
                            </p>
                            <p className="mt-4 text-gray-600">
                                From humble beginnings as a small online store, we{`'`}ve grown into a trusted name in the e-commerce industry. Our journey has
                                been fueled by a passion for innovation and a dedication to customer satisfaction.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeInUp} transition={{ duration: 0.8, delay: 0.2 }} className="rounded-lg overflow-hidden">
                            <Image src="/man1.png" alt="Our Story" width={600} height={400} className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Our Team */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center">Our Team</h2>
                    <div className="mt-8 flex justify-center">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index} {...member} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-20 border-b"></div>
            {/* Why Choose Us? */}
            <div className="mt-36 lg:mt-44 max-w-[1700px] mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.8 }} className="mt-20 lg:mt-32 text-center py-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h2 className="text-3xl font-bold">Ready to Explore?</h2>
                <p className="mt-4 text-lg text-gray-600">Discover our collection of products and experience the Shopsta difference.</p>
                <Button onClick={() => route.push('/products/all/best-seller')} className="active:opacity-70 transition-all duration-200 mt-6 bg-black text-white h-12 rounded-full px-8">
                    <FiShoppingCart className="mr-2" /> Start Shopping
                </Button>
            </motion.div>
        </div>
    );
}
