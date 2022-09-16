import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from "@strapi/design-system";

import pageRequests from "../../api/page"

export default function PageModal({ setShowModal }) {
  const [name, setName] = useState("");
  const { push } = useHistory();

  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      const page = await pageRequests.addPage({ name: name });
      push(`/plugins/page/${page.id}/edit-content`)
    } catch (e) {
      console.log("error", e);
    }

  };

  const getError = () => {
    // Form validation error

    if (name.length > 24) {
      return "Content is too long";
    }

    if (name.length == 0) {
      return "Content is too short";
    }

    return null;
  };

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add Page
        </Typography>
      </ModalHeader>

      <ModalBody>
        <TextInput
          placeholder="Enter a name for your page"
          label="Name"
          name="text"
          hint="Max 24 characters"
          error={getError()}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add Page</Button>}
      />
    </ModalLayout>
  );
}
