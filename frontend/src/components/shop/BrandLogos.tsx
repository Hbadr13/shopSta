import Image from 'next/image';
import React from 'react';

const brands = [
    {
        id: 1,
        logo: "https://erona-demo.myshopify.com/cdn/shop/files/br1_45941d94-d00e-474a-a4b4-9bbc06ad26d6.png?v=1734417319",
        hoverLogo: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-white-1.png?v=1738911385",
        clothImage: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-image-1.jpg?v=1738912616",
        link: "/collections/best-seller",
        alt: "Brand 1"
    },
    {
        id: 2,
        logo: "https://erona-demo.myshopify.com/cdn/shop/files/br2_52e7a260-027b-4779-8318-00516951af45.png?v=1734417319",
        hoverLogo: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-white-2.png?v=1738911400",
        clothImage: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-image-2.jpg?v=1738912616",
        link: "/collections/best-seller",
        alt: "Brand 2"
    },
    {
        id: 3,
        logo: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-black-3.png?v=1738988019",
        hoverLogo: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-white-3.png?v=1738911400",
        clothImage: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-image-3.jpg?v=1738912616",
        link: "/collections/best-seller",
        alt: "Brand 3"
    },
    {
        id: 4,
        logo: "https://erona-demo.myshopify.com/cdn/shop/files/br5_47ecf796-336f-4e3e-a921-aa3aea032017.png?v=1734417319",
        hoverLogo: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-white-4.png?v=1738911400",
        clothImage: "https://erona-demo.myshopify.com/cdn/shop/files/brand-logo-image-4.jpg?v=1738912616",
        link: "/collections/best-seller",
        alt: "Brand 4"
    },
];

const BrandLogos = () => {
    return (
        <div className="  flex justify-center">
            <div className=" scale-75 md:scale-100 brand-logo grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 xs:gap-5 overflow-hidden">
                {brands.map((brand) => (
                    <a
                        href={brand.link}
                        key={brand.id}
                        className="  relative  md:scale-100 group flex justify-center items-center h-[92px] w-[190px] md:h-[120px] md:w-[246px] bg-eco-black-v3/70 rounded-xl overflow-hidden"
                    >
                        <Image width={200} height={200}
                            src={brand.logo}
                            alt={brand.alt}
                            className="transition-opacity duration-300 opacity-100 group-hover:opacity-0 object-contain"
                        />
                        <Image width={200} height={200}
                            src={brand.hoverLogo}
                            alt={`${brand.alt} White Logo`}
                            className="hidden absolute z-10 group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100 object-contain"
                        />
                        <Image width={200} height={200}
                            src={brand.clothImage}
                            alt={`${brand.alt} Clothes`}
                            className="absolute z-0 group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100 object-contain"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};



export default BrandLogos;
