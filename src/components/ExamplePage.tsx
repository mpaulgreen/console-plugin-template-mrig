import * as React from 'react';
import Helmet from 'react-helmet';
import { Page, PageSection, Title } from '@patternfly/react-core';
import './example.css';
import ComposableTableSortableCustom from './operand';

export default function ExamplePage() {
  return (
    <>
      <Helmet>
        <title>Mrigankas Cronjob</title>
      </Helmet>
      <Page>
        <PageSection variant="light">
          <Title headingLevel="h1">Mrigankas Cronjob</Title>
        </PageSection>
        <PageSection variant="light">
          <ComposableTableSortableCustom />
        </PageSection>
      </Page>
    </>
  );
}
