import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import "./SignUpPage.styles.css";
const SignUpPage = ({ onSignup }) => {
  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    onSignup();
  };
  return (
    <div className="form-container" onSubmit={handleOnFormSubmit}>
      <form>
        <div className="input-container">
          <label>Name</label>
          <CustomInput placeHolder="Enter Name..." required />
        </div>
        <div className="input-container">
          <label>Email</label>
          <CustomInput placeHolder="Enter Email..." required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <CustomInput placeHolder="Enter Password..." required />
        </div>
        <CustomButton type="submit" text="Signup" />
      </form>
    </div>
  );
};
export default SignUpPage;
