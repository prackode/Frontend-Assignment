import React, { useState } from "react";
import GroupField from "../FormComponents/GroupField";
import InputField from "../FormComponents/InputField";
import RadioField from "../FormComponents/RadioField";
import SelectField from "../FormComponents/SelectField";
import SwitchField from "../FormComponents/SwitchField";
import { useFormContext } from "../../FormContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";

const Form = ({ formSchema }) => {
  const { formData, updateFormData } = useFormContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    newestOnTop: false,
    theme: "light",
  };

  const handleFormSubmit = () => {
    const isFormValid = formSchema.every((field) => {
      if (field.validate?.required) {
        return (
          formData[field.jsonKey] !== undefined &&
          formData[field.jsonKey] !== ""
        );
      }
      return true;
    });

    if (isFormValid) {
      handleOpenModal();
    } else {
      toast.error("Please enter all the fields", toastOptions);
    }
  };

  const renderJsonElements = (schema) => {
    return (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retrieved JSON data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {Object.entries(schema).map(([key, value]) => (
                <Text key={key} marginBottom={2}>
                  <strong>{key}: </strong>
                  {JSON.stringify(value, null, 2)}
                </Text>
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <form>
        {formSchema.map((schema, index) => {
          return (
            <React.Fragment key={index}>
              {schema.uiType === "Input" && (
                <InputField
                  schema={schema}
                  key={schema.sort}
                  updateFormData={updateFormData}
                />
              )}

              {schema.uiType === "Switch" && (
                <SwitchField
                  schema={schema}
                  key={schema.sort}
                  updateFormData={updateFormData}
                />
              )}

              {schema.uiType === "Select" && (
                <SelectField
                  schema={schema}
                  key={schema.sort}
                  updateFormData={updateFormData}
                />
              )}

              {schema.uiType === "Radio" && (
                <RadioField
                  schema={schema}
                  key={schema.sort}
                  updateFormData={updateFormData}
                />
              )}

              {schema.uiType === "Group" && (
                <GroupField
                  schema={schema}
                  key={schema.sort}
                  updateFormData={updateFormData}
                />
              )}
            </React.Fragment>
          );
        })}
        {formSchema.length > 0 && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              Button
              colorScheme="blue"
              marginTop={"10px"}
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
            {renderJsonElements(formData)}
          </Box>
        )}
      </form>

      <ToastContainer />
    </>
  );
};

export default Form;
