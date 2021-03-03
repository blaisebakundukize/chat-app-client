import React from "react";
import { useFormik } from "formik";
// import { messageInputSchema } from "../../utils/validationSchema";

const MessageInput = ({ onSubmitMessage }) => {
  const formik = useFormik({
    initialValues: { message: "" },
    onSubmit: (values) => {
      onSubmitMessage(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='form__group'>
          <input
            className='form-input'
            type='text'
            placeholder='Message'
            id='message'
            name='message'
            value={formik.values.message}
            onChange={formik.handleChange}
          />
          {formik.errors.message && (
            <p className='error'>{formik.errors.message}</p>
          )}
        </div>
        <button
          className='btn btn-green btn-submit'
          disabled={formik.values.message === ""}
          type='submit'
        >
          Send
        </button>
      </form>
    </>
  );
};

export default MessageInput;
