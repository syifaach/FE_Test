import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useAuth } from "../../services/auth/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleClick = () => setShow(!show);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const isLogin = await login(values.username, values.password);
    console.log(isLogin);
    if (isLogin) navigate("/");
  };

  console.log("values", values);

  return (
    <div className="flex gap-5 justify-center items-center h-screen">
      <div className="w-full p-6">
        <div className="mb-5">
          <div className="mb-2">
            <Text>Username</Text>
            <Input
              name="username"
              variant="outline"
              placeholder="Input your username"
              value={values?.username}
              onChange={onChange}
            />
          </div>

          <div className="mb-2">
            <Text>Password</Text>
            <InputGroup size="md">
              <Input
                name="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={values?.password}
                onChange={onChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className="flex justify-end"
            variant="solid"
            color="white"
            backgroundColor="blue.900"
            onClick={onLogin}
          >
            Login
          </Button>
        </div>
      </div>
      <div className="w-full flex items-center justify-center p-6 h-screen">
        <div className="flex justify-center items-center mb-3">
          <img src={Logo} width="300px" height="100px"></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
