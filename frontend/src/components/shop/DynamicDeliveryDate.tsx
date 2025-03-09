import { useEffect, useState } from "react";

const DynamicDeliveryDate = () => {
    const [deliveryDate, setDeliveryDate] = useState("");

    useEffect(() => {
        // Get the current date and add 7 days
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 7);

        // Format the date (e.g., "Sat, Mar 15")
        const formattedDate = currentDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

        setDeliveryDate(formattedDate);
    }, []);

    return (
        <div className="text-gray-500">
            <span>
                Arrives by {deliveryDate}{" "}
            </span>
            <span className="text-blue-500 underline cursor-pointer">Edit Location</span>
        </div>
    );
};

export default DynamicDeliveryDate;
