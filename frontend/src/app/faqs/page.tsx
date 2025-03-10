import React from "react";

const faqData = [
    {
        question: "What is Shopsta?",
        answer:
            "Shopsta is an eCommerce platform that allows you to browse and purchase a variety of products from different categories, all in one place.",
    },
    {
        question: "How do I place an order?",
        answer:
            "Simply browse our products, select the items you wish to purchase, and click 'Add to Cart.' When you're ready, head to checkout to complete your order.",
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "We accept major credit cards, PayPal, and other secure payment options. You can choose your preferred method during the checkout process.",
    },
    {
        question: "Can I change my order after placing it?",
        answer:
            "Once an order is placed, it is processed quickly, so we're unable to make changes to the order. However, if you need to make changes, please contact our support team as soon as possible.",
    },
    {
        question: "How can I track my order?",
        answer:
            "After placing your order, you will receive a tracking number via email. You can use this number to track your order's status on the shipping provider's website.",
    },
    {
        question: "What is your return policy?",
        answer:
            "We offer a 30-day return policy on most items. If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange.",
    },
    {
        question: "How can I contact customer support?",
        answer:
            "You can reach our customer support team by visiting the 'Contact Us' page on our website or by emailing support@shopsta.com.",
    },
];

const FAQPage = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-semibold text-center mb-8">Frequently Asked Questions</h1>

            <div className="space-y-2 divide-y">
                {faqData.map((faq, index) => (
                    <div key={index} className="py-4">
                        <h2 className=" text-xl md:text-2xl font-semibold">{faq.question}</h2>
                        <p className="text-gray-700">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQPage;
