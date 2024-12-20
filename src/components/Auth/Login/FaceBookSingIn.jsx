import { useNavigate, } from 'react-router-dom';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../config/firebase';

const FacebookSignIn = () => {
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      localStorage.setItem('user', JSON.stringify({
        displayName: user.displayName,
        photoURL: user.photoURL
      }));
      console.log(user);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      title="Facebook Sign-In"
      onClick={handleLoginClick}
      type="button"
      className=" flex w-1/2 justify-center rounded px-3 py-1 text-[5px] text-gray-600 font-semibold leading-6 border ring-1 ring-inset ring-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-slate-50"
    >
      <img
        width="26"
        height="26"
        src="https://img.icons8.com/fluency/48/facebook-new.png"
        alt="facebook-new"
        className='mr-1'
      />
      Facebook
    </button>
  );
};

export default FacebookSignIn;
