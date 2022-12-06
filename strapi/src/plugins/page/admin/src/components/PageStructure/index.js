import React, { useState } from "react";
import {
  Button,
  Layout,
  TwoColsLayout,
  TextInput,
  Typography,
  Box,
  Flex,
  Select,
  Option
} from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { useLibrary } from '@strapi/helper-plugin';

import './style.css';

export default function PageStructure({content}) {
  const [contentState, setContentState] = useState(content)
  const [editBlock, setEditBlock] = useState(null)

  const { fields: { media: MediaLibraryInput } } = useLibrary();

  const handleClickRow = async (event, block, indexRow) => {
    setEditBlock({
      id: `row-${indexRow}`,
      type: 'row',
      classe: "",
      block: block
    })
  }

  const handleClickCell = async (event, block, indexRow, indexCell) => {
    event.stopPropagation()

    console.log(content)

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
            <div 
              key={`rowBlock-${indexRow}-cellBlock-${indexCell}`} 
              className={typeof cell.classe != 'undefined' ? `${cell.classe} cellBlock`: "cellBlock"} 
              onClick={(event) => handleClickCell(event, block, indexRow, indexCell)}
            >
              
              {cell.type == "text" && cell.content}

              { cell.type == "image" && cell.content != [] && cell.content.formats && cell.content.formats.thumbnail ? (
                  <img src={ cell.content.formats.thumbnail.url } alt={cell.content.alternativeText} preview="true" />
                ) : (
                  <>
                    {
                      cell.content != [] ? (
                        <img src={cell.content.url } alt={cell.content.alternativeText} preview="true" />
                      ) : (
                        <Typography textColor="neutral800">-</Typography>
                      )
                    }
                  </>
              )}
            </div>))}

            <div key={`rowBlock-${indexRow}-addCellBlock`} className="cellBlock">
            <Button
                onClick={(event) => addBlock(event, "cell", indexRow)}
                variant="secondary"
                startIcon={<Plus />}
                className="addCellButton"
                children="Add cell"
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
                console.log(event, editBlock.block)
                let block = editBlock.block
                block.cells[editBlock.indexCell].type = event
                block.cells[editBlock.indexCell].content = []
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

            { editBlock.block.cells[editBlock.indexCell].type == 'image' && <MediaLibraryInput
              name="custom-media-input"
              intlLabel={{ id: 'custom-media-input.label', defaultMessage: 'Custom media input usage' }}
              onChange={(event) => {
                let block = editBlock.block
                block.cells[editBlock.indexCell].content = event.target.value
                setEditBlock({...editBlock, [block]: block})
                console.log(block)
              }}
              attribute={{ allowedTypes: ['videos', 'files', 'images', 'audios'] }}
              multiple={false}
              value={ editBlock.block.cells[editBlock.indexCell] ? editBlock.block.cells[editBlock.indexCell].content : []}
            />}
          </Box>
        </> }
      </>
    }
    />
  );
}
