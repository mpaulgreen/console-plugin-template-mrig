import * as React from 'react';

import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ThProps,
} from '@patternfly/react-table';

interface Repository {
  name: string;
  kind: string;
  namespace: string;
  status: string;
  labels: string;
  lastUpdated: string;
}

export const ComposableTableSortableCustom: React.FunctionComponent = () => {
  // In real usage, this data would come from some external source like an API via props.
  const repositories: Repository[] = [
    {
      name: 'cronjob-sample',
      kind: 'Cronjob',
      namespace: 'crojob-project',
      status: '-',
      labels:
        'app.kubernetes.io/name: cronjob app.kubernetes.io/instance: cronjob-sample',
      lastUpdated: 'Jan 24,2023, 4:27 PM',
    },
  ];

  const columnNames = {
    name: 'Name',
    kind: 'Kind',
    namespace: 'Namespace',
    status: 'Status',
    labels: 'Labels',
    lastUpdated: 'Last Updated',
  };

  // Index of the currently sorted column
  // Note: if you intend to make columns reorderable, you may instead want to use a non-numeric key
  // as the identifier of the sorted column. See the "Compound expandable" example.
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(
    null,
  );

  // Sort direction of the currently sorted column
  const [activeSortDirection, setActiveSortDirection] = React.useState<
    'asc' | 'desc' | null
  >(null);

  // Since OnSort specifies sorted columns by index, we need sortable values for our object by column index.
  // This example is trivial since our data objects just contain strings, but if the data was more complex
  // this would be a place to return simplified string or number versions of each column to sort by.
  const getSortableRowValues = (repo: Repository): (string | number)[] => {
    const { name, kind, namespace, status, labels, lastUpdated } = repo;
    return [name, name, kind, namespace, status, labels, lastUpdated];
  };

  // Note that we perform the sort as part of the component's render logic and not in onSort.
  // We shouldn't store the list of data in state because we don't want to have to sync that with props.
  let sortedRepositories = repositories;
  if (activeSortIndex !== null) {
    sortedRepositories = repositories.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        // Numeric sort
        if (activeSortDirection === 'asc') {
          return (aValue as number) - (bValue as number);
        }
        return (bValue as number) - (aValue as number);
      } else {
        // String sort
        if (activeSortDirection === 'asc') {
          return (aValue as string).localeCompare(bValue as string);
        }
        return (bValue as string).localeCompare(aValue as string);
      }
    });
  }

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection,
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex,
  });

  return (
    <React.Fragment>
      <TableComposable aria-label="Sortable table custom toolbar">
        <Thead>
          <Tr>
            <Th sort={getSortParams(0)}>{columnNames.name}</Th>
            <Th sort={getSortParams(1)}>{columnNames.kind}</Th>
            <Th sort={getSortParams(3)}>{columnNames.namespace}</Th>
            <Th sort={getSortParams(4)}>{columnNames.status}</Th>
            <Th sort={getSortParams(5)}>{columnNames.labels}</Th>
            <Th sort={getSortParams(6)}>{columnNames.lastUpdated}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedRepositories.map((repo, rowIndex) => (
            <Tr key={rowIndex}>
              <Td dataLabel={columnNames.name}>{repo.name}</Td>
              <Td dataLabel={columnNames.kind}>{repo.kind}</Td>
              <Td dataLabel={columnNames.namespace}>{repo.namespace}</Td>
              <Td dataLabel={columnNames.status}>{repo.status}</Td>
              <Td dataLabel={columnNames.labels}>{repo.labels}</Td>
              <Td dataLabel={columnNames.lastUpdated}>{repo.lastUpdated}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};

export default ComposableTableSortableCustom;
