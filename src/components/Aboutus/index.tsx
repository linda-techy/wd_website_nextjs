import React from 'react';
import Link from "next/link";

const AboutUs: React.FC = () => {
    const features = [
        {
            title: "Experience and Expertise",
            content: "As the best construction company in Thrissur, our team of dedicated builders and designers bring their extensive knowledge and skills to every project. With years of experience, we stand proud among the top 10 builders in Thrissur, showcasing a portfolio that spans high-quality Thrissur villas and flats.",
            icon: "🏗️"
        },
        {
            title: "Quality Construction",
            content: "Our reputation as a premier builder in Thrissur is built on the foundation of quality. From using state-of-the-art technology to choosing premium materials, we ensure that every project, be it a luxurious villa or an affordable flat, is an epitome of durability and elegance.",
            icon: "✨"
        },
        {
            title: "Customer-Centric Approach",
            content: "We at Walldot Builders prioritize your vision and preferences. Recognizing the diversity in our client's needs, we offer personalized solutions, whether it's a new house for sale in Thrissur below 20 lakhs or a bespoke Thrissur home designed to your specifications.",
            icon: "👨‍👩‍👧‍👦"
        },
        {
            title: "Transparent Process",
            content: "Transparency is key in all our dealings. We keep you informed throughout the construction process, ensuring a smooth and stress-free journey from the blueprint to the final handover.",
            icon: "🔍"
        }
    ];

    return (
      <section className="bg-gradient-to-b from-white to-gray-50 text-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 space-y-6 sm:space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 md:p-8">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
              At Walldot Builders, we understand that a home is more than just a
              residence; it&apos;s a personal sanctuary, a legacy, and a place where
              memories are made. As one of the top <Link href="/residential-homes" className="text-primary hover:underline font-semibold">construction companies in
              Thrissur</Link>, we are committed to delivering not only homes but also
              value and satisfaction to our clients.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Whether you&apos;re looking for <Link href="/luxury-villa" className="text-primary hover:underline font-semibold">luxury villa construction</Link>, <Link href="/appartment" className="text-primary hover:underline font-semibold">modern apartments</Link>, or <Link href="/office-spaces" className="text-primary hover:underline font-semibold">commercial office spaces</Link>, our experienced team brings your vision to life with precision and care.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 leading-tight">
              Why Choose <span className="text-primary">Walldot</span> Builders?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 hover:border-l-4 hover:border-primary"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{feature.icon}</span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-primary transition-colors leading-snug">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-base md:text-lg text-gray-700 leading-relaxed">{feature.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary rounded-xl p-8 md:p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Ready to Build Your Dream Home?
            </h3>
            <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
              Contact us today to discuss your project and let&apos;s turn your
              vision into reality. Or use our <Link href="/tools/home-cost-calculator" className="underline hover:text-gray-200 font-semibold">free cost calculator</Link> to estimate your construction budget.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contactus" passHref>
                <div className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md cursor-pointer inline-block text-center">
                  Get in Touch
                </div>
              </Link>
              <Link href="/tools/home-cost-calculator" passHref>
                <div className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors shadow-md cursor-pointer inline-block text-center">
                  Cost Calculator
                </div>
              </Link>
              <Link href="/brochure" passHref>
                <div className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors shadow-md cursor-pointer inline-block text-center">
                  Download Brochure
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
};

export default AboutUs;