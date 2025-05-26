import { type Metadata } from "next";
import seoData from "@/lib/next-metadata";

export const metadata: Metadata = {
  title: "Data Deletion | " + seoData.title,
  description: "Learn how to delete your data from the PinkDog Resort app and services.",
  openGraph: {
    images: seoData.openGraph.images,
  },
};

export default function DataDeletion() {
  return (
    <main className="bg-[#fff8fa] relative min-h-screen pt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Data <span className="text-[#E73992]">Deletion</span>
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              If you would like to delete your data associated with our app, please follow the instructions below:
            </p>
            
            <div className="mt-8 mb-10 p-6 bg-[#FDF2F8] rounded-xl shadow-sm">
              <ol className="list-decimal pl-5 space-y-3">
                <li className="text-gray-700">
                  Go to your Facebook account&apos;s Settings.
                </li>
                <li className="text-gray-700">
                  Click on <strong className="font-medium">&quot;Apps and Websites&quot;</strong>.
                </li>
                <li className="text-gray-700">
                  Find and select <strong className="font-medium">FlowQuantic</strong> or <strong className="font-medium">PinkDog Resort App</strong>.
                </li>
                <li className="text-gray-700">
                  Click <strong className="font-medium">&quot;Remove&quot;</strong>.
                </li>
                <li className="text-gray-700">
                  This will delete all data shared with our app.
                </li>
              </ol>
            </div>
            
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[#E73992]">
              Need Help?
            </h2>
            
            <p className="text-gray-700 mb-6">
              If you have any questions or concerns about data deletion, please don&apos;t hesitate to reach out to our support team. 
              We&apos;re here to help ensure your data privacy rights are respected.
            </p>
            
            <div className="mt-8 p-6 bg-[#FDF2F8] rounded-xl shadow-sm">
              <p className="font-medium mb-2">
                If you have any questions or concerns, please contact us at:
              </p>
              <p className="flex items-center mt-3">
                <span className="mr-2">📧</span>
                <a href="mailto:pinkdogpetresort@gmail.com" className="text-[#E73992] hover:underline font-medium">
                  pinkdogpetresort@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 