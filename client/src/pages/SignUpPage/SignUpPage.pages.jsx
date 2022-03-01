import CustomInput from "../../components/CustomInput/CustomInput.components";
import { Link, useHistory } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import "./SignUpPage.styles.css";
const SignUpPage = ({ onSignup, inputRefs }) => {
  const { emailInputRef, passInputRef, nameInputRef } = inputRefs;
  const history = useHistory();
  const handleOnFormSubmit = async (e) => {
    try {
      e.preventDefault();
      await onSignup();
      history.push("/");
    } catch (e) {
      console.log(e);
    }
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
            type="password"
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
