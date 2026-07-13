import React from 'react';

export const metadata = {
  title: "Information - MatriQ",
  description: "MatriQ company information, policies, and guidelines.",
};

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-paper py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="font-display font-700 text-4xl md:text-5xl tracking-tight text-ink mb-4">
            Platform Information
          </h1>
          <p className="text-lg font-body text-ink/70">
            Everything you need to know about MatriQ, our policies, and how to reach us.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-24">
          
          {/* About Us Section */}
          <section id="about" className="scroll-mt-32">
            <h2 className="font-display font-600 text-2xl text-ink mb-6 pb-4 border-b border-ink/10">
              About Us
            </h2>
            <div className="prose prose-stone max-w-none text-ink/80 font-body space-y-4">
              <p>
                MatriQ is the premier industrial marketplace dedicated to connecting buyers with verified source materials and trusted suppliers globally. Our mission is to streamline industrial procurement through transparency, efficiency, and reliability.
              </p>
              <p>
                Founded by industry experts who experienced the friction of traditional supply chains firsthand, MatriQ leverages modern technology to ensure that every material listed meets strict quality and verification standards.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
