import React, { useState } from 'react';
import compromise from 'compromise';

const SpamDetectionForm: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isSpam, setIsSpam] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const doc = compromise(message);
        const hasFewWords = doc.terms.length < 5; // Adjust the threshold as needed

        // Check if message contains any of the spam words
        const spamWords = ['investment', 'spam', 'money', 'hero', 'fuck'];
        const containsSpamWord = spamWords.some(word => message.toLowerCase().includes(word));

        const isSpam = hasFewWords || containsSpamWord; // Consider it as spam if it has few words or contains any spam word

        setIsSpam(isSpam);
    };

    return (
        <div className='w-full flex flex-col py-10'>
            {isSpam && <p className="text-center mb-5">This message appears to be spam.</p>}
            <form onSubmit={handleSubmit} className='flex flex-col w-[400px] m-auto bg-slate-400 p-6'>
                <textarea value={message} onChange={handleInputChange} className='text-black p-3' />
                <button type="submit" className="text-black py-2 mt-4 bg-white w-36 m-auto">Submit</button>
            </form>
        </div>
    );
};

export default SpamDetectionForm;
