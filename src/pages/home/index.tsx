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
        doc.sentences().toPastTense();
        if (message.length > 0) {
            toast(doc.text());
            setMessage(doc.text())
        } else {
            toast("You can't make empty text to past!!!");
        }
    };

    const convertToFutureTense = () => {
        let doc = nlp(message);
        doc.sentences().toFutureTense();
        if (message.length > 0) {
            toast(doc.text());
            setMessage(doc.text())
        } else {
            toast("You can't make empty text to future!!!");
        }
    };

    const convertToPresentTense = () => {
        let doc = nlp(message);
        doc.sentences().toPresentTense();
        if (message.length > 0) {
            toast(doc.text());
            setMessage(doc.text())
        } else {
            toast("You can't make empty text to present!!!");
        }
    };


    const handleSubmit = () => {
        // Check if past tense message contains any of the spam words
        const spamWords = ['investment', 'spam', 'money', 'hero', 'fuck'];
        const containsSpamWord = spamWords.some(word => message.toLowerCase().includes(word));
        const isSpam = containsSpamWord;

        setIsSpam(isSpam);

        if (isSpam) {
            // Show toast notification directly without using promises
            toast("This message appears to be spam!");
        } if (!isSpam) {
            toast(message);
            setMessage("")
        }
    };

    return (
        <div className='w-full flex flex-col py-10'>
            {isSpam && <p className="text-center mb-5 text-red-400">This message appears to be spam.</p>}
            <p className="text-center mb-5 text-black"></p>
            <div className='flex flex-col w-[500px] m-auto bg-slate-400 p-6 rounded-lg'>
                <textarea value={message} onChange={handleInputChange} className='text-black p-3 rounded-lg' />
                <div className="flex">
                    <button className="text-black py-2 mt-4 bg-white w-36 m-auto rounded-md" onClick={() => convertToPastTense()}>Convert to past</button>
                    <button className="text-black py-2 mt-4 bg-white w-36 m-auto rounded-md" onClick={() => convertToFutureTense()}>Convert to future</button>
                    <button className="text-black py-2 mt-4 bg-white w-36 m-auto rounded-md" onClick={() => convertToPresentTense()}>Convert to present</button>
                </div>
                <button onClick={() => handleSubmit()} className="text-black py-2 mt-4 bg-white w-36 m-auto rounded-md">Submit</button>
            </div>
        </div>
    );
};

export default SpamDetectionForm;
