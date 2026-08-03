export type SeatConfig = { startCol: number; startNum: number; count: number; step?: number };
export type RowConfig = {
  rowLabel: string;
  seats: { id: string; label: string; colStart: number }[];
};
export type SectionConfig = {
  title?: string;
  leftTitle?: string;
  rightTitle?: string;
  rows: RowConfig[];
};

export const generateRow = (rowLabel: string, configs: SeatConfig[]) => {
  const seats: { id: string; label: string; colStart: number }[] = [];
  configs.forEach((config) => {
    const step = config.step ?? 1;
    for (let i = 0; i < config.count; i++) {
      const num = config.startNum + (i * step);
      seats.push({
        id: `${rowLabel}${num}`,
        label: num.toString().padStart(2, "0"),
        colStart: config.startCol + i,
      });
    }
  });
  return { rowLabel, seats };
};

export const layouts: Record<string, SectionConfig[]> = {
  "science-city": [
    {
      title: "PREMIUM ROWS",
      rows: [
        generateRow("J", [{ startCol: 3, startNum: 1, count: 40 }]),
        generateRow("I", [{ startCol: 3, startNum: 1, count: 40 }]),
      ],
    },
    {
      title: "STANDARD ROWS",
      rows: [
        generateRow("H", [{ startCol: 3, startNum: 1, count: 40 }]),
        generateRow("G", [{ startCol: 3, startNum: 1, count: 40 }]),
        generateRow("F", [{ startCol: 3, startNum: 1, count: 40 }]),
        generateRow("E", [{ startCol: 3, startNum: 1, count: 40 }]),
        generateRow("D", [{ startCol: 3, startNum: 1, count: 40 }]),
        generateRow("C", [{ startCol: 3, startNum: 1, count: 40 }]),
      ],
    },
    {
      title: "FRONT ROWS",
      rows: [
        generateRow("B", [
          { startCol: 2, startNum: 1, count: 5 },
          { startCol: 10, startNum: 6, count: 22 },
          { startCol: 35, startNum: 28, count: 5 },
        ]),
        generateRow("A", [
          { startCol: 4, startNum: 1, count: 4 },
          { startCol: 12, startNum: 5, count: 18 },
          { startCol: 34, startNum: 23, count: 4 },
        ]),
      ],
    },
  ],
  "prasads": [
    {
      title: "GOLD",
      rows: [
        generateRow("N", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("M", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("L", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("K", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("J", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("I", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("H", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("G", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("F", [{ startCol: 1, startNum: 1, count: 47 }]),
        generateRow("E", [{ startCol: 1, startNum: 1, count: 47 }]),
      ],
    },
    {
      title: "SILVER",
      rows: [
        generateRow("D", [{ startCol: 1, startNum: 45, count: 1 }]),
        generateRow("C", [
          { startCol: 2, startNum: 40, count: 2 },
          { startCol: 6, startNum: 37, count: 2 },
          { startCol: 40, startNum: 3, count: 3, step: -1 },
        ]),
        generateRow("B", [
          { startCol: 4, startNum: 38, count: 11, step: -1 },
          { startCol: 17, startNum: 27, count: 6, step: -1 },
          { startCol: 26, startNum: 15, count: 1 },
          { startCol: 31, startNum: 12, count: 12, step: -1 },
        ]),
        generateRow("A", [
          { startCol: 7, startNum: 34, count: 16, step: -1 },
          { startCol: 25, startNum: 18, count: 18, step: -1 },
        ]),
      ],
    },
  ],
  "wadala": [
    {
      title: "SOFA",
      rows: [
        generateRow("A", [
          { startCol: 1, startNum: 1, count: 2 },
          { startCol: 24, startNum: 3, count: 2 },
        ]),
        generateRow("B", [
          { startCol: 3, startNum: 1, count: 10 },
          { startCol: 15, startNum: 13, count: 10 },
        ]),
        generateRow("C", [{ startCol: 4, startNum: 1, count: 20 }]),
        generateRow("D", [
          { startCol: 5, startNum: 1, count: 11 },
          { startCol: 19, startNum: 14, count: 7 },
        ]),
        generateRow("E", [
          { startCol: 1, startNum: 1, count: 12 },
          { startCol: 20, startNum: 19, count: 14 },
        ]),
      ],
    },
    {
      title: "EXECUTIVE",
      rows: [
        generateRow("F", [
          { startCol: 2, startNum: 1, count: 13 },
          { startCol: 24, startNum: 23, count: 16 },
        ]),
        generateRow("G", [
          { startCol: 1, startNum: 1, count: 17 },
          { startCol: 23, startNum: 23, count: 16 },
        ]),
        generateRow("H", [
          { startCol: 0, startNum: 1, count: 19 },
          { startCol: 21, startNum: 29, count: 18 },
        ]),
        generateRow("I", [
          { startCol: 1, startNum: 1, count: 21 },
          { startCol: 20, startNum: 24, count: 20 },
        ]),
        generateRow("J", [
          { startCol: 2, startNum: 1, count: 23 },
          { startCol: 20, startNum: 24, count: 17 },
        ]),
      ],
    },
    {
      title: "RECLINER IMAX",
      rows: [generateRow("K", [{ startCol: 9, startNum: 1, count: 20 }])],
    },
    {
      title: "LOUNGER",
      rows: [generateRow("L", [{ startCol: 9, startNum: 1, count: 20 }])],
    },
  ],
  "pvr-eva-audi-3": [
    {
      title: "RECLINER ROWS",
      rows: [
        generateRow("M", [
          { startCol: 1, startNum: 1, count: 1 },
          { startCol: 3, startNum: 3, count: 2 },
          { startCol: 6, startNum: 6, count: 1 },
          { startCol: 11, startNum: 11, count: 4 },
        ]),
      ],
    },

    {
      title: "PRIME PLUS ROWS",
      rows: [
        generateRow("L", [
          { startCol: 5, startNum: 5, count: 2 },
          { startCol: 13, startNum: 13, count: 1 },
          { startCol: 15, startNum: 14, count: 5 },
        ]),

        generateRow("K", []),

        generateRow("J", [
          { startCol: 1, startNum: 1, count: 11 },
          { startCol: 13, startNum: 12, count: 10 },
        ]),

        generateRow("H", [
          { startCol: 1, startNum: 1, count: 2 },
          { startCol: 6, startNum: 6, count: 5 },
          { startCol: 13, startNum: 12, count: 10 },
        ]),

        generateRow("G", [
          { startCol: 1, startNum: 1, count: 12 },
          { startCol: 14, startNum: 14, count: 9 },
        ]),
      ],
    },

    {
      title: "PRIME ROWS",
      rows: [
        generateRow("F", [
          { startCol: 1, startNum: 1, count: 7 },
          { startCol: 12, startNum: 12, count: 10 },
        ]),

        generateRow("E", [
          { startCol: 1, startNum: 1, count: 12 },
          { startCol: 17, startNum: 19, count: 14 },
        ]),

        generateRow("D", [
          { startCol: 1, startNum: 1, count: 11 },
          { startCol: 13, startNum: 12, count: 10 },
        ]),
      ],
    },

    {
      title: "CLASSIC ROWS",
      rows: [
        generateRow("C", [
          { startCol: 1, startNum: 1, count: 11 },
          { startCol: 13, startNum: 12, count: 10 },
        ]),

        generateRow("B", [
          { startCol: 1, startNum: 1, count: 11 },
          { startCol: 13, startNum: 12, count: 10 },
        ]),

        generateRow("A", [
          { startCol: 1, startNum: 1, count: 16 },
          { startCol: 19, startNum: 18, count: 4 },
        ]),
      ],
    },
  ]
};
