import {
  Button,
  FormItem,
  FormLayout,
  Group,
  Input,
  Panel,
  View,
  ButtonGroup,
} from "@vkontakte/vkui";
import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "components/AuthForm/AuthForm.module.css";
import { Link } from "react-router-dom";
import {
  AuthFormType,
  HandleSubmitType,
  ValidationFieldsEnum,
} from "./AuthForm.interfaces";
import { validateEmail, validatePassword } from "helpers/validations";
import {
  placeholders,
  signInMessages,
  signUpMessages,
  validationMessages,
} from "./AuthForm.consts";
import { Icon24LogoGoogle } from "@vkontakte/icons";
import { ReactComponent as GitHubLogo } from "icons/github-icon.svg";
import { LOGIN_PAGE_URL, SINGUP_PAGE_URL } from "pages/Pages.consts";
import { useAppSelector } from "hooks/redux-hooks";
import { parceAuthFormError } from "./AuthForm.helpers";
import { useDispatch } from 'react-redux';
import { resetAuthStatus } from 'store/slices/userSlice';

interface AuthFormProps {
  formType: AuthFormType;
  handleSubmit: HandleSubmitType;
  handleGoogleLogin?: () => void;
  handleGitHubLogin?: () => void;
}

export const AuthForm: FC<AuthFormProps> = ({
  formType,
  handleSubmit,
  handleGitHubLogin,
  handleGoogleLogin,
}) => {
  const dispatch = useDispatch();
  const messages =
    formType === AuthFormType.LOGIN ? signInMessages : signUpMessages;
  const redirectUrl =
    formType === AuthFormType.LOGIN ? SINGUP_PAGE_URL : LOGIN_PAGE_URL;

  const { loading: userLoading, error: authErrorMessage } = useAppSelector(
    (state) => state.user
  );

  const [emailState, setEmailState] = useState({
    value: "",
    isValid: true,
    errorMessage: "",
  });

  const [passwordState, setPasswordState] = useState({
    value: "",
    isValid: true,
    errorMessage: "",
  });

  useEffect(() => {
    const formErrorField = parceAuthFormError(authErrorMessage);

    if (
      formErrorField &&
      emailState.value !== "" &&
      passwordState.value !== ""
    ) {
      switch (formErrorField.place) {
        case ValidationFieldsEnum.EMAIL:
          setEmailState((prev) => ({
            ...prev,
            isValid: false,
            errorMessage: formErrorField.message,
          }));
          break;
        case ValidationFieldsEnum.PASSWORD:
          setPasswordState((prev) => ({
            ...prev,
            isValid: false,
            errorMessage: formErrorField.message,
          }));
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authErrorMessage]);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!validateEmail(emailState.value)) {
        setEmailState((prev) => ({
          ...prev,
          isValid: false,
          errorMessage:
            emailState.value === ""
              ? validationMessages.emptyEmail
              : validationMessages.invalidEmail,
        }));
        return;
      }

      if (!validatePassword(passwordState.value)) {
        setPasswordState((prev) => ({
          ...prev,
          isValid: false,
          errorMessage:
            passwordState.value === ""
              ? validationMessages.emptyPassword
              : validationMessages.invalidPassword,
        }));
        return;
      }
      handleSubmit(emailState.value, passwordState.value);
    },
    [emailState.value, handleSubmit, passwordState.value]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmailState({
        value: e.target.value.toString(),
        isValid: true,
        errorMessage: "",
      });
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordState({
        value: e.target.value.toString(),
        isValid: true,
        errorMessage: "",
      });
    },
    []
  );

  return (
    <View activePanel={"login"}>
      <Panel id={"login"} centered>
        <Group
          header={<h3 style={{ textAlign: "center" }}>{messages.header}</h3>}
        >
          <FormLayout className={styles.container} onSubmit={handleFormSubmit}>
            <FormItem
              className={styles.formItem}
              id={"email"}
              top={placeholders.emailTop}
              bottom={
                emailState.isValid ? <>&nbsp;</> : emailState.errorMessage
              }
              status={emailState.isValid ? "default" : "error"}
            >
              <Input
                type={"email"}
                name={"email"}
                placeholder={placeholders.emailInput}
                value={emailState.value}
                onChange={handleEmailChange}
              />
            </FormItem>

            <FormItem
              className={styles.formItem}
              id={"password"}
              top={placeholders.passwordTop}
              bottom={
                passwordState.isValid ? <>&nbsp;</> : passwordState.errorMessage
              }
              status={passwordState.isValid ? "default" : "error"}
            >
              <Input
                type={"password"}
                name={"password"}
                placeholder={"Enter password"}
                value={passwordState.value}
                onChange={handlePasswordChange}
              />
            </FormItem>

            <FormItem
              id={"sign-in"}
              bottom={
                formType === AuthFormType.LOGIN && (
                  <div className={styles.loginOrSeparator}>
                    <span className={styles.loginOrText}>
                      {signInMessages.separatorText}
                    </span>
                  </div>
                )
              }
            >
              <ButtonGroup className={styles.footer}>
                <Button
                  size={"m"}
                  type={"submit"}
                  stretched
                  className={styles.submitButton}
                  loading={userLoading}
                  disabled={
                    userLoading || !emailState.isValid || !passwordState.isValid
                  }
                >
                  {messages.submitButton}
                </Button>
                <span className={styles.singUpText}>
                  {messages.secondaryButtonText}&nbsp;
                  <Link to={redirectUrl}>
                    <Button size={"m"} mode={"link"}>
                      {messages.secondaryButton}
                    </Button>
                  </Link>
                </span>
              </ButtonGroup>
            </FormItem>
  
            {formType === AuthFormType.LOGIN && (
              <FormItem>
                <ButtonGroup mode="vertical" gap="m" stretched>
                  <Button
                    stretched
                    align="center"
                    appearance="neutral"
                    mode="outline"
                    size="m"
                    before={<Icon24LogoGoogle width={20} />}
                    onClick={handleGoogleLogin}
                    disabled={
                      userLoading ||
                      !emailState.isValid ||
                      !passwordState.isValid
                    }
                  >
                    &nbsp; {signInMessages.loginWithGoogle}
                  </Button>
                  <Button
                    stretched
                    align="center"
                    appearance="neutral"
                    mode="outline"
                    size="m"
                    before={<GitHubLogo width={20} />}
                    onClick={handleGitHubLogin}
                    disabled={
                      userLoading ||
                      !emailState.isValid ||
                      !passwordState.isValid
                    }
                  >
                    &nbsp; {signInMessages.loginWithGitGub}
                  </Button>
                </ButtonGroup>
              </FormItem>
            )}
          </FormLayout>
        </Group>
      </Panel>
    </View>
  );
};
