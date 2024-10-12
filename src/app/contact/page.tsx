import React from 'react';
import { Form } from '../components/Form';

export default function ContactPage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-6xl font-extrabold opacity-10 mb-12">Contact</h1>
            <Form />
        </div>
    );
}
