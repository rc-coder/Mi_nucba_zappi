import styled from 'styled-components';
import {
  CustomButton,
  FormContent,
  FormStyled,
  Input,
  LayoutPage,
  Wrapper,
} from '../components/UI';
import useForm from '../hooks/useForm';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../Utils';
import GoogleLogo from '../assets/google_icon.svg';
import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from '../firebase/firebaseUtils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { nucbazapiRed } from '../Styles/utilities';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const GoogleButton = styled(CustomButton)`
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(130deg, #ff9259 0%, #ff2426 70%);
`;

const GoogleIcon = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const Alink = styled.a`
  color: ${nucbazapiRed};
  margin-left: 5px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Login = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, InputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  if (currentUser) {
    navigate(-1);
  }

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          email: {
            value: '',
            isValid: false,
          },
          password: {
            value: '',
            isValid: false,
          },
        },
        formState.inputs.email?.isValid && formState.inputs.password?.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          displayName: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        await signInWithEmailAndPassword(
          auth,
          formState.inputs.email.value,
          formState.inputs.password.value
        ).then((response) => {
          const { user } = response;
          console.log(user.email);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          formState.inputs.email.value,
          formState.inputs.password.value
        );

        await createUserProfileDocument(user, {
          displayName: formState.inputs.displayName.value,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <LayoutPage>
      <Wrapper>
        <form onSubmit={submitHandler}>
          <FormStyled>
            <FormContent>
              {!isLoginMode && (
                <Input
                  id="displayName"
                  type="text"
                  label="Nombre"
                  onInput={InputHandler}
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Campo Obligatorio"
                ></Input>
              )}

              <Input
                id="email"
                type="email"
                label="Email"
                onInput={InputHandler}
                validators={[VALIDATOR_EMAIL()]}
                errorText="Campo Obligatorio"
              />
              <Input
                id="password"
                type="password"
                label="Password"
                onInput={InputHandler}
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="Mínimo 8 caracteres!"
              />
            </FormContent>
            <ButtonsContainer>
              <CustomButton>
                {isLoginMode ? 'Ingresar' : 'Registrarme'}
              </CustomButton>
              <GoogleButton onClick={signInWithGoogle}>
                <GoogleIcon src={GoogleLogo} />
                Ingresar con Google
              </GoogleButton>
            </ButtonsContainer>
            <ButtonsContainer>
              <span>
                {!isLoginMode
                  ? 'Ya tienes una cuenta? '
                  : 'Aun no tienes una cuenta?'}
              </span>
              <Alink onClick={switchModeHandler}>
                {!isLoginMode ? 'Ingresar' : 'Registrate'}
              </Alink>
            </ButtonsContainer>
          </FormStyled>
        </form>
      </Wrapper>
    </LayoutPage>
  );
};

export default Login;
