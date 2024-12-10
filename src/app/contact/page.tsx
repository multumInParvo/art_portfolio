"use client";

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json'
import fr from '../translations/fr.json'

export default function ContactPage() {
    const { language } = useLanguage();
    const translations = language === 'EN' ? en : fr;
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
        <div className="w-full flex flex-col items-center md:pr-16 md:max-w-3xl">
            <div className="w-full flex flex-col justify-between mb-10 gap-2">
                <p className="font-semibold leading-relaxed font-nunito text-sm">
                    {translations.text}
                </p>
                <span>
                    <a
                        href="mailto:oleksandrpryv@gmail.com"
                        className="font-bold font-nunito hover:text-blue-500 dark:hover:text-blue-400 text-sm"
                    >
                        oleksandrpryv@gmail.com
                    </a>
                </span>
            </div>
            <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="font-bold font-nunito text-base">
                        {translations.name}
                    </label>
                    <input
                        className="w-full px-3 py-2 focus:outline-none focus:ring focus:border-sky-200 
                        bg-slate-200 dark:bg-slate-600 
                        text-gray-900 dark:text-gray-100
                        placeholder:text-gray-600 dark:placeholder:text-gray-300"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={focusedInput === 'name' ? '' : translations.name_p_h}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold font-nunito text-base">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 focus:outline-none focus:ring focus:border-sky-200 
                        bg-slate-200 dark:bg-slate-600 
                        text-gray-900 dark:text-gray-100
                        placeholder:text-gray-600 dark:placeholder:text-gray-300"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={focusedInput === 'email' ? '' : translations.email_p_h}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="font-bold font-nunito text-base">
                        Message
                    </label>
                    <textarea
                        className="w-full px-3 py-2 focus:outline-none focus:ring focus:border-sky-200 
                        bg-slate-200 dark:bg-slate-600 
                        text-gray-900 dark:text-gray-100
                        placeholder:text-gray-600 dark:placeholder:text-gray-300 
                        h-32"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={focusedInput === 'message' ? '' : translations.message_p_h}
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
                        {translations.send}
                    </button>
                </div>
                <div className="absolute top-[41vh] left-20 transform -rotate-90 text-gray-200 tracking-widest text-5xl font-bold md:text-9xl whitespace-nowrap pointer-events-none hidden md:block" style={{ width: '200px' }}>
                    contact
                </div>
            </form>
        </div>
    );
};