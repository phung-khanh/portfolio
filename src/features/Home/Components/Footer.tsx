import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900  border-gray-800 text-gray-400">
      <div className="max-w-8xl mx-auto py-3 px-2 sm:px-2 lg:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Brand & Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-sm">
              © {new Date().getFullYear()} Phung Khanh. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a
              href="https://www.facebook.com/im.hnahk/"
              className="hover:text-white transition"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://github.com/phung-khanh"
              className="hover:text-white transition"
            >
              <FaGithub className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
