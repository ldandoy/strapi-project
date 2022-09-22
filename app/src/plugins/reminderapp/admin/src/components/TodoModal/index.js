import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput
} from "@strapi/design-system";

import { useLibrary } from '@strapi/helper-plugin';


export default function TodoModal({ setShowModal, addTodo }) {
  const { fields: { media: MediaLibraryInput } } = useLibrary();

  const [name, setName] = useState("");
  const [media, setMedia] = useState([]);


  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      await addTodo({ name: name, image: media });
      setShowModal(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getError = () => {
    // Form validation error

    if (name.length > 40) {
      return "Content is too long";
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
          Add todo
        </Typography>
      </ModalHeader>

      <ModalBody>
        <TextInput
          placeholder="What do you need to do?"
          label="Name"
          name="text"
          hint="Max 40 characters"
          error={getError()}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <MediaLibraryInput
          name="custom-media-input"
          intlLabel={{ id: 'custom-media-input.label', defaultMessage: 'Custom media input usage' }}
          onChange={(event) => setMedia(event.target.value)}
          attribute={{ allowedTypes: ['videos', 'files', 'images', 'audios'] }}
          multiple={true}
          value={media}
        />
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add todo</Button>}
      />
    </ModalLayout>
  );
}