// components/Table.tsx

'use client';

import { motion } from 'framer-motion';

type TableProps = {
  headers: string[];
  rows: string[][];
};

export const Table = ({ headers, rows }: TableProps) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full text-right text-sm">
        <thead>
          <tr className="text-gray-600 border-b">
            {headers.map((header) => (
              <th key={header} className="py-2 px-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b hover:bg-gray-50"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2 px-3">
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
