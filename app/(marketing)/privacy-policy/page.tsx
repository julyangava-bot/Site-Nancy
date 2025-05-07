import { type Metadata } from "next";
import seoData from "@/lib/next-metadata";

export const metadata: Metadata = {
  title: "Privacy Policy | " + seoData.title,
  description: "Learn about Pink Dog Resort's privacy policy and how we protect your personal information.",
  openGraph: {
    images: seoData.openGraph.images,
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#fff8fa] relative min-h-screen pt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Privacy <span className="text-[#E73992]">Policy</span>
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. It is Pink Dog Resort&apos;s policy to respect your privacy 
              regarding any information we may collect on our website.
            </p>
            
            <p className="text-gray-700 mb-6">
              We only ask for personal information when we truly need it to provide a service to you. 
              We collect it by fair and lawful means, with your knowledge and consent.
            </p>
            
            <p className="text-gray-700 mb-6">
              We only retain collected information for as long as necessary to provide you with your 
              requested service. We don&apos;t share any personally identifying information publicly or 
              with third parties, except when required to by law.
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[#E73992]">
              External Sites
            </h2>
            
            <p className="text-gray-700 mb-6">
              Our website may link to external sites that are not operated by us. Please be aware 
              that we have no control over the content and practices of these sites and cannot accept 
              responsibility or liability for their respective privacy policies.
            </p>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[#E73992]">
              Your Rights
            </h2>
            
            <p className="text-gray-700 mb-6">
              You are free to refuse our request for your personal information, with the understanding 
              that we may be unable to provide some of your desired services.
            </p>
            
            <p className="text-gray-700 mb-6">
              Your continued use of our website will be regarded as acceptance of our practices around 
              privacy and personal information. If you have any questions about how we handle user data 
              and personal information, feel free to contact us.
            </p>
            
            <div className="mt-12 p-6 bg-[#FDF2F8] rounded-xl shadow-sm">
              <p className="font-medium mb-2">
                <strong>Contact:</strong> <a href="mailto:info@pinkdogresort.com" className="text-[#E73992] hover:underline">info@pinkdogresort.com</a>
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