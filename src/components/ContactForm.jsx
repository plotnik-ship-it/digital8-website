import React, { useState } from 'react';

const ContactForm = () => {
    const [status, setStatus] = useState('Send Message');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        
        const { name, email, message } = e.target.elements;
        
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    message: message.value,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('Message Sent!');
                e.target.reset(); // Clear the form on success
                setTimeout(() => setStatus('Send Message'), 5000);
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('Error. Try Again.');
            setTimeout(() => setStatus('Send Message'), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
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
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
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
                    className="w-full bg-white/10 border border-white/20 rounded-md py-3 px-4 text-white placeholder-white/50 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all duration-300 min-h-[120px]"
                    placeholder="I have a project idea..."
                ></textarea>
            </div>
            <div className="text-center mt-8">
                 <button 
                    type="submit" 
                    className="bg-brand-primary text-brand-dark font-semibold rounded-full px-8 py-3 text-lg hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status !== 'Send Message' && status !== 'Error. Try Again.'}
                >
                    {status}
                </button>
            </div>
            <div className="text-center mt-6">
                <p className="text-sm text-white/60">
                    Or email us directly at <a href="mailto:daniel@digital8.ca" className="underline hover:text-brand-primary transition-colors">daniel@digital8.ca</a>
                </p>
            </div>
        </form>
    );
};

export default ContactForm;
