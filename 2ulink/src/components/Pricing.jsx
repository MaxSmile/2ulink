
import PropTypes from "prop-types";
import { FaCheck, FaTimes } from "react-icons/fa";

const icons = (icon) => {
  const predef = {
    "check": <FaCheck />,
    "times": <FaTimes />,
  };
  return predef[icon] || <FaTimes />;
};

const PricingItem = ({ plan, price, features, className }) => {
  return (
    <div className={`pricing group relative flex flex-col px-5 py-7 rounded-md duration-300 hover:bg-gray-50 ${pricingBefore} ${pricingAfter} ${className ?? ""}`}>
      {/* Plan Title */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg">{plan}</h2>
        <p className="text-2xl font-bold">{price}</p>
      </div>

      {/* Plan Features */}
      <ul className="mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center mb-2">
            {icons(feature.icon)}
            <span className="ml-2">{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* Call to Action */}
      <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">Choose Plan</button>
    </div>
  );
};

const pricingBefore = "before:absolute before:left-10 before:top-9 before:h-[calc(100%-60px)] before:w-[1px] before:bg-gray-300";
const pricingAfter = "after:absolute after:left-9 after:bottom-4 after:h-[10px] after:w-[10px] after:rounded-full after:bg-gray-300";

PricingItem.propTypes = {
  plan: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  className: PropTypes.string,
};


const Pricing = () => {
        const freePlanFeatures = [
          { icon: "check", text: "Basic URL Shortening" },
          { icon: "check", text: "QR Code Generation" },
          { icon: "check", text: "Custom Links" },
          { icon: "check", text: "Simple Click Counter" }
        ];
      
        const premiumPlanFeatures = [
          { icon: "check", text: "No Ads" },
          { icon: "check", text: "Custom Redirection Page" },
          { icon: "check", text: "Bulk URL Shortening" },
          { icon: "check", text: "Custom Analytics" }
        ];
      
        return (
          <div className="pricing-section flex flex-col md:flex-row justify-around items-center my-10">
            <div className="w-full md:w-1/2 p-4">
              <PricingItem plan="Free Plan" price="Free forever" features={freePlanFeatures} className="mb-6" />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <PricingItem plan="Premium Plan" price="$10/month" features={premiumPlanFeatures} />
            </div>
          </div>
        );
      };

export default Pricing;
