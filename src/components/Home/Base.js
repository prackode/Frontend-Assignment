import { useState } from "react";
import { useFormContext } from "../../FormContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./Form";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";

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

const Base = () => {
  const [textValue, setTextValue] = useState();
  const [formSchema, setFormSchema] = useState([]);
  const [isMobileView] = useMediaQuery("(max-width: 768px)");

  const customStyles = isMobileView
    ? { height: "50vh", overflowY: "scroll" }
    : { height: "100vh", overflowY: "scroll" };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
    try {
      const parsedFields = JSON.parse(e.target.value);
      if (Array.isArray(parsedFields)) {
        setFormSchema(parsedFields);
      }
    } catch (error) {
      toast.error("Invalid form schema", toastOptions);
    }
  };

  const { resetFormData } = useFormContext();

  const handleReset = () => {
    setFormSchema([]);
    setTextValue("");
    resetFormData();
    toast.success("Form reset successfully", toastOptions);
  };

  const renderForm = (
    <>
      <Form formSchema={formSchema} />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button colorScheme="blue" marginY={"12px"} onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </>
  );

  return (
    <>
      <Grid templateColumns={isMobileView ? "1fr" : "repeat(2, 1fr)"}>
        <GridItem
          {...customStyles}
          css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Textarea
            value={textValue}
            placeholder="Enter UI schema here..."
            onChange={handleTextChange}
            height="100vh"
            resize="none"
            color="gray.100"
            bg="gray.800"
            fontSize={"18px"}
            padding={4}
            css={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          />
        </GridItem>

        <GridItem
          {...customStyles}
          css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {formSchema.length > 0 ? (
            <>
              <Box px={6}>{renderForm}</Box>
            </>
          ) : (
            <>
              <Box p={3} opacity={0.65} fontSize={18}>
                React form will be displayed here...
              </Box>
            </>
          )}
        </GridItem>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default Base;
