import Link from "next/link";
import { Logo } from "./logo";
import { IconBrandInstagram, IconBrandFacebook } from "@tabler/icons-react";

export function Footer() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Info", href: "#checkin-info" },
    { name: "About", href: "#about-us" },
    { name: "Blog", href: "/blog" },
  ];

  const legal = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: "Data Deletion", href: "/data-deletion" },
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex items-start flex-col">
            <Logo />
            <p className="text-gray-600 mt-4 max-w-md">
              Premier pet care services for your furry friends.
            </p>
            <div className="mt-6 space-y-3">
              <Link
                href="https://instagram.com/pinkdogspa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-[#E73992] transition-colors"
              >
                <IconBrandInstagram size={24} className="mr-2" />
                @pinkdogspa
              </Link>
              <Link
                href="https://facebook.com/pinkdogresort"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-[#3b5998] transition-colors"
              >
                <IconBrandFacebook size={24} className="mr-2" />
                @pinkdogspa
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800">Navigation</h3>
              <ul className="space-y-3">
                {navigation.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-[#E73992] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800">Legal</h3>
              <ul className="space-y-3">
                {legal.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-[#E73992] transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Pink Dog Resort. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              href="https://petquantic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E73992] text-sm transition-colors"
            >
              Powered by PetQuantic
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
