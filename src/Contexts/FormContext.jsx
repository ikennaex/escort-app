import { createContext, useContext, useState, useEffect } from "react";

export const FormContext = createContext();
// export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [completedSteps, setCompletedSteps] = useState(
    JSON.parse(localStorage.getItem("completedSteps")) || []
  );

  useEffect(() => {
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  const markStepCompleted = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  return (
    <FormContext.Provider value={{ completedSteps, markStepCompleted }}>
      {children}
    </FormContext.Provider>
  );
};
