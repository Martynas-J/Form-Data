"use client";
import Button from "@/components/button";
import dataCommands from "@/components/dataCommands/dataCommands";
import getData from "@/components/dataCommands/getData";
import DataTable from "@/components/dataTable/dataTable";
import FormElement from "@/components/formElement/formElement";
import { initialFormData } from "@/config/var";
import { useEffect, useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState(initialFormData);
  const [peopleData, setPeopleData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await dataCommands(
        formData,
        isEdit ? "editData" : "sendData",
        isEdit ? "PUT" : "POST"
      );
      if (success) {
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      handleToggleForm();
      await handleGetData();
    }
  };

  const handleGetData = async () => {
    try {
      const data = await getData();
      setPeopleData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (person) => {
    setIsFormVisible(true);
    setIsEdit(true);
    setFormData({ ...person });
  };

  const handleDelete = async (person) => {
    dataCommands(person, "deleteData", "DELETE");
    await handleGetData();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleToggleForm = () => {
    setFormData(initialFormData);
    setIsEdit(false);
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setPeopleData(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" pt-5">
      <h1 className="text-center text-2xl">Home Page</h1>

      {!isFormVisible && (
        <Button text="Pildyti formą" onclick={handleToggleForm} />
      )}
      {isFormVisible && (
        <FormElement
          formData={formData}
          isEdit={isEdit}
          handleGetData={handleGetData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggleForm={handleToggleForm}
        />
      )}
      <DataTable
        peopleData={peopleData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
