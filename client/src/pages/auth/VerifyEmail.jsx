import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const checkVerification = async () => {
    await auth.currentUser.reload();

    if (auth.currentUser.emailVerified) {
      alert("Email verified successfully!");
      navigate("/");
    } else {
      alert("Still not verified. Please check your email.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 shadow-lg rounded w-80 text-center">
        <h2 className="text-lg font-bold mb-3">
          Verify Your Email
        </h2>

        <p className="mb-3 text-sm">
          We sent a verification link to your email.
          Please check inbox or spam folder.
        </p>

        <button
          onClick={checkVerification}
          className="bg-blue-500 text-white p-2 w-full"
        >
          I have verified
        </button>
      </div>
    </div>
  );
}