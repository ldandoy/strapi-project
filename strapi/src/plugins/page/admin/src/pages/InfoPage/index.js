/*
 *
 * InfoPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import pageRequests from "../../api/page"
import { useHistory, useParams } from 'react-router-dom';
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,

  Button,
  TextInput,

  Box,
  Flex,
} from "@strapi/design-system"

import {
  Link,
} from '@strapi/helper-plugin';

import ArrowLeft from '@strapi/icons/ArrowLeft';




const InfoPage = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // error
  const [name, setName] = useState('');
  let { id } = useParams();
  const { push } = useHistory();


  const handleSave = async () => {
    if (name.length == 0) {
      return alert('Name is too short')
    } else {
      const page = await pageRequests.editPage( id, {name:name} );
      location.reload()
    }
  };

  const getError = () => {
    // Form validation error

    if (name.length > 24) {
      return "Content is too long"
    }

    return null;
  };

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

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading === false) setIsLoading(true);
      const page = await pageRequests.getOnePage(id);
      setPageData(page)

      console.log(pageData)

      setIsLoading(false);
      }

      fetchData();


  },[])

  return (
    <Layout>
    { pageData &&
    <BaseHeaderLayout
          primaryAction={getCreateAction()}
          title={pageData.name}
          subtitle="Edit your page"
          as="h2"
          navigationAction={
            <Link startIcon={<ArrowLeft />} to="/plugins/page">
                Back
            </Link>
          }
      />}
    <Box
          background="neutral0"
          hasRadius={true}
          shadow="filterShadow"
          padding={8}
          style={{ marginTop: "10px", marginLeft:"10%" , marginRight:"10%" }}
          >
          <ContentLayout>
          { pageData &&
            <TextInput
              placeholder="Enter a name for your page"
              label="Name"
              name="text"
              error={getError()}
              hint="Max 24 characters"
              onChange={(e) => setName(e.target.value)}
              defaultValue={pageData.name}
            />}
            <>
              <Button
                onClick={() =>{
                  push(`/plugins/page/${id}/edit-content`)
                }}
                style={{ marginTop: "10px" }}

              >
              Edit content
              </Button>
            </>
          </ContentLayout>
        </Box>
  </Layout>
  );
};

export default memo(InfoPage);
