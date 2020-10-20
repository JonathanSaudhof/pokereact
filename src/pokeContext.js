import React, { createContext, useState } from "react";

const PokeContext = createContext({});
export const PokeProvider = PokeContext.Provider;

export default PokeContext;
