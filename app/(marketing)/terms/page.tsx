import { type Metadata } from "next";
import seoData from "@/lib/next-metadata";

export const metadata: Metadata = {
  title: "Terms of Service | " + seoData.title,
  description: "Learn about Pink Dog Resort's terms of service and conditions of use.",
  openGraph: {
    images: seoData.openGraph.images,
  },
};

export default function Terms() {
  return (
    <main className="bg-[#fff8fa] relative min-h-screen pt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Terms of <span className="text-[#E73992]">Service</span>
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              These Terms of Service govern your access and use of the Pink Dog Resort website and any services or integrations provided by FlowQuantic.
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[#E73992]">
              1. Use of the Service
            </h2>
            
            <p className="text-gray-700 mb-6">
              By accessing our services, you agree to comply with all applicable laws and not to misuse the platform.
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[#E73992]">
              2. Data Usage
            </h2>
            
            <p className="text-gray-700 mb-6">
              We access only public data provided by Instagram and do not collect, store or share any personal information.
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[#E73992]">
              3. Limitation of Liability
            </h2>
            
            <p className="text-gray-700 mb-6">
              We are not liable for any damages resulting from the use of or inability to use the services or third-party APIs.
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[#E73992]">
              4. Modifications
            </h2>
            
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. Updates will be posted on this page.
            </p>
            
            <div className="mt-12 p-6 bg-[#FDF2F8] rounded-xl shadow-sm">
              <p className="font-medium mb-2">
                <strong>Contact:</strong> <a href="mailto:hello@flowquantic.ai" className="text-[#E73992] hover:underline">hello@flowquantic.ai</a>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Last updated:</strong> May 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 