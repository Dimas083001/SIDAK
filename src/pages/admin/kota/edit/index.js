import React from "react";

// components
import FormEditKota from "../../../../components/Forms/FormEditKota.js";
// layout for page
import Admin from "../../../../layouts/Admin.js";

export default function EditKota() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormEditKota />
        </div>
      </div>
    </>
  );
}

EditKota.layout = Admin;