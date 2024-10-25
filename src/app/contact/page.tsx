"use client";

import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFocusedInput(e.target.name);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs.sendForm('service_6krahor', 'template_0luic7k', e.target as HTMLFormElement, '5Ys9iuvvGJuA0qfxT')
            .then((result: { text: string }) => {
                console.log(result.text);
                alert('Message Sent Successfully!');
            }, (error: { text: string }) => {
                console.log(error.text);
                alert('Failed to Send Message');
            });

        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="w-ful flex flex-col items-center">
            <div className="w-full flex flex-col justify-between border-b pb-5 mb-5">
                <p className="font-semibold text-gray-700 leading-relaxed">
                    Ask me anything here or send an email<br className="min-[400px]:hidden" /> directly to
                </p>
                <span className="text-blue-600">oleksandrpryv@gmail.com</span>
            </div>
            <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Name</label>
                    <input
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={focusedInput === 'name' ? '' : 'Enter your name'}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={focusedInput === 'email' ? '' : 'Enter your email'}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Message</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={focusedInput === 'message' ? '' : 'Enter your message'}
                        required
                    ></textarea>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};