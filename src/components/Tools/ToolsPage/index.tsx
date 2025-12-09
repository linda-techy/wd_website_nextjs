import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools | Walldot Builders",
};

const tools = [
  {
    id: 1,
    title: "Home Cost Estimator",
    description: "Get an instant estimate for your dream home construction",
    icon: "🏠",
    path: "/tools/home-cost-calculator",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    id: 2,
    title: "AI Interior Designer 360",
    description: "Generate a 360° interior concept tailored to your rooms",
    icon: "🛋️",
    path: "/tools/ai-interior-designer-360",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
  }
  // {
  //   id: 2,
  //   title: "Interior Cost Estimator",
  //   description: "Calculate your interior decoration and finishing costs",
  //   icon: "🛋️",
  //   path: "/tools/interior-cost-estimator",
  //   bgColor: "bg-purple-50",
  //   hoverColor: "hover:bg-purple-100",
  // },
  // {
  //   id: 3,
  //   title: "Loan Calculator",
  //   description: "Plan your home loan EMIs and payment schedule",
  //   icon: "💰",
  //   path: "/tools/loan-calculator",
  //   bgColor: "bg-green-50",
  //   hoverColor: "hover:bg-green-100",
  // },
  // {
  //   id: 4,
  //   title: "Material Calculator",
  //   description: "Estimate required construction materials for your project",
  //   icon: "🧱",
  //   path: "/tools/material-calculator",
  //   bgColor: "bg-amber-50",
  //   hoverColor: "hover:bg-amber-100",
  // },
];

const ToolsPage = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-5 py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-7 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.path}
              className={`${tool.bgColor} dark:bg-gray-800 ${tool.hoverColor} dark:hover:bg-gray-700 rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-gray-200 dark:border-gray-700 group`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl md:text-6xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 leading-snug">
                  {tool.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{tool.description}</p>
                <div className="mt-auto w-full">
                  <button className="px-6 py-3 md:px-8 md:py-4 bg-primary text-white rounded-xl hover:bg-dark transition-colors duration-300 text-base md:text-lg font-bold w-full">
                    Try Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight px-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl md:text-3xl font-bold">1</span>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 text-gray-900 dark:text-white leading-snug">Select Tool</h3>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Choose from our specialized construction calculators
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl md:text-3xl font-bold">2</span>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 text-gray-900 dark:text-white leading-snug">Enter Details</h3>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Fill in your project specifications and requirements
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl md:text-3xl font-bold">3</span>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 text-gray-900 dark:text-white leading-snug">Get Results</h3>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Receive instant estimates tailored to your project
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsPage;