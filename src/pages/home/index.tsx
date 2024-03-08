// import React, { useState } from 'react';
// import compromise from 'compromise';
// import { toast } from 'react-toastify';

// const SpamDetectionForm: React.FC = () => {
//     const [message, setMessage] = useState('');
//     const [isSpam, setIsSpam] = useState(false);

//     const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setMessage(event.target.value);
//     };

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const doc = compromise(message);

//         const spamWords = ['investment', 'spam', 'money', 'hero', 'fuck'];
//         const containsSpamWord = spamWords.some(word => message.toLowerCase().includes(word));
//         const isSpam = containsSpamWord; setIsSpam(isSpam);

//         if (isSpam) {
//             // Show toast notification
//             toast("This message appears to be spam!");
//         }
//     };

//     return (
//         <div className='w-full flex flex-col py-10'>
//             <form onSubmit={handleSubmit} className='flex flex-col w-[400px] m-auto bg-slate-400 p-6 rounded'>
//                 <textarea value={message} onChange={handleInputChange} className='text-black p-3 rounded' />
//                 <button type="submit" className="text-black py-2 mt-4 bg-white w-36 m-auto">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default SpamDetectionForm;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import nlp from 'compromise';

const SpamDetectionForm: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isSpam, setIsSpam] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const convertToPastTense = () => {
        let doc = nlp(message);
        doc.verbs().toPastTense();
        if (message.length > 0) {
            toast(doc.text());
            setMessage("")
        } else {
            toast("You can't make empty text to past!!!");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Check if past tense message contains any of the spam words
        const spamWords = ['investment', 'spam', 'money', 'hero', 'fuck'];
        const containsSpamWord = spamWords.some(word => message.toLowerCase().includes(word));
        const isSpam = containsSpamWord;

        setIsSpam(isSpam);

        if (isSpam) {
            // Show toast notification directly without using promises
            toast("This message appears to be spam!");
        }
    };

    return (
        <div className='w-full flex flex-col py-10'>
            {isSpam && <p className="text-center mb-5">This message appears to be spam.</p>}
            <form onSubmit={handleSubmit} className='flex flex-col w-[400px] m-auto bg-slate-400 p-6'>
                <textarea value={message} onChange={handleInputChange} className='text-black p-3' />
                <button className="text-black py-2 mt-4 bg-white w-36 m-auto rounded-md" onClick={() => convertToPastTense()}>Convert to past</button>
                <button className="text-black py-2 mt-4 bg-white w-36 m-auto rounded-md" onClick={() => convertToPastTense()}>Convert to future</button>
                <button className="text-black py-2 mt-4 bg-white w-36 m-auto rounded-md" onClick={() => convertToPastTense()}>Convert to present</button>
                <button type="submit" className="text-black py-2 mt-4 bg-white w-36 m-auto rounded-md">Submit</button>
            </form>
        </div>
    );
};

export default SpamDetectionForm;
