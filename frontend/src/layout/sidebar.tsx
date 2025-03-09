
import { FiGrid, FiImage, FiList, FiSettings, FiShoppingCart, FiSliders, FiUser, FiUserPlus } from "react-icons/fi";
import { MdOutlineCategory, MdOutlineReportGmailerrorred } from "react-icons/md";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import Link from "next/link";

const sidebarNavigation = [
    {
        id: 0,
        type: "link",
        name: "Dashboard",
        icon: <FiGrid className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "/admin/dashboard",
    },
    {
        id: 1,
        type: "accordion",
        name: "Products",
        icon: <FiShoppingCart className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "",
        children: [
            { id: 11, name: "Product List", slug: "/admin/products/list" },
            { id: 12, name: "Add Product", slug: "/admin/products/add" },
        ],
    },
    {
        id: 2,
        type: "accordion",
        name: "Category",
        icon: <MdOutlineCategory className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "",
        children: [

            { id: 21, name: "Category list", slug: "/admin/category/view" },
            { id: 22, name: "New category", slug: "/admin/category/add" },
        ],
    },
    {
        id: 3,
        type: "accordion",
        name: "Attributes",
        icon: <FiSliders className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "",
        children: [
            { id: 31, name: "Attribute", slug: "/admin/attributes" },
            { id: 32, name: "Add attributes", slug: "/admin/add-attributes" },
        ],
    },
    {
        id: 4,
        type: "accordion",
        name: "Order",
        icon: <FiList className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "",
        children: [
            { id: 41, name: "Order list", slug: "/admin/orders/list" },
            { id: 42, name: "Order detail", slug: "/admin/orders/detail" },
            { id: 43, name: "Order tracking", slug: "/admin/orders/tracking" },
        ],
    },
    {
        id: 5,
        type: "accordion",
        name: "User",
        icon: <FiUser className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "",
        children: [
            { id: 51, name: "All user", slug: "/admin/users/all" },
            { id: 52, name: "Add new user", slug: "/admin/users/add" },
        ],
    },
    {
        id: 6,
        type: "accordion",
        name: "Role",
        icon: <FiUserPlus className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "",
        children: [
            { id: 61, name: "All roles", slug: "/admin/roles/all" },
            { id: 62, name: "Create role", slug: "/admin/roles/create" },
        ],
    },
    {
        id: 7,
        type: "link",
        name: "Gallery",
        icon: <FiImage className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "/admin/gallery",
    },
    {
        id: 8,
        type: "link",
        name: "Report",
        icon: <MdOutlineReportGmailerrorred className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "/admin/report",
    },
    {
        id: 9,
        type: "link",
        name: "Settings",
        icon: <FiSettings className="group-hover:text-eco-blue-v0 duration-200 w-5 h-5" />,
        slug: "/admin/settings",
    },
];


const SidebarComp = () => {
    return (
        <div className="px-4 font-[600]">
            <div className="font-bold text-lg mb-4">Shopsta</div>
            <div className="space-y-3">
                {sidebarNavigation.map((nav) =>
                    nav.type === "link" ? (
                        <Link
                            key={nav.id}
                            href={nav.slug}
                            className="flex items-center space-x-2 p-2  group hover:bg-eco-blue-v3/50 rounded-md"
                        >
                            {nav.icon}
                            <span className="group-hover:text-eco-blue-v0 duration-200">{nav.name}</span>
                        </Link>
                    ) : (
                        <Accordion key={nav.id} type="single" collapsible>
                            <AccordionItem value={nav.name} className='border-0 '>
                                <AccordionTrigger className=" p-2 group hover:bg-eco-blue-v3/50 rounded-md">
                                    <div className="flex items-center justify-start space-x-2">
                                        {nav.icon}
                                        <span className=" group-hover:text-eco-blue-v0 duration-200">{nav.name}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className=''>
                                    {nav.children?.map((child) => (
                                        <div
                                            key={child.id}
                                            className="p-2  group rounded-md"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <VscDebugBreakpointLogUnverified className="text-eco-black-v2/30 w-4 h-4" />
                                                <Link href={child.slug} className="flex-1 group-hover:text-eco-blue-v0 text-eco-black-v1 duration-200 font-semibold">
                                                    {child.name}
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )
                )}
            </div>
        </div>
    );
};

export default SidebarComp;
