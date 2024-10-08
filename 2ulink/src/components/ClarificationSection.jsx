// /src/components/Clarification.jsx
import SectionTitle from "./SectionTitle";
import about from "../data/about.json";

const ClarificationSection = () => {
    return (
        <section className="py-24" id="clarification">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
                    <div>
                        <SectionTitle
                            title={`Why choose a free short URL with ${about.name}?`}
                            className="mb-4"
                        />
                        <div className="font-medium space-y-2">
                            <p className="not-italic">
                                Shortening URLs is a convenient way to make long and unwieldy links easy to share and manage. By using {about.name}, you can transform lengthy URLs into concise, shareable links that are perfect for social media, emails, and other communication channels.
                            </p>
                            <p>
                                Whether you're sharing links on social media, in an email, or on printed materials, short URLs make the process seamless and efficient. Use short URLs to:
                            </p>
                            <ul className="list-disc ml-5">
                                <li>Hide referral links while tracking clicks.</li>
                                <li>Shorten URLs with many parameters from Google Maps, social networks, and Amazon.</li>
                                <li>Manage and share event links from platforms like Eventbrite.</li>
                                <li>Condense affiliate links for easier sharing.</li>
                                <li>Transform long URLs for app deep links.</li>
                            </ul>
                            <p>
                                Best of all, {about.name} offers this service for free, ensuring that everyone has access to essential URL shortening tools even without an account.
                            </p>
                        </div>
                    </div>

                    <div>
                        <SectionTitle
                            title="Advantages of creating an account with us"
                            className="mb-4"
                        />
                        <div className="font-medium space-y-2">
                            <p className="not-italic">
                                Creating an account on {about.name} unlocks additional features that enhance your URL shortening experience. With an account, you can:
                            </p>
                            <ul className="list-disc ml-5">
                                <li>Create custom names for your short URLs, making them more memorable and brand-specific.</li>
                                <li>Edit your short links after they have been created, ensuring that your links remain relevant and functional over time.</li>
                                <li>Access detailed click counters and analytics for your short URLs. This data helps you understand how your links are performing, where the traffic is coming from, and how users are engaging with your content.</li>
                            </ul>
                            <p>
                                While anonymous creation of short URLs is supported and works perfectly for simple needs, an account offers enhanced control and customization for users who require more advanced features.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClarificationSection;
