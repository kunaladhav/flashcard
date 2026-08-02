import { useRef } from "react";
import FlashcardTabs from "../components/FlashcardTabs";
import { Formik, Form, Field, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addFlashcard } from "../utils/flashcardSlice";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

const CreateFlashCard = () => {
  // Define our initial form structure
  const initialValues = {
    groupName: "",
    description: "",
    groupImage: "",

    cards: [
      {
        term: "",
        definition: "",
        image: "",
      },
    ],
  };

  const validationSchema = Yup.object({
    groupName: Yup.string().required("Group Name is required"),
    description: Yup.string().required("Description is required"),
    cards: Yup.array().of(
      Yup.object({
        term: Yup.string().required("Term Name is required"),
        definition: Yup.string().required("Definition is required"),
      }),
    ),
  });

  const dispatch = useDispatch();
  const flashcards = useSelector((state) => state.flashcards.flashcards);
  const termRefs = useRef([]);

  console.log("Redux Flashcards State: ", flashcards);

  return (
    <main className="container mx-auto max-w-6xl px-4 mt-8 md:px-8 pb-12">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create Flashcard</h2>

      <FlashcardTabs />

      {/* 1. Wrap your entire form space inside the Formik wrapper component */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(
            addFlashcard({
              id: crypto.randomUUID(),
              ...values,
            }),
          );
          toast.success("Flashcard Created Succesfuly!!");
          console.log("Form values: ", values);
        }}
      >
        {/* 2. Pass down Formik's inner properties (values) via a function render pattern */}
        {({ values, setFieldValue, errors, touched }) => {
          // Dynamically check if the groupName field has content
          const isTermsDisabled =
            !values.groupName || values.groupName.trim() === "";

          const handleGroupImageUpload = (event, setFieldValue) => {
            const file = event.target.files[0];

            console.log("Selected File: ", file);

            if (!file) return;

            const reader = new FileReader();

            reader.onloadend = () => {
              console.log("Base64 Result: ", reader.result);
              setFieldValue("groupImage", reader.result);
            };

            reader.readAsDataURL(file);
          };

          const handleCardImageUpload = (event, index, setFieldValue) => {
            const file = event.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onloadend = () => {
              setFieldValue(`cards[${index}].image`, reader.result);
            };

            reader.readAsDataURL(file);
          };

          return (
            <Form>
              {/* --- CREATE FLASHCARD GROUP CARD --- */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="mb-4">
                  <p className="text-gray-700 mb-2 font-medium">
                    Create Group*
                  </p>
                  <div className="flex items-center gap-4">
                    {/* 3. Use Formik's <Field> with a "name" matching our initialValues */}
                    <Field
                      type="text"
                      name="groupName"
                      placeholder="Enter group name"
                      className="w-full max-w-md border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    {touched.groupName && errors.groupName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.groupName}
                      </p>
                    )}
                    <label className="cursor-pointer">
                      {values.groupImage ? (
                        <img
                          src={values.groupImage}
                          alt="Group Preview"
                          className="w-35 h-35 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-blue-600 px-5 py-2 font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition">
                          <BsFileEarmarkArrowUp className="size-6" />
                          Upload Image
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          handleGroupImageUpload(e, setFieldValue)
                        }
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <p className="text-gray-700 mb-2 font-medium">
                    Add description
                  </p>
                  {/* 4. Use "as='textarea'" to change the default layout mapping */}
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Describe the roles, responsibility, skills required for the job and help candidate understand the role better."
                    className="w-full max-w-3xl border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    rows={3}
                  />
                  {touched.description && errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              {/* --- CREATE TERMS SECTION (Conditional Lock via Formik Context) --- */}
              <FieldArray name="cards">
                {({ push, remove }) => (
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-8 transition-opacity duration-300">
                    {values.cards.map((card, index) => (
                      <div
                        key={index}
                        className={`bg-white p-6 rounded-lg mb-8 transition-opacity duration-300 ${
                          isTermsDisabled
                            ? "opacity-40 select-none pointer-events-none"
                            : "opacity-100"
                        }`}
                      >
                        <div className="flex items-start gap-4 w-full">
                          <div className="shrink-0 mt-8">
                            <span className="flex items-center justify-center rounded-full bg-[#F08686] text-white w-7 h-7 font-semibold text-sm">
                              {index + 1}
                            </span>
                          </div>

                          {/* Term Field */}
                          <div className="flex-1">
                            <p className="text-gray-400 mb-2 font-medium text-sm">
                              Enter Term*
                            </p>
                            <Field name={`cards[${index}].term`}>
                              {({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="Enter term"
                                  disabled={isTermsDisabled}
                                  ref={(el) => (termRefs.current[index] = el)}
                                  className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                />
                              )}
                            </Field>
                            {touched.cards?.[index]?.term &&
                              errors.cards?.[index]?.term && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.cards?.[index]?.term}
                                </p>
                              )}
                          </div>

                          {/* Definition Field */}
                          <div className="flex-1">
                            <p className="text-gray-400 mb-2 font-medium text-sm">
                              Enter Definition*
                            </p>
                            <Field
                              type="text"
                              name={`cards[${index}].definition`}
                              placeholder="Enter definition"
                              disabled={isTermsDisabled}
                              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            />
                            {touched.cards?.[index]?.definition &&
                              errors.cards?.[index]?.definition && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.cards?.[index]?.definition}
                                </p>
                              )}
                          </div>

                          <div className="mt-7 flex gap-2">
                            <label className="cursor-pointer">
                              {card.image ? (
                                <img
                                  src={card.image}
                                  alt="Card Preview"
                                  className="w-20 h-20 object-cover rounded border"
                                />
                              ) : (
                                <div className="text-blue-500 border border-blue-400 px-6 py-2 rounded font-medium hover:bg-blue-60 transition text-sm">
                                  Select Image
                                </div>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) =>
                                  handleCardImageUpload(e, index, setFieldValue)
                                }
                              />
                            </label>
                            <div className="flex flex-col items-center">
                              {values.cards.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-gray-500 hover:text-red-700"
                                >
                                  <BsTrash className="size-4" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => termRefs.current[index]?.focus()}
                                className="text-gray-500 hover:text-blue-500"
                              >
                                <BsPencilSquare className="mt-2 size-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 ml-11">
                          <button
                            type="button"
                            onClick={() =>
                              push({ term: "", definition: "", image: "" })
                            }
                            disabled={isTermsDisabled}
                            className="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center gap-1 disabled:text-gray-400"
                          >
                            + Add more
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              {/* --- FORM SUBMIT ACTION BUTTON --- */}
              <div className="flex justify-center">
                <button
                  type="submit" // Setting type to submit triggers Formik lifecycle automatically
                  disabled={isTermsDisabled}
                  className="bg-[#cc1616] text-white px-12 py-2.5 rounded font-medium shadow-md hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
};

export default CreateFlashCard;
