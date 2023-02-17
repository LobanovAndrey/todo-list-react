import { Button, FormItem, FormLayout, Group, Header, Input, Panel, View, ButtonGroup } from '@vkontakte/vkui';
import React, { FC, useCallback, useRef, useState } from 'react'
import styles from 'components/AuthForm/AuthForm.module.css';
import { Link } from 'react-router-dom';
import { AuthFormType, HandleSubmitType } from './AuthForm.interfaces';
import { validateEmail, validatePassword } from 'helpers/validations';
import { placeholders, signInMessages, signUpMessages, validationMessages } from './AuthForm.consts';
import { Icon24LogoGoogle } from '@vkontakte/icons';
import {ReactComponent as GitHubLogo} from 'icons/github-icon.svg';
import { LOGIN_PAGE_URL, SINGUP_PAGE_URL } from 'pages/Pages.consts';
import { useAppSelector } from 'hooks/redux-hooks';

interface AuthFormProps {
  formType: AuthFormType;
  handleSubmit: HandleSubmitType;
  handleGoogleLogin?: () => void;
  handleGitHubLogin?: () => void;
};

export const AuthForm: FC<AuthFormProps> = ({
  formType,
  handleSubmit,
  handleGitHubLogin,
  handleGoogleLogin,
}) => {
  const messages = formType === AuthFormType.LOGIN ? signInMessages : signUpMessages;
  const redirectUrl = formType === AuthFormType.LOGIN ? SINGUP_PAGE_URL : LOGIN_PAGE_URL;

  const { loading } = useAppSelector(state => state.user);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const validationMessageRef = useRef<string>('');

  const handleFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      email === '' 
        ? validationMessageRef.current = validationMessages.emptyEmail
        : validationMessageRef.current = validationMessages.incorrectEmail;
      return;
    }
    if (!validatePassword(password) || password === '') {
      setIsPasswordValid(false);
      password === '' 
        ? validationMessageRef.current = validationMessages.emptyPassword
        : validationMessageRef.current = validationMessages.invalidPassword;
      return;
    }
    handleSubmit(email, password);
  }, [email, password, handleSubmit]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.toString());
    setIsEmailValid(true);
  }, [])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.toString());
    setIsPasswordValid(true);
  }, []);

  return (
    <View activePanel={"login"}>
      <Panel
        id={"login"}
        centered
      >
        <Group 
          header={
            <Header mode="tertiary">
              {messages.header}
            </Header>
          }
        >
          <FormLayout
            className={styles.container} 
            onSubmit={handleFormSubmit}
          >
            <FormItem
              className={styles.formItem}
              id={"email"}
              top={placeholders.emailTop}
              bottom={isEmailValid ? <>&nbsp;</> : validationMessageRef.current}
              status={isEmailValid ? 'default' : 'error'}
            >
              <Input
                type={"email"}
                name={"email"}
                placeholder={placeholders.emailInput}
                value={email}
                onChange={handleEmailChange}
              />
            </FormItem>

            <FormItem
              className={styles.formItem}
              id={"password"}
              top={placeholders.passwordTop}
              bottom={isPasswordValid ? <>&nbsp;</> : validationMessageRef.current}
              status={isPasswordValid  ? 'default' : 'error'}
            >
              <Input
                type={"password"}
                name={"password"}
                placeholder={"Enter password"}
                value={password}
                onChange={handlePasswordChange}
              />
            </FormItem>

            <FormItem
              id={"sign-in"}
              bottom={formType === AuthFormType.LOGIN && 
                <Header
                  style={{justifyContent: 'center'}}
                  mode="secondary"
                >
                  OR
                </Header>
              }
            >
              <ButtonGroup className={styles.footer} >
                <Button
                  size={"m"}
                  type={"submit"}
                  className={styles.submitButton}
                  loading={loading}
                >
                  {messages.submitButton}
                </Button>
                <Link to={redirectUrl}>
                  <Button 
                    size={"m"}
                    mode={"link"}
                    loading={loading}
                  >
                    {messages.secondaryButton}
                  </Button>
                </Link>
              </ButtonGroup>
            </FormItem>

            {formType === AuthFormType.LOGIN && 
              <FormItem
                > 
                  <ButtonGroup
                    mode='vertical'
                    gap='m'
                    stretched
                  >
                    <Button
                      stretched
                      align='center'
                      appearance='neutral'
                      mode='outline'
                      size='m'
                      before={
                        <Icon24LogoGoogle width={20} />
                      }
                      onClick={handleGoogleLogin}
                      loading={loading}
                    >
                      &nbsp; Login with Google
                    </Button>
                    <Button
                      stretched
                      align='center'
                      appearance='neutral'
                      mode='outline'
                      size='m'
                      before={
                        <GitHubLogo width={20} />
                      }
                      onClick={handleGitHubLogin}
                      loading={loading}
                    >
                      &nbsp; Login with GitHub
                    </Button>
                  </ButtonGroup>
              </FormItem>
            }
          </FormLayout>
        </Group>
      </Panel>
    </View>
  );
};