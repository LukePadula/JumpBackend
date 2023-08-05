const noteFormatData = (data) => {
  const formattedData = [];

  data.forEach((record) => {
    const { id, title, description, templateId, templateTitle } = record;

    formattedData.push({
      id,
      title,
      description,
      template: {
        id: templateId,
        title: templateTitle,
      },
      event: {
        id: "",
        title: "",
      },
      content: [],
    });
  });

  console.log(formattedData);

  return formattedData;
};

const templateFormatData = (data) => {
  const formattedData = [];

  data.forEach((record) => {
    const { id, title, description, templateId, templateTitle } = record;

    formattedData.push({
      id,
      title,
      created,
      modified,
    });
  });

  return formattedData;
};

const eventFormatData = (data) => {
  const formattedData = [];

  data.forEach((record) => {
    const { id, title, status, start } = record;

    formattedData.push({
      id,
      title,
      status,
      start,
    });
  });

  return formattedData;
};

module.exports = { noteFormatData, templateFormatData, eventFormatData };
