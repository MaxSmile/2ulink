// src/components/Navbar.jsx
import navbar from "../data/navbar.json";

const Navbar = ({ className }) => {
    return (
        <nav className={`navbar hidden sm:block ${className ?? ""}`}>
            <ul className="nav flex space-x-10">
                {navbar.map(item => (
                    <li key={item.id}>
                        <a
                            href={item.href}
                            data-hover={item.name.toLowerCase()}
                            className={`block font-medium text-sm relative cursor-pointer after:duration-300 ${navItemHoverStyle}`}
                        >
                            <span className="block duration-300">{item.name}</span>
                        </a>

                    </li>
                ))}
            </ul>
        </nav>
    );
};

const navItemHoverStyle = "after:content-[attr(data-hover)] after:absolute after:left-1/2 after:top-3/4 after:opacity-0 after:-translate-x-1/2 hover:after:top-1/2 hover:after:opacity-100 after:hover:-translate-x-1/2 after:hover:-translate-y-1/2";

export default Navbar;
