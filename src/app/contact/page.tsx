"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import en from '../translations/en.json';
import fr from '../translations/fr.json';

export default function ContactPage() {
    const { language } = useLanguage();
    const translations = language === 'EN' ? en : fr;

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
        </div>
    );
}
