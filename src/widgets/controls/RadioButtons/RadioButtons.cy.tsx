import React from "react";
import RadioButtons from "./RadioButtons";

describe("<RadioButtons />", () => {
  it("renders boolean options", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <RadioButtons
        options={[
          { label: "True", value: true },
          { label: "False", value: false },
        ]}
      />
    );
  });
  it("renders string options", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <RadioButtons
        options={[
          { label: "Red", value: "red" },
          { label: "Green", value: "green" },
          { label: "Blue", value: "blue" },
        ]}
      />
    );
  });
  it("renders in vertical orientation", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <RadioButtons
        orientation="vertical"
        options={[
          { label: "Red", value: "red" },
          { label: "Green", value: "green" },
          { label: "Blue", value: "blue" },
        ]}
      />
    );
  });
});
