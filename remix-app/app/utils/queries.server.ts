export const getRegionSubQuery = (
  data: {
    id: string | null;
    name: string;
  },
  userId: string
) => {
  let query:
    | { connect: { id: string } }
    | { create: { region: string; user?: { connect: { id: string } } } };

  if (data.id) {
    query = {
      connect: {
        id: data.id,
      },
    };
  } else {
    query = {
      create: {
        region: data.name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    };
  }

  return query;
};

export const getWineTypeSubQuery = (
  data: {
    id: string | null;
    name: string;
  },
  userId: string
) => {
  let query:
    | { connect: { id: string } }
    | { create: { winetype: string; user?: { connect: { id: string } } } };

  if (data.id) {
    query = {
      connect: {
        id: data.id,
      },
    };
  } else {
    query = {
      create: {
        winetype: data.name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    };
  }

  return query;
};

export const getVineyardSubQuery = (
  data: {
    id: string | null;
    name: string;
  },
  userId: string
) => {
  let query:
    | { connect: { id: string } }
    | { create: { vineyard: string; user?: { connect: { id: string } } } };

  if (data.id) {
    query = {
      connect: {
        id: data.id,
      },
    };
  } else {
    query = {
      create: {
        vineyard: data.name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    };
  }

  return query;
};
