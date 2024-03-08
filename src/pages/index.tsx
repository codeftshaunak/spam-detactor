import { ToastContainer } from 'react-toastify';
import SpamDetectionForm from "./home";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <ToastContainer />
      <SpamDetectionForm />
    </>
  );
}
