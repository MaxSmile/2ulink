// src/components/HomeAboutSection.jsx
import about from "../data/about.json";
import SectionTitle from "./SectionTitle";

const HomeAboutSection = () => {
    return (
        <section className="pt-20 lg:pt-24 pb-16 lg:pb-32 bg-white" id="home-about">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title="Simple and Fast URL Shortener!"
                    className="lg:hidden"
                />

                <div className="md:grid grid-cols-12 items-center">
                    <div className="col-span-4 sm:text-center md:text-left">
                        <img
                                width={350}
                                height={350}
                                className="rounded-md"
                                src={'/2ul-logo.svg'}
                                alt="2ul.top logo"
                                loading="lazy"
                            />
                    </div>

                    <div className="col-start-6 col-end-13">
                        <div className="bio mt-5 sm:mt-10 md:mt-0">
                            <SectionTitle
                                title="Simple and Fast URL Shortener!"
                                className="hidden lg:block"
                            />

                            <div>
                                <p>{about.name} allows you to shorten long links from Instagram, Facebook, YouTube, Twitter, LinkedIn, WhatsApp, TikTok, blogs, and sites. Just paste the long URL and click the 'Shorten URL and Generate QR Code' button. Instantly receive a shortened URL and a QR code. Copy the shortened URL and share it on websites, in chats, and emails. Track the performance of your links with our simple click counter.</p>
                                <p>Shorten, share, and track your URLs effortlessly. Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant messages, and other locations. Monitor the number of clicks your URLs receive with our built-in analytics. Perfect for businesses and personal use, 2UL.top simplifies your link management and enhances your sharing capabilities.</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
};

export default HomeAboutSection;
