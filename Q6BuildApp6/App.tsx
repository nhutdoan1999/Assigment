import React from "react";
import Employee from "./Employees";
import Count from "./SumFirstLastDigit";
import Output from "./SumFirstLastDigit";
import OutputMin from "./FindMinNumber";
import { View } from "react-native";
import HalstoneSequence from "./HailstoneSequences";

export default function App() {

  return (
    //Question 1
    //<Employee name="Doan Minh Nhut" age="25" occupation="Engineer"/>


    //Question 2 
    //<Output number={768989576957}></Output>


    //Question 3
    //<OutputMin a={600} b={6} c={15}/>

    //Question 4
    <HalstoneSequence number={100} />

  );
}