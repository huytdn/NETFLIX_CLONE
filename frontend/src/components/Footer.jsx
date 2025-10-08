import React from "react";

const Footer = () => {
  return (
    <footer className=" text-[#737373] md:px-10 px-5 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto py-16 space-y-8">
        {/* gthieu */}
        <div className="space-y-2">
          <p className="text-base font-medium text-gray-400">
            Developed by <span className="text-red-500">HuyTDN</span>
          </p>
          <p className="text-sm leading-relaxed max-w-xl">
            Read about Netflix TV shows and movies and watch bonus videos on{" "}
            <a
              href="https://www.tudum.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-200 transition"
            >
              Tudum.com
            </a>
            .
          </p>
        </div>

        {/* contact */}
        <p className="text-sm text-gray-400">Questions? Contact us.</p>

        {/* list link */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-sm max-w-5xl lg:flex lg:justify-between">
          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">FAQ</li>
            <li className="hover:text-gray-300 cursor-pointer">
              Investor Relations
            </li>
            <li className="hover:text-gray-300 cursor-pointer">Privacy</li>
            <li className="hover:text-gray-300 cursor-pointer">Speed Test</li>
          </ul>

          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">Help Center</li>
            <li className="hover:text-gray-300 cursor-pointer">Jobs</li>
            <li className="hover:text-gray-300 cursor-pointer">
              Cookie Preferences
            </li>
            <li className="hover:text-gray-300 cursor-pointer">
              Legal Notices
            </li>
          </ul>

          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">Account</li>
            <li className="hover:text-gray-300 cursor-pointer">
              Ways to Watch
            </li>
            <li className="hover:text-gray-300 cursor-pointer">
              Corporate Information
            </li>
            <li className="hover:text-gray-300 cursor-pointer">
              Only on Netflix
            </li>
          </ul>

          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">Media Center</li>
            <li className="hover:text-gray-300 cursor-pointer">Terms of Use</li>
            <li className="hover:text-gray-300 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* copyright */}
        <div className="pt-6 border-t border-neutral-800 ">
          <p className="text-xs text-gray-500 text-center">
            © 2025 Netflix Clone by HuyTDN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
