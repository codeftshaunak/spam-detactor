import { ToastContainer } from 'react-toastify';
import SpamDetectionForm from "./home";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <h1 className="text-center mt-36 text-2xl">Spam detector & sentence convertor</h1>
      <ToastContainer />
      <SpamDetectionForm />
    </>
  );
}
