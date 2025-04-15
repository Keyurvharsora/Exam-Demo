import { toast } from "react-toastify";
import { CUSTOM_ID } from "../Constants/constants";

export const validateQuestion = (question, currentIndex, CUSTOM_ID) => {
  if (!question[currentIndex].question)
    return toast.error(`Question is required at ${currentIndex + 1}`, {
      toastId: CUSTOM_ID,
    });


  const currentQuestion = question[currentIndex].question;

  const isDuplicate = question.some(
    (q, i) =>
      i !== currentIndex &&
      q.question.trim().toLowerCase() === currentQuestion.trim().toLowerCase()
  );
  if (isDuplicate)
    return toast.error("Question should not be repeated", {
      toastId: CUSTOM_ID,
    });


  if (question[currentIndex].options.some((option) => option === ""))
    return toast.error(
      `All options must be filled at question-${currentIndex + 1}`,
      { toastId: CUSTOM_ID }
    );

  if (
    question[currentIndex].options.some(
      (option, index) =>
        question[currentIndex].options.indexOf(option) !== index
    )
  )
    return toast.warning("Options must be unique", { toastId: CUSTOM_ID });

  if (!question[currentIndex].answer)
    return toast.error(`Answer is required at question-${currentIndex + 1}`, {
      toastId: CUSTOM_ID,
    });

  if (!question[currentIndex].options.includes(question[currentIndex].answer))
    return toast.warning("Answer not match with options", {
      toastId: CUSTOM_ID,
    });
};
