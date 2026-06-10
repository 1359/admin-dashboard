import { useState } from "react";

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
  rating: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  rating?: string;
}

export function useFeedbackForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
    rating: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fields.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!fields.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!fields.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!fields.message.trim()) {
      newErrors.message = "Message is required";
    } else if (fields.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (!fields.rating) {
      newErrors.rating = "Please select a rating";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setFields({ name: "", email: "", subject: "", message: "", rating: "" });
    setErrors({});
  };
  return { errors, fields, handleChange, validate, reset };
}
