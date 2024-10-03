import React, { useCallback, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// css
import LoginNextButton from "./LoginNextButton";
import LoginBackButton from "./LoginBackButton";
import LoginTitleAndLogo from "./LoginTitleAndLogo";
import LoginScanId from "./LoginScanId";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginAuth, loginStatus, validError } from "../../services/loginApi";
import { systemAddLogs } from "../../services/logsApi";

function LoginPage() {
  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [userId, setUserId] = useState();
  const [validationMessage, setValidationMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [inputUserId, setInputUserId] = useState("");
  const [rfidCodeInput, setRfidCodeInput] = useState("");
  const [focusImage, setFocusImage] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const ScanInputRef = useRef(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
    setFocus,
    setError,
  } = useForm();

  useEffect(() => {
    setValue("userIdInput", inputUserId || "");
    setValue("userpasswordInput", passwordInput || "");
  }, [setValue]);

  const handleLoginCredentials = async () => {
    const { userIdInput, userpasswordInput } = getValues();
    console.log(`${userIdInput}, ${userpasswordInput} `);

    try {
      const response = await loginAuth({
        user_name: userIdInput,
        user_pass: userpasswordInput,
      });

      if (response.length === 1) {
        await systemAddLogs({
          logs_type: `Account Login`,
          logs_desc: `System account login by ${userIdInput}`,
          logs_performBy: userIdInput,
        });
        const responseStatus = await loginStatus();
        sessionStorage.setItem("token", JSON.stringify(responseStatus));
      }

      navigate("/dashboard");
      return response;
    } catch (error) {
      console.log(validError.errorType);
      if (validError.errorType === "user_name") {
        setError("userIdInput", {
          type: "manual",
          message: validError.errorMessage,
        });
      } else if (validError.errorType === "user_pass") {
        setError("userpasswordInput", {
          type: "manual",
          message: validError.errorMessage,
        });
      }
    }
  };

  const handleFocus = () => {
    setRfidCodeInput("");
    ScanInputRef.current?.focus();
  };

  const handleImageClick = () => {
    setFocusImage(true);
    setRfidCodeInput("");
    if (ScanInputRef) {
      ScanInputRef.current.focus();
    }
  };

  const handleNextClick = () => {
    setPopupVisible(true);
    setFocus("userIdInput");
    setRfidCodeInput("");
    setIsError(false);
  };

  const handleClosePopup = useCallback(() => {
    setPopupVisible(false);
    setRfidCodeInput("");
  }, []);

  // const toastShown = useRef(false);

  // useEffect(() => {

  //   if (isTimeExpired) {
  //     toastShown.current = true;
  //   } else {
  //     return null;
  //   }
  // }, []);

  return (
    <div
      onClick={handleFocus}
      className="bg-main-background h-screen justify-center font-inter font-semibold items-center flex flex-col space-y-8"
    >
      {/* <Toaster /> */}
      <LoginTitleAndLogo handleNextClick={handleNextClick} />
      {isPopupVisible ? (
        <>
          <LoginBackButton handleClosePopup={handleClosePopup} />
          <LoginScanId
            focusImage={focusImage}
            setFocusImage={setFocusImage}
            handleImageClick={handleImageClick}
            ScanInputRef={ScanInputRef}
            handleLoginCredentials={handleLoginCredentials}
            register={register}
            rfidCodeInput={rfidCodeInput}
            setRfidCodeInput={setRfidCodeInput}
            isError={isError}
            validationMessage={validationMessage}
          />
        </>
      ) : (
        <>
          <LoginNextButton
            passwordInput={passwordInput}
            handleLoginCredentials={handleLoginCredentials}
            validationMessage={validationMessage}
            handleSubmit={handleSubmit}
            register={register}
            userId={userId}
            handleNextClick={handleNextClick}
            errors={errors}
          />
        </>
      )}
    </div>
  );
}

export default LoginPage;
