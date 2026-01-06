import React, { useState } from 'react';

const ContactForm = () => {
    const [status, setStatus] = useState("Send Message");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        // This is where you would typically handle form submission,
        // e.g., send data to a serverless function or an email service.
        // For this demo, we'll just simulate a delay.
        setTimeout(() => {
            setStatus("Message Sent!");
            // Reset form fields
            e.target.reset();
            setTimeout(() => setStatus("Send Message"), 3000);
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        className="w-full bg-white/10 border border-white/20 rounded-md py-3 px-4 text-white placeholder-white/50 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all duration-300"
                        placeholder="Jane Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className="w-full bg-white/10 border border-white/20 rounded-md py-3 px-4 text-white placeholder-white/50 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all duration-300"
                        placeholder="jane.doe@example.com"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-md py-3 px-4 text-white placeholder-white/50 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all duration-300"
                    placeholder="I have a project idea..."
                ></textarea>
            </div>
            <div className="text-center">
                 <button 
                    type="submit" 
                    className="bg-brand-primary text-brand-dark font-semibold rounded-full px-8 py-3 text-lg hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status !== 'Send Message'}
                >
                    {status}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
