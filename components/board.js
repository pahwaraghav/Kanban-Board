import { Box, Flex, Heading, Text, Button } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd-next";
import { v4 as uuidv4 } from "uuid";
//import { uuid } from 'uuidv4';

import items from "./items";
import categories from "./categories";

import Item from "./item";
import Column from "./column";
import { Input } from "@chakra-ui/input";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Board() {
  const [columns, setColumns] = useState(categories(items));

  useEffect(() => {
    const localColumns = JSON.parse(window.localStorage.getItem("columns"));
    console.log(localColumns);
    if (localColumns) setColumns(localColumns);
  }, []);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
    console.log(columns);
  }, [columns]);
  return (
    <Flex justify="center" direction={{ base: "column", md: "row" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Column
              columnId={columnId}
              column={column}
              columns={columns}
              setColumns={setColumns}
            />
          );
        })}
      </DragDropContext>
    </Flex>
  );
}

export default Board;
