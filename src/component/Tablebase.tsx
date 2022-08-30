import { memo, useEffect, useState } from 'react';
import { HeaderTitle, StrOrNum } from '../types';
import styles from './Tablebase.module.css';

interface Props {
  headers: HeaderTitle[];
  datas: StrOrNum[][];
}

const Table = ({ headers, datas }: Props) => {
  const [datasOK, setDatas] = useState(datas);
  const [headersOK, setHeaders] = useState(headers);

  useEffect(() => {
    const headerLen = headers.length;

    if (!datas.every((data) => data.length === headerLen)) {
      adjustLength(datas, headerLen);
    }

    setHeaders(
      headers.map((header) => {
        const headerType = typeof header;

        switch (headerType) {
          case 'number':
            return header.toLocaleString();
          case 'object':
            // @ts-expect-error
            return header.name.toString();
          default:
            return header;
        }
      })
    );
  }, [datas, headers]);

  const adjustLength = (datasToFix: StrOrNum[][], lengthWanted: number) => {
    const datasFixed = datasToFix.map((line) => {
      // line to short
      if (line.length < lengthWanted) {
        const ret = [...line];

        for (let i = 0; i < lengthWanted - line.length; i++) {
          ret.push('');
        }

        return ret;
      }

      // line too big
      if (line.length > lengthWanted) {
        const ret = [...line];

        for (let i = 0; i < line.length - lengthWanted; i++) {
          ret.pop();
        }

        return ret;
      }

      // line OK
      return line;
    });

    setDatas(datasFixed);
  };

  const rowsReader = (rows: StrOrNum[][]) => {
    return rows.map((row: StrOrNum[], ind: number) => {
      return <tr key={ind}>{rowDisplayer(row)}</tr>;
    });
  };

  const rowDisplayer = (row: StrOrNum[]) => {
    return row.map((elt: StrOrNum, ind: number) => {
      return <td key={ind}>{elt.toString()}</td>;
    });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          {headersOK.map((val, ind: number) => (
            <th key={ind}>{val.toString()}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.body}>{rowsReader(datasOK)}</tbody>
    </table>
  );
};

export default memo(Table);
