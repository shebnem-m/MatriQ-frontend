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

          {/* Careers Section */}
          <section id="careers" className="scroll-mt-32">
            <h2 className="font-display font-600 text-2xl text-ink mb-6 pb-4 border-b border-ink/10">
              Careers
            </h2>
            <div className="prose prose-stone max-w-none text-ink/80 font-body space-y-4">
              <p>
                Join our mission to revolutionize the global supply chain. We are always looking for passionate engineers, industry experts, and sales professionals to join our growing team.
              </p>
              <p>
                While we do not have any open positions right now, please send your resume and a brief introduction to <strong>careers@matriq.test</strong> and we will keep you in mind for future opportunities.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-mt-32">
            <h2 className="font-display font-600 text-2xl text-ink mb-6 pb-4 border-b border-ink/10">
              Contact Us
            </h2>
            <div className="prose prose-stone max-w-none text-ink/80 font-body space-y-4">
              <p>
                Have a question or need support? Our team is here to help. You can reach us through the following channels:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>General Support:</strong> support@matriq.test</li>
                <li><strong>Sales Inquiries:</strong> sales@matriq.test</li>
                <li><strong>Phone:</strong> +1 (555) 123-4567 (Mon-Fri, 9am - 5pm EST)</li>
                <li><strong>Headquarters:</strong> 100 Industrial Way, Tech District, Innovation City 10101</li>
              </ul>
            </div>
          </section>

          {/* Legal: Terms of Service */}
          <section id="terms" className="scroll-mt-32">
            <h2 className="font-display font-600 text-2xl text-ink mb-6 pb-4 border-b border-ink/10">
              Terms of Service
            </h2>
            <div className="prose prose-stone max-w-none text-ink/80 font-body space-y-4">
              <p>
                By accessing and using the MatriQ platform, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement.
              </p>
              <p>
                We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should review these page periodically. When we change the Terms in a material manner, we will notify you that material changes have been made to these Terms.
              </p>
            </div>
          </section>

          {/* Legal: Privacy Policy */}
          <section id="privacy" className="scroll-mt-32">
            <h2 className="font-display font-600 text-2xl text-ink mb-6 pb-4 border-b border-ink/10">
              Privacy Policy
            </h2>
            <div className="prose prose-stone max-w-none text-ink/80 font-body space-y-4">
              <p>
                Your privacy is critically important to us. At MatriQ, we have a few fundamental principles:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We are thoughtful about the personal information we ask you to provide and the personal information that we collect about you through the operation of our services.</li>
                <li>We store personal information for only as long as we have a reason to keep it.</li>
                <li>We aim for full transparency on how we gather, use, and share your personal information.</li>
              </ul>
            </div>
          </section>

          {/* Legal: Verification Guidelines */}
          <section id="guidelines" className="scroll-mt-32">
            <h2 className="font-display font-600 text-2xl text-ink mb-6 pb-4 border-b border-ink/10">
              Verification Guidelines
            </h2>
            <div className="prose prose-stone max-w-none text-ink/80 font-body space-y-4">
              <p>
                To maintain the integrity of our marketplace, all suppliers and materials undergo a strict verification process. This includes verifying business licenses, material certifications, and conducting regular audits of manufacturing processes.
              </p>
              <p>
                Suppliers found violating these guidelines may be subject to account suspension or permanent removal from the MatriQ platform.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
