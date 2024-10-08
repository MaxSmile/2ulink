// src/components/Feature.jsx

const Feature = ({ title, desc, className }) => {
    return (
        <div className={`service group relative flex px-3 py-5 rounded-md duration-300 hover:bg-gray-50  ${className ?? ""}`}>

            <div>
                <h2 className="font-semibold text-base mb-3">{title}</h2>
                <p>{desc}</p>
            </div>
        </div>
    );
};


export default Feature;
