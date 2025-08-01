import { ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SiNike, SiPuma } from "react-icons/si";
import { CgAdidas } from "react-icons/cg";
import wrognLogo from "../../assets/wrogn-brand.png";
import hrxLogo from "../../assets/HRX-brand.jpg";
import levisLogo from "../../assets/levi's-brand.png";

export const ShoppingFooter = () => {
  const navigate = useNavigate();

  const handleFooterNavigation = (menuItem) => {
    sessionStorage.removeItem("filters");

    const menuFilter =
      menuItem.id !== "home" &&
      menuItem.id !== "products" &&
      menuItem.id !== "search"
        ? {
            category: [menuItem.id],
          }
        : {};

    sessionStorage.setItem("filters", JSON.stringify(menuFilter));
    const queryParam =
      menuItem.id !== "home" &&
      menuItem.id !== "products" &&
      menuItem.id !== "search"
        ? `?category=${menuItem.id}`
        : ""; // optional: add ?all=true or something like that

    navigate(`${menuItem.path}${queryParam}`);
    window.scrollTo(0, 0);
  };

  const handleCardNavigation = (currentProduct, section) => {
    sessionStorage.removeItem("filters");
    const homeCardFilter = {
      [section]: [currentProduct.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(homeCardFilter));
    navigate(`/shop/listing`);
    window.scrollTo(0, 0);
  };

  const footerLinks = [
    {
      title: "Category",
      links: [
        {
          id: "home",
          label: "Home",
          path: "/shop/home",
        },
        {
          id: "products",
          label: "Products",
          path: "/shop/listing",
        },
        {
          id: "men",
          label: "Men",
          path: "/shop/listing",
        },
        {
          id: "women",
          label: "Women",
          path: "/shop/listing",
        },
        {
          id: "kids",
          label: "Kids",
          path: "/shop/listing",
        },
        {
          id: "accessories",
          label: "Accessories",
          path: "/shop/listing",
        },
        {
          id: "footwear",
          label: "Footwear",
          path: "/shop/listing",
        },
        {
          id: "search",
          label: "Search",
          path: "/shop/search",
        },
      ],
    },
    {
      title: "Brand",
      links: [
        { id: "nike", label: "Nike", icon: SiNike },
        { id: "adidas", label: "Adidas", icon: CgAdidas },
        { id: "puma", label: "Puma", icon: SiPuma },
        {
          id: "wrogn",
          label: "Wrogn",
          img: wrognLogo,
        },
        {
          id: "hrx",
          label: "HRX",
          img: hrxLogo,
        },
        {
          id: "levis",
          label: "Levi's",
          img: levisLogo,
        },
      ],
    },
    {
      title: "About Us",
      links: [
        { label: "Our Story", path: "/about" },
        { label: "Careers", path: "/careers" },
        { label: "Terms & Conditions", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="h-5 w-5" />,
      path: "https://github.com/AdityaReddy96/Ecommerce.git",
    },
    {
      icon: <FaLinkedin className="h-5 w-5" />,
      path: "https://www.linkedin.com/in/aditya-reddy-66847b314",
    },
    {
      icon: <FaSquareXTwitter className="h-5 w-5" />,
      path: "https://twitter.com",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/shop/home" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-white" />
              <span className="font-bold text-xl">Ecommerce</span>
            </Link>
            <p className="text-gray-400">
              Your one-stop shop for the latest trends and classic styles. We
              offer high-quality products with exceptional customer service.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md text-gray-900 focus:outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-lg">{section.title}</h3>
              {section.title === "Brand" ? (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Label
                        onClick={() => handleCardNavigation(link, "brand")}
                        key={link.id}
                        className="text-sm text-gray-400 hover:text-white cursor-pointer"
                      >
                        {link.label}
                      </Label>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Label
                        onClick={() => handleFooterNavigation(link)}
                        key={link.id}
                        className="text-sm text-gray-400 hover:text-white font-medium cursor-pointer"
                      >
                        {link.label}
                      </Label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <address className="text-gray-400 not-italic space-y-2">
              <p>123 Commerce Street</p>
              <p>Bengaluru, India</p>
              <p>Email: info@ecommerce.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>

            {/* Social media */}
            <div className="mt-10">
              <h4 className="font-medium mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
          </p>
          <p className="mt-2 text-sm">Designed And Developed by AR007</p>
        </div>
      </div>
    </footer>
  );
};
