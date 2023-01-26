import * as React from 'react';
import Helmet from 'react-helmet';
import { Page, PageSection } from '@patternfly/react-core';
import './example.css';
import ListPage from './operand';

export default function ExamplePage() {
  return (
    <>
      <Helmet>
        <title>Mrigankas Cronjob</title>
      </Helmet>
      <Page>
        <PageSection variant="light">
          <ListPage />
        </PageSection>
      </Page>
    </>
  );
}
