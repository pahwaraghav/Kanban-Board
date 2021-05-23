import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd-next";

import {
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  Flex,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";

import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

function Item({ item, index, columns, setColumns, column, columnId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState(item.description);
  const [content, setContent] = useState(item.content);

  const handleTitleChange = (item) => {
    console.log("Current item is");
    console.log(item);
    const addedColumn = columns[columnId];
    const addedItems = addedColumn.items.map((currentItem) => {
      if (currentItem.id != item.id) return currentItem;
      else {
        console.log(currentItem);
        return {
          ...currentItem,
          content: content,
        };
      }
    });

    setColumns({
      ...columns,
      [columnId]: {
        ...addedColumn,
        items: addedItems,
      },
    });
  };

  const handleSave = (item) => {
    console.log(column);
    const addedColumn = columns[columnId];
    console.log(item.id);
    const addedItems = addedColumn.items.map((currentItem) => {
      console.log(currentItem);
      if (currentItem.id != item.id) return currentItem;
      else {
        return {
          ...currentItem,
          description: description,
        };
      }
    });

    setColumns({
      ...columns,
      [columnId]: {
        ...addedColumn,
        items: addedItems,
      },
    });
    onClose();
  };
  const handleDelete = (item) => {
    const modifiedColumn = columns[columnId];
    const modifiedItems = modifiedColumn.items.filter(
      (column) => column.id != item.id
    );
    setColumns({
      ...columns,
      [columnId]: {
        ...modifiedColumn,
        items: modifiedItems,
      },
    });
    onClose();
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" ml={3}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <IconButton
        ml={2}
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    );
  }
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <>
            <Box
              onClick={onOpen}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              p={4}
              mb={4}
              minHeight="50px"
              bg={snapshot.isDragging ? "gray.200" : "white"}
              color="white"
              rounded="xl"
              boxShadow="2xl"
            >
              <Text color="black">{item.content}</Text>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Editable
                    textAlign="center"
                    defaultValue={item.content}
                    fontSize="2xl"
                    isPreviewFocusable={false}
                    onSubmit={() => handleTitleChange(item)}
                  >
                    <EditablePreview />
                    <EditableInput
                      width="70%"
                      onInput={(e) => setContent(e.target.value)}
                    />
                    <EditableControls item={item} />
                  </Editable>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea
                    placeholder="Add description"
                    defaultValue={item.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => handleSave(item)}
                  >
                    Save
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        );
      }}
    </Draggable>
  );
}

export default Item;
