const logger = require("../middleware/logging");

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
    const { id, title, description, templateId, templateTitle, content } =
      record;

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
      content,
    });
  });

  return formattedData;
};

const templateFormatData = (data) => {
  const formattedData = [];

  data.forEach((record) => {
    const {
      id,
      title,
      description,
      templateId,
      templateTitle,
      created,
      modified,
    } = record;

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

module.exports = {
  formatDataHandler,
  noteFormatData,
  templateFormatData,
  eventFormatData,
};
