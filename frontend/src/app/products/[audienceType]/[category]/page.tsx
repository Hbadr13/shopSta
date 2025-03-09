"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FiFilter, FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import ProductShopList from "@/components/shop/ProductShopList";
import { getAllProducts } from "@/features/shop/productAction";
import { getfavorites } from "@/features/shop/favorite/favorite.action";
import { useAppDispatch } from "@/redux/redux-hooks";
import { AppDispatch } from "@/redux/store";

export default function ProductPage() {
    const dispatch: AppDispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // const { category, audienceType } = useParams<{
    //     audienceType: string;
    //     category: string;
    // }>();

    const getFiltersFromURL = () => {
        const filtersFromURL: Record<string, string[]> = {
            sizes: searchParams.get("filter.sizes")?.split(".") || [],
            colors: searchParams.get("filter.colors")?.split(".") || [],
            brands: searchParams.get("filter.brands")?.split(".") || [],
            price: [],
        };

        const priceFrom = searchParams.get("filter.price.gte") || "";
        const priceTo = searchParams.get("filter.price.lte") || "";

        return { filtersFromURL, priceRange: { from: priceFrom, to: priceTo } };
    };
    const { filtersFromURL, priceRange: initialPriceRange } = getFiltersFromURL();
    const [filters, setFilters] = useState(filtersFromURL);
    const [priceRange, setPriceRange] = useState(initialPriceRange);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    useEffect(() => {

        //get the params

        // let queryParams = Object.entries(filters)
        //     .filter(([, values]) => values.length > 0)
        //     .map(([key, values]) => `filter.${key}=${values.join(".")}`)
        //     .join("&");

        // if (priceRange.from) queryParams += `&filter.price.gte=${priceRange.from}`;
        // if (priceRange.to) queryParams += `&filter.price.lte=${priceRange.to}`;

        dispatch(getAllProducts());
        dispatch(getfavorites());
    }, [filters, priceRange, dispatch]);

    const handleFilterChange = (category: string, value: string) => {
        setFilters((prev) => {
            const newValues = prev[category].includes(value)
                ? prev[category].filter((v) => v !== value)
                : [...prev[category], value];
            return { ...prev, [category]: newValues };
        });
    };

    const handlePriceChange = (key: "from" | "to", value: string) => {
        setPriceRange((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({ sizes: [], colors: [], brands: [], price: [] });
        setPriceRange({ from: "", to: "" });
        router.push(pathname);
    };

    const handleApplyFilters = () => {
        const searchParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, values]) => {
            if (values.length > 0) {
                searchParams.set(`filter.${key}`, values.join("."));
            }
        });

        if (priceRange.from) {
            searchParams.set("filter.price.gte", priceRange.from);
        }
        if (priceRange.to) {
            searchParams.set("filter.price.lte", priceRange.to);
        }

        router.push(`${pathname}?${searchParams.toString()}`);
        setIsSheetOpen(false);
    };

    const productInfo = addProductFormElements.find(
        (section) => section.name === "productInfo"
    );
    const filtersData = productInfo?.items?.filter((item) =>
        ["sizes", "colors", "brands"].includes(item.name)
    );

    const FiltersComponent = (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FiFilter /> Filters
                </h2>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                    <FiX className="mr-1" /> Clear all
                </Button>
            </div>

            <Accordion type="multiple" className="w-full">
                {filtersData?.map((filter) => (
                    <AccordionItem key={filter.name} value={filter.name}>
                        <AccordionTrigger>{filter.label}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-wrap gap-2 p-2">
                                {filter.options?.map((option) => (
                                    <Button
                                        key={option.id}
                                        variant={
                                            filters[filter.name].includes(option.id)
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() => handleFilterChange(filter.name, option.id)}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <Accordion type="multiple" className="w-full">
                <AccordionItem key="price" value="price">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-gray-500">
                                The highest price is $74.00
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">From $</span>
                                <Input
                                    type="number"
                                    value={priceRange.from}
                                    onChange={(e) => handlePriceChange("from", e.target.value)}
                                    className="w-20"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">To $</span>
                                <Input
                                    type="number"
                                    value={priceRange.to}
                                    onChange={(e) => handlePriceChange("to", e.target.value)}
                                    className="w-20"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button variant="outline" onClick={handleApplyFilters} className="mt-4 hover:bg-slate-100 font-medium duration-200 active:opacity-50 w-full">
                Apply Filters
            </Button>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
            <div className="block lg:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="mb-4 w-full">
                            <FiFilter className="mr-2" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle className="sr-only">Filters</SheetTitle>
                        {FiltersComponent}
                    </SheetContent>
                </Sheet>
            </div>

            <aside className="hidden lg:block col-span-1 border-r p-4">
                {FiltersComponent}
            </aside>

            <main className="col-span-1 md:col-span-3 p-1 md:p-4">
                <h1 className="text-2xl font-bold mb-1">Products</h1>
                <ProductShopList page="filter" />
            </main>
        </div>
    );
}
