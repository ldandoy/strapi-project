import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
} from "@strapi/design-system/Table";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Typography } from "@strapi/design-system/Typography";
import { IconButton } from "@strapi/design-system/IconButton";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import Pencil from "@strapi/icons/Pencil";
import Trash from "@strapi/icons/Trash";

export default function TodoTable({
  pageData,
  deletePage,
  editPage,
}) {

  const { push } = useHistory();


  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      style={{ marginTop: "10px" }}
    >
      <Table
        colCount={4}
        rowCount={10}
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Name</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Content</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {pageData.map((page) => {

            return (
              <Tr key={page.id}>
                <Td>
                  <Typography textColor="neutral800">{page.id}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{page.name}</Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{page.content}</Typography>
                </Td>

                <Td>
                  <Flex style={{ justifyContent: "end" }}>
                    <IconButton
                      onClick={() =>
                        push({
                          pathname:`/plugins/page/${page.id}/edit`
                        })
                      }
                      label="Edit"
                      noBorder
                      icon={<Pencil />}
                    />

                    <Box paddingLeft={1}>
                      <IconButton
                        onClick={() => deletePage(page)}
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                      />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
