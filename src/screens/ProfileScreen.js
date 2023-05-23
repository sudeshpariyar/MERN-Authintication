import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
  }, [userInfo.setName, userInfo.setEmail, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password not matching");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {isLoading && <Loading />}
        <Button type="submit" variant="primary" className="mt-3 w-100">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
