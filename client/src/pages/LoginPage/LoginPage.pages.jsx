import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import "./LoginPage.styles.css";
const LoginPage = ({ inputRefs, onLogin }) => {
  const { emailInputRef, passInputRef } = inputRefs;
  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };
  return (
    <div className="form-container" onSubmit={handleOnFormSubmit}>
      <form>
        <div className="input-container">
          <label>Email</label>
          <CustomInput
            placeHolder="Enter Email..."
            required
            inputRef={emailInputRef}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <CustomInput
            placeHolder="Enter Password..."
            required
            inputRef={passInputRef}
          />
        </div>
        <CustomButton type="submit" text="Login" />
      </form>
    </div>
  );
};
export default LoginPage;
