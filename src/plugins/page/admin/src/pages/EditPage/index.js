/*
 *
 * EditPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pageRequests from "../../api/page"
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,

  Button,
  TextInput,

  Box,
  Flex,

  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
  SubNavLinkSection,

  Icon,
} from "@strapi/design-system";


import { Illo } from "../../components/Illo";
import Plus from "@strapi/icons/Plus";
import Trash from '@strapi/icons/Trash';

import {
  Link,
} from '@strapi/helper-plugin';

import ArrowLeft from '@strapi/icons/ArrowLeft';
import PageStructure from "../../components/PageStructure";



const EditPage = () => {
  const [content, setContent] = useState({
    blocks: []
  });
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading === false) setIsLoading(true);
      const page = await pageRequests.getOnePage(id);
      setPageData(page)
      if (page.content != null) {
        let oldContent = JSON.parse(page.content)
        setContent(oldContent)
      } else {
        setContent({
          blocks: []
        })
      }

      setIsLoading(false);
    }

    fetchData();
  },[])

  const addBlock = (event, type="row") => {
    if (type == "row") {
      const block = {
        label: "row",
        style: "rowBlockCol",
        cells: []
      }
      let blocks = content.blocks
      blocks.push(block)

      setContent({...content, blocks:blocks})


    }
  }

  const getCreateAction = () => {
    return (
      <Button
        onClick={
          handleSave
        }
      >
        Save
      </Button>
    )
  }

  const handleSave = async () => {
    if (content.blocks.length == 0) {
      return alert('Content is too short')
    } else {
      let contentJson = JSON.stringify(content)
      const page = await pageRequests.editPage( id, {content: contentJson} );
      location.reload()
    }
  };

  return (
    <Flex alignItems="flex-start">
        {/* <SubNav
          ariaLabel="Edit Page"
        >
          <SubNavHeader
            label='test'
          />
          { content.blocks.map((block, index) => {
            return (
              <SubNavSection key={index} label={block.label} collapsable={true}>

                { block.cells.map((cell, index) => {
                  return (
                    <SubNavSection key={index} label={cell.label}>
                    </SubNavSection>
                  )
                })}
              </SubNavSection>
            )
          })}
        </SubNav> */}
        <div style={{width: "100%"}}>
        <Layout>
          <BaseHeaderLayout
            primaryAction={getCreateAction()}
            title="Page Plugin"
            subtitle="Add a new page"
            as="h2"
            navigationAction={
              <Link startIcon={<ArrowLeft />} to="/plugins/page">
                  Back
              </Link>
            }
          />
          <ContentLayout>
            { pageData && <>
              {content.blocks.length === 0 &&
                  <EmptyStateLayout
                    icon={<Illo />}
                    content="You don't have any blocks yet..."
                    action={
                      <Button
                        onClick={addBlock}
                        variant="secondary"
                        startIcon={<Plus />}
                      >
                        Add your first block
                      </Button>
                    }
                  />
              }
            </>}

            {content.blocks.length !== 0 &&
              <PageStructure content={content} />
            }

          </ContentLayout>
          </Layout>
        </div>
      </Flex>
  );
};

export default memo(EditPage);
