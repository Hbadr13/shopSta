import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
    return (
        <div className="flex flex-col md:flex-row space-y-1 md:space-x-10 max-w-7xl mx-auto">
            <div className="w-full md:w-3/5">
                <div className="sticky top-4">
                    <Skeleton className="w-full h-[500px] md:h-[600px] rounded-lg" />
                </div>
            </div>

            <div className="w-full md:w-2/5 space-y-4">
                <Skeleton className="h-8 w-3/4" />

                <Skeleton className="h-5 w-1/2" />

                <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-6 w-14" />
                    <Skeleton className="h-6 w-14 rounded-md" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-5 w-1/3" />
                    <div className="flex space-x-2">
                        <Skeleton className="h-10 w-16 rounded-md" />
                        <Skeleton className="h-10 w-16 rounded-md" />
                        <Skeleton className="h-10 w-16 rounded-md" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-5 w-1/3" />
                    <div className="flex space-x-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </div>

                <div className="flex items-center space-x-2 border rounded-xl w-max p-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-14 w-full rounded-full" />
                    <Skeleton className="h-14 w-full rounded-full" />
                </div>

                <div className="mt-10 space-y-3">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
