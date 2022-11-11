import "./App.css";
import {
  useForm, // general use form hook
  Controller, // wrapper for controlled components
  FormProvider, // wrapper for context inputs and fields
  useFormContext, // hook to access the form context, this can return undefined if you are not inside a FormProvider
  useWatch, // hook to watch a field
} from "react-hook-form";

const Input = ({ name }) => {
  return (
    <div>
      <label htmlFor={name}>Input</label>
      <input name={name} />
    </div>
  );
};

const ContextInput = () => {
  const context = useFormContext();
  if (!context) {
    return null;
  }
  return (
    <div className={"inputRow"}>
      <label htmlFor="address">Address</label>
      <input name="address" {...context.register} placeholder="123 Love Lane, Paris, France" />
    </div>
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

  const values = getValues();

  const fields = watch();

  console.log({ values, fields });

  return (
    <div className="App" style={{ flex: 1 }}>
      <h2>React, and hooks, and forms, oh my!</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <form style={{ flex: 1 }}>
          <div className={"inputRow"}>
            <label htmlFor="firstName">First Name</label>
            {/* register is a function that takes a field name and returns an object with props to be spread on an input */}
            <input {...register("firstName")} placeholder="John" />
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
          />

          {/** we can also use the context to access the form state */}
          <FormProvider control={control}>
            <ContextInput />
          </FormProvider>

          <button onClick={() => reset()}>Reset Form</button>
        </form>

        <div style={{ flex: 1 }}>
          <div>
            <h2>Form State</h2>
            <pre style={{ backgroundColor: "lightgray", padding: "1rem", borderRadius: '1rem', margin: '0 1rem' }}>
              <code style={{ flex: 1 }}>{JSON.stringify(values, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
