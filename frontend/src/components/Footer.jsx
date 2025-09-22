import { Globe, MessageSquare, Users } from "lucide-react";

export default function Footer() {
  return (
    // add mt-auto so footer is pushed to bottom inside a flex-col parent
    <footer className="w-full bg-black text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        
        {/* Navigation Links */}
        <div className="flex space-x-8 text-sm font-medium mb-4 md:mb-0">
          <a href="#company" className="hover:text-gray-400">Company</a>
          <a href="#resources" className="hover:text-gray-400">Resources</a>
          <a href="#legal" className="hover:text-gray-400">Legal</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <Globe className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <MessageSquare className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <Users className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
