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
} from "@chakra-ui/react";

function Item({ item, index, columns, setColumns, column, columnId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState(item.description);

  const handleSave = (item) => {
    //console.log(column);
    // const addedColumn = columns[columnId];
    // console.log(addedColumn);
    // let addedItems = addedColumn.items.filter((column) => column.id != item.id);
    // addedItems = [
    //   ...addedItems,
    //   { id: item.id, content: item.content, description },
    // ];
    // console.log(addedColumn);

    // setColumns({
    //   ...columns,
    //   [columnId]: {
    //     ...addedColumn,
    //     items: addedItems,
    //   },
    // });
    // setDescription("");
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
                <ModalHeader>{item.content}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={(e) => handleSave(e, item)}
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
