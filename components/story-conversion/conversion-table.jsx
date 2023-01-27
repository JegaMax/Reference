import React, { useCallback, useState } from 'react';
import Search from 'components/shared/search';
import styled from 'styled-components';
import { ChevronLeft } from 'components/icons';
import { memo, useMemo, VFC } from 'react';
import { StorySearchWrapper } from 'components/layouts/shared/story-search/story-search-styled';
import { useFlexLayout, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { useSpinner } from 'hooks';
import { Delete } from 'components/icons';
import MessageModal from 'components/message-modal';
import { useDeleteArticleMutation } from 'appredux/services/articles/articles';
import { DEFAULT_TOAST_CONFIG } from 'config/constants';
import { toast } from 'react-toastify';

function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [day, month, year].join('/');
}

const ElipsisText = styled.div`
  min-width: 0;
  max-width: 100%;
  padding-right: 12px;

  // display: block; /* Fallback for non-webkit */
  // display: -webkit-box;
  // height: 2.6em; /* Fallback for non-webkit, line-height * 2 */
  // line-height: 1.3em;
  // -webkit-line-clamp: 2; /* if you change this, make sure to change the fallback line-height and height */
  // -webkit-box-orient: vertical;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

const Container = styled.div`
  background: var(--shade-900-85);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 12px;
  width: 100%;
  height: 100%;
  padding: 30px 38px;
  display: flex;
  gap: 50px;
  flex-direction: column;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? 'row'};
  gap: 36px;
  flex: ${({ flex }) => flex};
  ${({ margin }) => `margin: ${margin ?? 0} `};
  .search-wrapper {
    margin: 0;
    transform: unset;
  }
`;

const Title = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: var(--white);
`;

const StyledTable = styled.table`
  flex: 1;
  border-collapse: collapse;
  thead {
    tr {
      th {
        padding: 0 0 18px 0;
      }
    }
  }
  tbody {
    tr {
      border-bottom: 2px solid var(--shade-700-85);
      border-radius: 6px;
      align-items: center;
      td {
        padding: 16px 0;
      }
    }
  }
`;

const StyledTableHeader = styled.th`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--white);
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StyledTableCell = styled.td`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--white);
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Cover = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--shade-700-85);
  border: 1.5px solid var(--shade-300);
  box-sizing: border-box;
  backdrop-filter: blur(50px);
`;

const CoverImage = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  max-width: 100%;
  object-fit: cover;
  border: 2.5px solid transparent;
  border-radius: 50%;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;

  cursor: pointer;
  svg {
    transform: scale(0.75) ${({ right }) => (right ? 'rotate(180deg)' : '')};
    > * {
      transition: fill 225ms ease;
      fill: white;
    }
  }
  &:hover {
    svg {
      > * {
        fill: var(--primary);
      }
    }
  }
`;

const PageButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1;
  padding: 1px 0 0 1px;
  letter-spacing: 0.01em;
  color: var(--shade-900);
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 225ms ease, color 225ms ease;
  color: var(--white);
  cursor: pointer;
  &:hover {
    background-color: var(--primary-20);
  }
  ${({ isActive }) => isActive && `color: var(--shade-900); background-color: var(--primary);`}
  ${({ disabled }) => disabled && `pointer-events: none;`}
`;

const ConvertButton = styled.button`
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
  flex: none;
  padding: 7.5px 11px 6.5px;
  border: 1px solid var(--shade-100);
  color: var(--shade-100);
  background-color: transparent;
  transition: color 225ms ease, background-color 225ms ease;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    color: var(--shade-900);
    background-color: var(--shade-100);
  }
`;

const RotatedChevron = styled(ChevronLeft)`
  vertical-align: middle;
  margin-left: 12px;
  transform: scale(0.75) rotate(${({ up }) => (up ? '90deg' : '-90deg')});
`;

const DeleteButton = styled.div`
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  border-radius: 6px;
  background-color: transparent;
  transition: background-color 225ms ease;
  cursor: pointer;
  &:hover {
    background-color: var(--shade-500-85);
  }
