//Handler for data formatter.
const formatDataHandler = (object, data) => {
  switch (object) {
    case "notes":
      return noteFormatData(data);
    case "templates":
      return templateFormatData(data);
    case "events":
      return eventFormatData(data);
    default:
      break;
  }
};

const noteFormatData = (data) => {
  const formattedData = [];

  data.forEach((record) => {
    const {
      id,
      title,
      description,
      templateId,
      templateTitle,
      content,
      eventId,
      eventTitle,
    } = record;

    formattedData.push({
      id,
      title,
      description,
      template: {
        id: templateId,
        title: templateTitle,
      },
      event: {
        id: eventId,
        title: eventTitle,
      },
      content,
    });
  });

  return formattedData;
};

const templateFormatData = (data) => {
  const formattedData = [];

  data.forEach((record) => {
    const { id, title, description, content, created, modified } = record;

    formattedData.push({
      id,
      title,
      description,
      content,
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

module.exports = {
  formatDataHandler,
  noteFormatData,
  templateFormatData,
  eventFormatData,
};
