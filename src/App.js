import "./App.css";
import {
  useForm, // general use form hook
  Controller, // wrapper for controlled components
  FormProvider, // wrapper for context inputs and fields
  useFormContext, // hook to access the form context, this can return undefined if you are not inside a FormProvider
  useWatch, // hook to watch a field
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function AddressInput() {
  const context = useFormContext();
  if (!context) {
    return null;
  }
  const { register, formState, control } = context;
  const { errors } = formState;
  return (
    <>
      <div className={"inputRow"}>
        <label htmlFor="addressLine1">Address Line 1</label>
        <input
          {...register("addressLine1", {
            required: { value: true, message: "We must know your address." },
          })}
          placeholder="123 Love Lane"
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="addressLine1"
        render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
      />

      <div className={"inputRow"}>
        <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
        <input
          {...register("addressLine2", {
            required: {
              value: false,
            },
          })}
          placeholder="Apt 130"
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="addressLine2"
        render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
      />

      <div className={"inputRow"}>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          {...register("zipCode", {
            required: { value: true, message: "We must know your zip code." },
            minLength: { value: 5, message: "Zip code must be 5 digits." },
            maxLength: { value: 5, message: "Zip code must be 5 digits." },
          })}
          placeholder="23223"
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="zipCode"
        render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
      />

      <div className={"inputRow"}>
        <label htmlFor="city">City</label>
        <input
          {...register("city", {
            required: {
              value: true,
              message: "We must know your city.",
            },
            minLength: {
              value: 3,
              message: "Must be at least 3 characters.",
            },
          })}
          placeholder="Richmond"
        />
      </div>
      <ErrorMessage
        errors={errors}
        name="city"
        render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
      />

      {/** we can use controller to create our controlled inputs, even in a context */}
      <Controller
        name="state"
        control={control}
        render={({ field: { value, name, onChange, ref } }) => {
          return (
            <div className={"inputRow"}>
              <label htmlFor={name}>State</label>
              <input
                onChange={onChange}
                name={name}
                value={value}
                placeholder="VA"
              />
            </div>
          );
        }}
        rules={{
          required: {
            value: true,
            message: "We must know your state.",
          },
          minLength: {
            value: 2,
            message: "Must be at least 2 characters.",
          },
        }}
      />
      <ErrorMessage
        errors={errors}
        name="state"
        render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
      />
    </>
  );
}

export default function App() {
  const formMethods = useForm({
    mode: "onChange", // onChange, onBlur, onSubmit
    defaultValues: {},
    criteriaMode: "all", // all, firstError
    shouldFocusError: true, // focus on the first error
    shouldUnregister: true, // unregister fields when they are removed from the DOM
    delayError: 0, // delay the error message
    resolver: undefined, // custom resolver
    context: undefined, // custom context
    reValidateMode: "onChange", // onChange, onBlur, onSubmit
  });

  const {
    register,
    control,
    formState, // current state of the form, including errors, dirty, etc.
    clearErrors, // remove all errors from the form
    reset, // reset the whole form back to its initial state
    resetField, // reset a single field
    getFieldState, // get the state of a single field
    getValues, // get the values of all fields
    handleSubmit, // submit the form, this usually comes from the onSubmit prop in a form element, but interestingly you can just put it as any onClick handler
    setError, // set an error on a field
    setFocus, // set focus on a field
    setValue, // set value of a field
    trigger, // trigger validation
    unregister, // remove a field from the form
    watch, // think of this as a subscribe to the form state, it will return the value of the field you are watching
  } = formMethods;

  const errors = formState?.errors;

  const values = watch();

  const onFormValid = (data) => {
    alert("Form is valid");
    console.info(data);
  };

  const onFormInvalid = (data) => {
    alert("Form is invalid");
    console.error(data);
  };

  return (
    <div className="App" style={{ flex: 1 }}>
      <h2>React, and hooks, and forms, oh my!</h2>
      <button onClick={() => reset()}>Reset Form</button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <form
          style={{ flex: 1 }}
          onSubmit={handleSubmit(onFormValid, onFormInvalid)}
        >
          <div className={"inputRow"}>
            <label htmlFor="firstName">First Name</label>
            {/* register is a function that takes a field name and returns an object with props to be spread on an input */}
            <input
              {...register("firstName", {
                required: {
                  value: true,
                  message: "We must know your first name.",
                },
              })}
              placeholder="John"
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="firstName"
            render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
          />

          {/** we can use controller to create our controlled inputs */}
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, name, onChange, ref } }) => {
              return (
                <div className={"inputRow"}>
                  <label htmlFor={name}>Last Name</label>
                  <input
                    placeholder="Smith"
                    name={name}
                    onChange={onChange}
                    value={value}
                  />
                </div>
              );
            }}
            rules={{
              required: {
                value: true,
                message: "We must know your last name.",
              },
            }}
          />
          <ErrorMessage
            errors={errors}
            name="lastName"
            render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
          />

          <div className={"inputRow"}>
            <label htmlFor="age">Age</label>
            {/* register is a function that takes a field name and returns an object with props to be spread on an input */}
            <input
              type="number"
              {...register("age", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "We must know your age.",
                },
                min: {
                  value: 13,
                  message: "You must be at least 13 years old.",
                }
              })}
              placeholder="13"
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="age"
            render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
          />

          {/** we can also use the context to access the form state */}
          <FormProvider {...formMethods}>
            <AddressInput />
          </FormProvider>

          <button type="submit" disabled={!formState.isValid}>
            Submit
          </button>
        </form>

        <div style={{ flex: 1 }}>
          <div>
            <h2>Form State</h2>
            <pre
              style={{
                backgroundColor: "lightgray",
                padding: "1rem",
                borderRadius: "1rem",
                margin: "0 1rem",
              }}
            >
              <code style={{ flex: 1 }}>{JSON.stringify(values, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