`;

const paginationGenerator = (current, last, width = 2) => {
  const left = current - width;
  const right = current + width + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i <= right)) {
      range.push(i);
    } else if (i < left) {
      i = left - 1;
    } else if (i > right) {
      range.push(last);
      break;
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};

const ConversionTable = ({ cells, isLoading, onConvertStory }) => {
  const [activeRow, setActiveRow] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(null);

  const openDeleteModal = useCallback((id) => () => setDeleteModalOpen(id), []);
  const closeDeleteModal = useCallback(() => setDeleteModalOpen(null), []);

  const [deleteArticle] = useDeleteArticleMutation();
  const onDeleteArticle = useCallback(async () => {
    if (isDeleteModalOpen) {
      try {
        await deleteArticle(isDeleteModalOpen).unwrap();
        toast.info(`Your article has been deleted successfully.`, DEFAULT_TOAST_CONFIG);
      } catch (err) {
        console.error(err);
        toast.info(`Something went wrong`, DEFAULT_TOAST_CONFIG);
      } finally {
        closeDeleteModal();
      }
    }
  }, [isDeleteModalOpen, closeDeleteModal, deleteArticle]);

  // Aditional memo for table cells.
  const data = useMemo(() => cells, [cells]);
  const columns = useMemo(
    () => [
      {
        Header: 'Article Title',
        accessor: 'title',
        Cell: ({
          cell: {
            row: { original },
          },
        }) => {
          const { title, media } = original;
          const cover = media.find((m) => m.type === 'image')?.url;

          return (
            <TitleWrapper>
              <Cover>
                <CoverImage src={cover} alt="Article cover image" />
              </Cover>
              <ElipsisText>{title}</ElipsisText>
            </TitleWrapper>
          );
        },
        width: 2.5,
      },
      {
        Header: 'Author',
        accessor: 'authorSEO',
        width: 1,
      },
      {
        Header: 'Created',
        id: 'createdAt',
        width: 1,
        accessor: ({ createdAt }) => {
          return formatDate(createdAt);
        },
      },
      {
        Header: '',
        accessor: '_id',
        Cell: ({
          cell: {
            row: { original },
          },
        }) => {
          const { _id } = original;
          const isActive = activeRow === _id;

          return (
            <>
              <ConvertButton
                onClick={() => {
                  onConvertStory(_id);
                }}
              >
                Convert into Story
              </ConvertButton>
              {isActive && (
                <DeleteButton onClick={openDeleteModal(_id)}>
                  <Delete />
                </DeleteButton>
              )}
            </>
          );
        },
        width: 1,
      },
    ],
    [activeRow, onConvertStory, openDeleteModal],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useFlexLayout,
  );

  const { Spinner, spinnerProps } = useSpinner({
    color: '#f6522b',
    backgroundColor: 'rgba(20, 20, 31, 0.85)',
  });

  const pagination = useMemo(() => [...paginationGenerator(pageIndex, pageOptions.length)], [
    pageIndex,
    pageOptions.length,
  ]);

  const setRowActive = useCallback(
    (id) => () => {
      setActiveRow(id);
    },
    [],
  );

  if (isLoading) {
    return (
      <Container>
        <Spinner {...spinnerProps} isVisible={isLoading} />
      </Container>
    );
  }

  return (
    <Container>
      <Row flex={0}>
        <Title>Articles ({data.length})</Title>
        <StorySearchWrapper className="search-wrapper" isHidden={false}>
          <Search hasBorder placeholder="Search Articles" value={globalFilter ?? ''} onChange={setGlobalFilter} />
        </StorySearchWrapper>
      </Row>

      <Row flex={1} direction="column">
        <StyledTable {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <StyledTableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted && <RotatedChevron up={!column.isSortedDesc} />}
                  </StyledTableHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              page.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr
                    {...row.getRowProps()}
                    onMouseEnter={setRowActive(row?.original?._id)}
                    onMouseLeave={setRowActive(null)}
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <StyledTableCell {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </StyledTableCell>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </StyledTable>
        <Pagination>
          <PaginationButton onClick={() => previousPage()} disabled={!canPreviousPage}>
            <ChevronLeft />
          </PaginationButton>
          {pagination?.map((currentPage) => (
            <PageButton
              key={currentPage}
              disabled={currentPage === '...'}
              isActive={currentPage === pageIndex + 1}
              onClick={() => gotoPage(+currentPage - 1)}
            >
              {currentPage}
            </PageButton>
          ))}
          <PaginationButton right onClick={() => nextPage()} disabled={!canNextPage}>
            <ChevronLeft />
          </PaginationButton>
        </Pagination>
      </Row>

      <MessageModal
        message="Are you sure you want to delete the selected article?"
        description="This will permanently delete this article. All previously created stories from this article will remain unaffected."
        isOpen={!!isDeleteModalOpen}
        shouldCloseOnOverlayClick={true}
        acceptButtonText="Delete article"
        onCancel={closeDeleteModal}
        onAccept={onDeleteArticle}
      />
    </Container>
  );
};

export default memo(ConversionTable);
