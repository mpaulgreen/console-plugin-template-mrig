import * as React from 'react';
import {
  ListPageHeader,
  ListPageBody,
  VirtualizedTable,
  useK8sWatchResource,
  useListPageFilter,
  K8sResourceCommon,
  ListPageFilter,
  TableData,
  RowProps,
  TableColumn,
  ResourceLink,
  Timestamp,
} from '@openshift-console/dynamic-plugin-sdk';

import { Labels } from './label-list';

const columns: TableColumn<K8sResourceCommon>[] = [
  {
    title: 'Name',
    id: 'name',
  },
  {
    title: 'Kind',
    id: 'kind',
  },
  {
    title: 'Namespace',
    id: 'namespace',
  },
  {
    title: 'Status',
    id: 'status',
  },
  {
    title: 'Labels',
    id: 'lables',
  },
  {
    title: 'Last Updated',
    id: 'lastUpdated',
  },
];

const CronJobRow: React.FC<RowProps<K8sResourceCommon>> = ({
  obj,
  activeColumnIDs,
}) => {
  return (
    <>
      <TableData id={columns[0].id} activeColumnIDs={activeColumnIDs}>
        <ResourceLink
          kind="CronJob"
          name={obj.metadata.name}
          namespace={obj.metadata.namespace}
        />
      </TableData>
      <TableData id={columns[1].id} activeColumnIDs={activeColumnIDs}>
        <ResourceLink kind="Kind" name={obj.kind} hideIcon={true} />
      </TableData>
      <TableData id={columns[2].id} activeColumnIDs={activeColumnIDs}>
        <ResourceLink kind="Namespace" name={obj.metadata.namespace} />
      </TableData>
      <TableData id={columns[3].id} activeColumnIDs={activeColumnIDs}>
        <ResourceLink kind="Status" displayName={'-'} hideIcon={true} />
      </TableData>
      <TableData id={columns[4].id} activeColumnIDs={activeColumnIDs}>
        <Labels kind={obj.kind} labels={obj.metadata.labels} />
      </TableData>
      <TableData id={columns[4].id} activeColumnIDs={activeColumnIDs}>
        <Timestamp timestamp={obj.metadata.creationTimestamp} />
      </TableData>
    </>
  );
};

type ConJobsTableProps = {
  data: K8sResourceCommon[];
  unfilteredData: K8sResourceCommon[];
  loaded: boolean;
  loadError: any;
};

const ConJobsTable: React.FC<ConJobsTableProps> = ({
  data,
  unfilteredData,
  loaded,
  loadError,
}) => {
  return (
    <VirtualizedTable<K8sResourceCommon>
      data={data}
      unfilteredData={unfilteredData}
      loaded={loaded}
      loadError={loadError}
      columns={columns}
      Row={CronJobRow}
    />
  );
};

const ListPage = () => {
  const [cronjobs, loaded, loadError] = useK8sWatchResource<
    K8sResourceCommon[]
  >({
    groupVersionKind: {
      group: 'batch.tutorial.kubebuilder.io',
      version: 'v1alpha1',
      kind: 'CronJob',
    },
    isList: true,
    namespaced: false,
  });

  const [data] = useListPageFilter(cronjobs);

  return (
    <>
      <ListPageHeader title="Mriganka Custom CronJobs"></ListPageHeader>
      <ListPageBody>
        <ListPageFilter
          data={data}
          loaded={loaded}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onFilterChange={function () {}}
        />
        <ConJobsTable
          data={data}
          unfilteredData={data}
          loaded={loaded}
          loadError={loadError}
        />
      </ListPageBody>
    </>
  );
};

export default ListPage;
