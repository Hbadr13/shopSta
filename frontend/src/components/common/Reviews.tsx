import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

interface Review {
    id: number;
    name: string;
    profileImg: string;
    title: string;
    text: string;
    rating: number;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "John Doe",
        profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
        title: "Amazing product!",
        text: "The quality is outstanding, and it exceeded my expectations.",
        rating: 5,
    },
    {
        id: 2,
        name: "Sarah Smith",
        profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
        title: "Good, but some improvements needed",
        text: "The product works well, but I hope they improve some minor details.",
        rating: 4,
    },
    {
        id: 3,
        name: "Emily Johnson",
        profileImg: "https://randomuser.me/api/portraits/women/3.jpg",
        title: "Highly recommend!",
        text: "Great value for money. I would definitely buy again.",
        rating: 5,
    },
    {
        id: 4,
        name: "Michael Brown",
        profileImg: "https://randomuser.me/api/portraits/men/4.jpg",
        title: "Solid purchase",
        text: "Good quality and meets expectations.",
        rating: 4,
    },
    {
        id: 5,
        name: "Laura Wilson",
        profileImg: "https://randomuser.me/api/portraits/women/5.jpg",
        title: "Perfect for daily use",
        text: "I've been using it every day, and it's really convenient.",
        rating: 5,
    },
    {
        id: 6,
        name: "James Carter",
        profileImg: "https://randomuser.me/api/portraits/men/6.jpg",
        title: "Fantastic experience",
        text: "Customer support was great, and the product works flawlessly.",
        rating: 5,
    },
    {
        id: 7,
        name: "Sophia Martinez",
        profileImg: "https://randomuser.me/api/portraits/women/7.jpg",
        title: "Worth every penny",
        text: "This was a great investment, and I love using it daily!",
        rating: 5,
    },
    {
        id: 8,
        name: "Daniel Thompson",
        profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
        title: "Great but not perfect",
        text: "Very good product, just minor tweaks needed for perfection.",
        rating: 4,
    }
];


const ReviewCard: React.FC<Review> = ({ name, profileImg, title, text, rating }) => {
    return (
        <div className=" p-1 md:p-4 rounded-lg bg-white  flex  space-x-2 md:space-x-4">
            <Image width={100} height={100} src={profileImg} alt={name} className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
            <div>
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-gray-500">{title}</div>
                <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < rating ? "text-yellow-500" : "text-gray-300"} fill={i < rating ? "currentColor" : "none"} />
                    ))}
                </div>
                <div className="text-sm text-gray-700 mt-2">{text}</div>
            </div>
        </div>
    );
};

const Reviews: React.FC = () => {
    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
            ))}
        </div>
    );
};

export default Reviews;
