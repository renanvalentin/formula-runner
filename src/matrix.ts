export type Matrix = number[][];

type GetMatrixValues = (matrixRange: string, matrix: Matrix) => number[];

export const getMatrixValues: GetMatrixValues = (matrixRange, matrix) => {
  const [start, end] = matrixRange.split(":");
  const [startCol, startRow] = start.split("");
  const [endCol, endRow] = end.split("");

  const startColIndex = getColumnIndex(startCol);
  const startRowIndex = getRowIndex(startRow);

  const endColIndex = getColumnIndex(endCol);
  const endRowIndex = getRowIndex(endRow);

  const values: number[] = [];

  for (let i = startRowIndex; i <= endRowIndex; i++) {
    for (let j = startColIndex; j <= endColIndex; j++) {
      values.push(matrix[i][j]);
    }
  }

  return values;
};

type GetMatrixCell = (matrixCell: string, matrix: Matrix) => number;

export const getMatrixCell: GetMatrixCell = (matrixCell, matrix) => {
  const [col, row] = matrixCell.split("");
  const colIndex = getColumnIndex(col);
  const rowIndex = parseInt(row, 10) - 1;

  return matrix[rowIndex][colIndex];
};

const getColumnIndex = (col: string) => col.toUpperCase().charCodeAt(0) - 65;

const getRowIndex = (row: string) => parseInt(row, 10) - 1;
