import React, { useState } from "react";
import Form from "@rjsf/core";

function DynamicFormComponent({ beautifiedJSON }) {
  const [formData, setFormData] = useState({});

  const handleSubmit = ({ formData }) => {
    console.log("Form submitted with data:", formData);
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <h1>Dynamic Form Builder</h1>
      {beautifiedJSON ? (
        <Form
          schema={JSON.parse(beautifiedJSON)} // Parse the JSON schema
          formData={formData}
          onChange={(e) => setFormData(e.formData)} // Handle form data changes
          onSubmit={handleSubmit} // Handle form submission
          onError={(e) => console.error("Form errors:", e)}
        />
      ) : (
        <p>No JSON schema available to render a form.</p>
      )}
    </div>
  );
}

export default DynamicFormComponent;
     

