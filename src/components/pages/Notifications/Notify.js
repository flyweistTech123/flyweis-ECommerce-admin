/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Notify = () => {
  const sendMsg = async (e) => {
    e.preventDefault();
    toast.success("Message Send SuccessFully");
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Send Notification
          </span>
        </div>
        <Container style={{ marginTop: "5%", width: "800px", color: "black" }}>
          <Form onSubmit={sendMsg}>
            <Form.Label> Write Message Here </Form.Label>
            <textarea
              style={{
                border: "1px solid black",
                outline: "none",
                width: "100%",
                padding: "10px",
              }}
            />

            <Button
              style={{ width: "30%", marginTop: "2%" }}
              variant="outline-success"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default HOC(Notify);
