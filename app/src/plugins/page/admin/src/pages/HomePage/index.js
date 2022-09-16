/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import pageRequests from "../../api/page"
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout
} from "@strapi/design-system/Layout"


import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Button } from "@strapi/design-system/Button";
import Plus from "@strapi/icons/Plus";
import { Illo } from "../../components/Illo";

import PageModal from "../../components/PageModal";
import PageTable from "../../components/PageTable";

const HomePage = () => {
  const [ pageData, setPageData ] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);
    const page = await pageRequests.getAllPages();
    setPageData(page);
    setIsLoading(false);
  }

  useEffect(async () => {
    await fetchData();
  },[])

  async function addPage(data) {
    await pageRequests.addPage(data);
    await fetchData();
  }

  async function deletePage(data) {
    await pageRequests.deletePage(data.id);
    await fetchData();
  }

  async function editPage(id, data) {
    await pageRequests.editPage(id, data);
    await fetchData();
  }

  if (isLoading) return <LoadingIndicatorPage />;

  const getCreateAction = () => {
    return (
      <Button
        startIcon={<Plus />}
        onClick={() => {
          setShowModal(true)
        }}
      >
        Create new entry
      </Button>
    )
  }

  return (
    <Layout>
      <BaseHeaderLayout
        primaryAction={getCreateAction()}
        title="Page Plugin"
        subtitle="All your pages in one place"
        as="h2"
      />
      <ContentLayout>
      {pageData.length === 0 ? (
        <EmptyStateLayout
          icon={<Illo />}
          content="You don't have any pages yet..."
          action={
            <Button
              onClick={() => {
                setShowModal(true)
              }}
              variant="secondary"
              startIcon={<Plus />}
            >
              Add your first page
            </Button>
        }
        />
      ) : (
        <PageTable
          pageData={pageData}
          setShowModal={setShowModal}
          deletePage={deletePage}
          editPage={editPage}
          />
        )
      }
      </ContentLayout>
      {showModal && <PageModal setShowModal={setShowModal} addPage={addPage}/>}

    </Layout>
  );
};

export default memo(HomePage);
