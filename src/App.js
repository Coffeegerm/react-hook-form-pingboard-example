import "./App.css";
import {
  useForm, // general use form hook
  Controller, // wrapper for controlled components
  FormProvider, // wrapper for context inputs and fields
  useFormContext, // hook to access the form context, this can return undefined if you are not inside a FormProvider
  useWatch, // hook to watch a field
} from "react-hook-form";

// const Input = ({ name }) => {
//   return (
//     <div>
//       <label htmlFor={name}>Input</label>
//       <input name={name} />
//     </div>
//   );
// };

const AddressInput = () => {
  const { control, formState } = useFormContext();
  if (!control) {
    return null;
  }
  console.log({ formState });
  const { register } = control;
  const errors = formState?.errors;
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

      <div className={"inputRow"}>
        <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
        <input {...register("addressLine2")} placeholder="123 Love Lane" />
      </div>

      <div className={"inputRow"}>
        <label htmlFor="zipCode">Zip Code</label>
        <input {...register("zipCode")} placeholder="123 Love Lane" />
      </div>

      <div className={"inputRow"}>
        <label htmlFor="city">City</label>
        <input {...register("city")} placeholder="Paris" />
      </div>

      <div className={"inputRow"}>
        <label htmlFor="state">State</label>
        <input {...register("state")} placeholder="Indiana" />
      </div>
    </>
  );
};

function App() {
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
  } = useForm({
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

  const errors = formState?.errors || undefined;

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

          {/** we can also use the context to access the form state */}
          <FormProvider control={control}>
            <AddressInput />
          </FormProvider>

          <button type="submit">Submit</button>
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
          <pre
            style={{
              backgroundColor: "lightgray",
              padding: "1rem",
              borderRadius: "1rem",
              margin: "1rem",
            }}
          >
            <code style={{ flex: 1 }}>
              {JSON.stringify(formState, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
