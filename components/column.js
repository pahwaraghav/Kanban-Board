import React, { useState } from "react";
import { Flex, Box, Input, Heading, Text } from "@chakra-ui/react";

import { Droppable } from "react-beautiful-dnd-next";

import Item from "./item";

import { v4 as uuidv4 } from "uuid";

function Column({ columnId, column, columns, setColumns }) {
  const [value, setValue] = useState("");

  function keyPress(e, columnId) {
    if (e.keyCode == 13) {
      console.log("value", e.target.value);
      console.log(columnId);
      // change here
      const addedColumn = columns[columnId];
      const addedItems = [
        ...addedColumn.items,
        { id: uuidv4(), content: e.target.value, description: "" },
      ];
      console.log(addedColumn);

      setColumns({
        ...columns,
        [columnId]: {
          ...addedColumn,
          items: addedItems,
        },
      });
      setValue("");
    }
  }

  return (
    <Flex
      direction="column"
      align="center"
      key={columnId}
      //   overflow="auto"
    >
      <Heading as="h2" size="xl" color="white">
        {column.name} - {column.items.length}
      </Heading>
      <Box mx={4}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                bg={snapshot.isDraggingOver ? "blue.500" : "blue.200"}
                p={2}
                width="300px"
                rounded="lg"
              >
                {column.items.length === 0 && <Text>Hurray! No Tasks</Text>}
                {column.items.map((item, index) => {
                  return (
                    <Item
                      item={item}
                      index={index}
                      column={column}
                      columns={columns}
                      setColumns={setColumns}
                      columnId={columnId}
                    />
                  );
                })}
                {provided.placeholder}
                {/* TODO:Add item here */}

                <Input
                  type="text"
                  bg="white"
                  placeholder="Add New Item"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => keyPress(e, columnId)}
                />
              </Box>
            );
          }}
        </Droppable>
      </Box>
    </Flex>
  );
}

export default Column;
