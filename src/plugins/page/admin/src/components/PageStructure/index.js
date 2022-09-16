import React, { useState } from "react";
import {
  Button,
  Layout,
  TwoColsLayout,
  TextInput,
  Box,
  Flex,
  Select,
  Option
} from "@strapi/design-system";
import { Plus } from "@strapi/icons";

import './style.css';

export default function PageStructure({content}) {
  const [contentState, setContentState] = useState(content)
  const [editBlock, setEditBlock] = useState(null)

  const handleClickRow = async (event, block, indexRow) => {
    setEditBlock({
      id: `row-${indexRow}`,
      type: 'row',
      block: block
    })
  }

  const handleClickCell = async (event, block, indexRow, indexCell) => {
    event.stopPropagation()

    setEditBlock({
      indexCell: indexCell,
      indexRow: indexRow,
      id: `row-${indexRow}-col-${indexCell}`,
      type: "cell",
      label: "cell",
      block: block
    })
  }

  const addBlock = (event, type="row", index=0) => {
    if (type == "row") {
      const block = {
        label: "row",
        classe: '',
        direction: 'row',
        cells: []
      }
      let newBlocks = contentState.blocks
      newBlocks.push(block)

      setContentState({...content, blocks:newBlocks})
    }

    if (type == "cell") {
      const block = {
        label: "cell",
        type: "text",
        classe: "",
        content: "",
      }

      let newBlocks = contentState.blocks
      newBlocks[index].cells.push(block)

      setContentState({...content, blocks:newBlocks})
    }

  }

  return (
    <TwoColsLayout startCol={
      <Box
        hasRadius={true}
        padding={4}
        style={{ marginTop: "10px", marginLeft:"10%" }}

      >
        {contentState.blocks.map((block, indexRow) => ( <div key={`rowBlock-${indexRow}`}>
          <div className={block.direction == "row" ? `${block.classe} rowBlockRow` : `${block.classe} rowBlockCol`} onClick={(event) => handleClickRow(event, block, indexRow)}>
          {block.cells.map((cell, indexCell) => (
            <div key={`rowBlock-${indexRow}-cellBlock-${indexCell}`} className={typeof cell.classe != 'undefined' ? `${cell.classe} cellBlock`: "cellBlock"} onClick={(event) => handleClickCell(event, block, indexRow, indexCell)}>
              {cell.content}
            </div>))}

            <div key={`rowBlock-${indexRow}-addCellBlock`} className="cellBlock">
            <Button
                onClick={(event) => addBlock(event, "cell", indexRow)}
                variant="secondary"
                startIcon={<Plus />}
                className="addCellButton"
                children="Add Column"
              />
            </div>
        </div>
      </div>))}
        <Button
          onClick={addBlock}
          variant="secondary"
          startIcon={<Plus />}
          className="addRowButton"
        >
          Add a row
        </Button>
      </Box>
    } endCol={
      <>
        {editBlock != null && editBlock.type == "row" && <>
          <Box
            hasRadius={true}
            padding={4}
            style={{ marginTop: "10px", marginLeft:"10%" }}
          >
            <TextInput
              label="Id"
              name='id'
              value={editBlock.id}
            >
            </TextInput>

            <TextInput
              label="Classe"
              name='classe'
              value={editBlock.block.classe}
              onChange={(event) => {
                let block = editBlock.block
                block.classe = event.target.value
                setEditBlock({...editBlock, [block]: block})
              }}
            >
            </TextInput>

            <div>
              <div>
                <div>Direction</div>
              </div>
              <Flex>
                <Button
                  onClick={(event) => {
                    let block = editBlock.block
                    block.direction = "row"
                    setEditBlock({...editBlock, [block]: block})
                  }}
                  variant={(editBlock.block.direction == 'row') ? "secondary" : "tertiary"}
                  style={{ marginTop: "10px" }}
                >
                  Row
                </Button>
                <Button
                  onClick={(event) => {
                    let block = editBlock.block
                    block.direction = "column"
                    setEditBlock({...editBlock, [block]: block})
                  }}
                  variant={(editBlock.block.direction == 'column') ? "secondary" : "tertiary"}
                  style={{ marginTop: "10px" }}
                >
                  Column
                </Button>
              </Flex>
            </div>
          </Box>
        </>}

        { editBlock != null && editBlock.type == "cell" && <>
          <Box
            hasRadius={true}
            padding={4}
            style={{ marginTop: "10px", marginLeft:"10%" }}
          >

            <TextInput
              label="Id"
              name='id'
              value={editBlock.id}
            >
            </TextInput>

            <TextInput
              label="Classe"
              name='classe'
              value={editBlock.block.cells[editBlock.indexCell].classe}
              onChange={(event) => {
                let block = editBlock.block
                block.cells[editBlock.indexCell].classe = event.target.value
                setEditBlock({...editBlock, [block]: block})
              }}
            >
            </TextInput>
            
            <Select 
              id="select1" 
              label="Choose your type" 
              required 
              placeholder="Your example" 
              hint="Description line" 
              value={editBlock.block.cells[editBlock.indexCell].type} 
              onChange={(event) => {
                let block = editBlock.block
                block.cells[editBlock.indexCell].type = event
                setEditBlock({...editBlock, [block]: block})
              }}
            >
              <Option value={'text'}>Texte</Option>
              <Option value={'image'}>Image</Option>
            </Select>
            
            { editBlock.block.cells[editBlock.indexCell].type == 'text' && <TextInput
              label="Texte"
              name='text'
              value={editBlock.block.cells[editBlock.indexCell].content}
              onChange={(event) => {
                let block = editBlock.block
                block.cells[editBlock.indexCell].content = event.target.value
                setEditBlock({...editBlock, [block]: block})
              }}
            >
            </TextInput>}

            { editBlock.block.cells[editBlock.indexCell].type == 'image' && <TextInput
              label="Image"
              name='image'
              value={editBlock.block.cells[editBlock.indexCell].content}
            >
            </TextInput>}
          </Box>
        </> }
      </>
    }
    />
  );
}
