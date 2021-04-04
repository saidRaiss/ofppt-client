import React from "react";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';



const CustomStepper = (props) => {
    const steps = ["Compte", "Mes informations personnelles", "Mes informations professionnelles", "Mes justificatifs"];
    const activeIndex = props.activeIndex
  return (
        <Stepper activeStep={activeIndex} alternativeLabel style={{width:'100%'}}>
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label.toUpperCase()}</StepLabel>
            </Step>
            ))}
        </Stepper>
  );
};
export default CustomStepper