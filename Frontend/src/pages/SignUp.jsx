import SignUpForm from "../components/SignUpForm.jsx";

function SignUp() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUpForm add={true}/>
    </div>
  );
}

export default SignUp;
