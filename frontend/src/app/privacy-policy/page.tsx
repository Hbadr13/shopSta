const privacyPolicyContent = [
    {
        heading: "Introduction",
        content:
            "Welcome to Shopsta! We value your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and safeguard your information when you use our platform.",
    },
    {
        heading: "Information We Collect",
        content:
            "We may collect personal information such as your name, email address, shipping address, and payment details when you register an account or make a purchase on our platform. We also collect non-personal data such as your IP address and browsing behavior to improve our services.",
    },
    {
        heading: "How We Use Your Information",
        content:
            "We use your information to process orders, provide customer support, and personalize your shopping experience. We may also use your data for marketing purposes, such as sending promotional emails or offers, but you can opt-out of these communications at any time.",
    },
    {
        heading: "Data Sharing and Disclosure",
        content:
            "We do not sell, rent, or share your personal information with third parties except as necessary to fulfill your orders or comply with legal obligations. We may share data with trusted partners such as payment processors and shipping companies to provide services related to your order.",
    },
    {
        heading: "Cookies and Tracking Technologies",
        content:
            "We use cookies and other tracking technologies to improve your experience on our platform. Cookies are small files stored on your device that help us remember your preferences and provide personalized content. You can control cookie settings through your browser preferences.",
    },
    {
        heading: "Security",
        content:
            "We take the security of your personal data seriously and implement appropriate technical and organizational measures to protect it. However, no method of data transmission over the internet is completely secure, so we cannot guarantee absolute security.",
    },
    {
        heading: "Your Rights",
        content:
            "You have the right to access, update, or delete your personal information. If you wish to exercise any of these rights, please contact us at support@shopsta.com.",
    },
    {
        heading: "Changes to This Privacy Policy",
        content:
            "We may update this privacy policy from time to time. Any changes will be posted on this page, and the date of the most recent update will be noted at the bottom.",
    },
    {
        heading: "Contact Us",
        content:
            "If you have any questions or concerns about our privacy policy or data practices, please contact us at support@shopsta.com.",
    },
];

const PrivacyPolicyPage = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-semibold text-center mb-8">Privacy Policy</h1>

            <div className="space-y-2 divide-y">
                {privacyPolicyContent.map((section, index) => (
                    <div key={index} className="  py-4">
                        <h2 className=" text-xl md:text-2xl font-semibold">{section.heading}</h2>
                        <p className="text-gray-700">{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
