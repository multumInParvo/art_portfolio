"use client";

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

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
        <div className="w-full flex flex-col items-center md:ml-16 md:pr-16 md:max-w-3xl">
            <div className='w-full'>
                <h1 className='text-2xl mb-2 mt-0 font-playfair md:text-3xl md:mb-10 border-b text-gray-800 dark:text-gray-100 dark:border-gray-700'>
                    Contact
                </h1>
            </div>
            
            <div className="w-full flex flex-col justify-between mb-10 gap-2">
                <p className="font-semibold text-gray-700 dark:text-gray-300 leading-relaxed font-nunito">
                    Ask me anything here or send an email<br className="min-[400px]:hidden" /> directly to:
                </p>
                <span>
                    <a
                        href="mailto:oleksandrpryv@gmail.com"
                        className="text-slate-700 dark:text-gray-200 font-bold font-nunito hover:text-blue-500 dark:hover:text-blue-400"
                    >
                        oleksandrpryv@gmail.com
                    </a>
                </span>
            </div>
            <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="font-bold font-playfair text-gray-600 dark:text-gray-300 text-base">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 focus:outline-none focus:ring focus:border-sky-200 
                        bg-slate-100 dark:bg-gray-800 
                        text-gray-900 dark:text-gray-100
                        placeholder:text-gray-600 dark:placeholder:text-gray-400"
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
                    <label className="font-bold font-playfair text-gray-600 dark:text-gray-300 text-base">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 focus:outline-none focus:ring focus:border-sky-200 
                        bg-slate-100 dark:bg-gray-800 
                        text-gray-900 dark:text-gray-100
                        placeholder:text-gray-600 dark:placeholder:text-gray-400"
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
                    <label className="font-bold font-playfair text-gray-600 dark:text-gray-300 text-base">
                        Message
                    </label>
                    <textarea
                        className="w-full px-3 py-2 focus:outline-none focus:ring focus:border-sky-200 
                        bg-slate-100 dark:bg-gray-800 
                        text-gray-900 dark:text-gray-100
                        placeholder:text-gray-600 dark:placeholder:text-gray-400 
                        h-32"
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
                        className="px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white 
                        font-semibold hover:bg-slate-700 dark:hover:bg-slate-600 
                        transition uppercase font-nunito text-xs"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};