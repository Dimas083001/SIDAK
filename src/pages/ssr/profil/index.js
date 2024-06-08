import React from "react";
import { useAuth } from "../../admin/index.js";

// components
import FormEditProfil from "../../../components/Forms/FormEditProfil.js";

// layout for page

import SSR from "../../../layouts/SSR.js";

export default function Profil() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormEditProfil />
        </div>
      </div>
    </>
  );
}

Profil.layout = SSR;
