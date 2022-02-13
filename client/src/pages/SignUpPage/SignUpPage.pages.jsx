import CustomInput from "../../components/CustomInput/CustomInput.components";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import "./SignUpPage.styles.css";
const SignUpPage = ({ onSignup, inputRefs }) => {
  const { emailInputRef, passInputRef, nameInputRef } = inputRefs;
  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    onSignup();
  };
  return (
    <div className="form-container" onSubmit={handleOnFormSubmit}>
      <form>
        <div className="input-container">
          <label>Name</label>
          <CustomInput
            inputRef={nameInputRef}
            placeHolder="Enter Name..."
            required
          />
        </div>
        <div className="input-container">
          <label>Email</label>
          <CustomInput
            inputRef={emailInputRef}
            placeHolder="Enter Email..."
            required
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <CustomInput
            inputRef={passInputRef}
            placeHolder="Enter Password..."
            required
          />
        </div>
        <CustomButton type="submit" text="Signup" />
        <Link className="login" to="/login">
          Already have an account <span className="login-link"> Login </span>
        </Link>
      </form>
    </div>
  );
};
export default SignUpPage;
